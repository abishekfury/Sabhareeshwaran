/**
 * Interactive 3D Earth Globe Component
 * Renders a fully interactive orthographic 3D globe inside an SVG container.
 * Custom built using pure sphere mathematics and SVG rendering.
 * Zero external dependencies.
 */

class InteractiveGlobe {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`InteractiveGlobe: Container #${containerId} not found.`);
      return;
    }

    this.options = {
      radius: options.radius || 180,
      autoRotate: options.autoRotate !== undefined ? options.autoRotate : true,
      rotateSpeed: options.rotateSpeed || 1.2, // degrees per frame/tick multiplier
      dragSensitivity: options.dragSensitivity || 0.25,
      oceanColor: options.oceanColor || 'rgba(10, 10, 15, 0.9)',
      landColor: options.landColor || 'rgba(0, 240, 255, 0.04)',
      borderColor: options.borderColor || 'rgba(0, 240, 255, 0.25)',
      borderWidth: options.borderWidth || 1,
      glowColor: options.glowColor || 'rgba(0, 240, 255, 0.4)',
      gridColor: options.gridColor || 'rgba(255, 255, 255, 0.02)',
      starfield: options.starfield !== undefined ? options.starfield : true,
      markers: options.markers || [],
      initialLambda: options.initialLambda || 0,
      initialPhi: options.initialPhi || 15,
      onMarkerClick: options.onMarkerClick || null
    };

    this.lambda = this.options.initialLambda; // longitude rotation in degrees
    this.phi = this.options.initialPhi;       // latitude tilt in degrees
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.lastActiveTime = Date.now();
    this.mapData = null;

    this.init();
  }

  init() {
    this.container.innerHTML = '';
    const size = this.options.radius * 2 + 60; // Extra padding for outer blur glows
    
    // Create SVG container
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('width', '100%');
    this.svg.setAttribute('height', '100%');
    this.svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    this.svg.style.overflow = 'visible';
    this.svg.style.cursor = 'grab';
    this.container.appendChild(this.svg);

    this.centerX = size / 2;
    this.centerY = size / 2;
    this.R = this.options.radius;

    // Define defs with radial gradients and blur filters for depth
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <!-- Atmosphere Outer Glow -->
      <filter id="globe-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="12" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      
      <!-- Sphere Depth Gradient (Overlay on ocean) -->
      <radialGradient id="sphere-depth" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stop-color="rgba(255, 255, 255, 0.12)"/>
        <stop offset="60%" stop-color="rgba(0, 0, 0, 0.45)"/>
        <stop offset="100%" stop-color="rgba(0, 0, 0, 0.95)"/>
      </radialGradient>
      
      <!-- Rim Light Gradient -->
      <radialGradient id="rim-light" cx="50%" cy="50%" r="50%">
        <stop offset="85%" stop-color="rgba(0, 0, 0, 0)" stop-opacity="0"/>
        <stop offset="96%" stop-color="${this.options.glowColor}" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="${this.options.glowColor}" stop-opacity="0.75"/>
      </radialGradient>
    `;
    this.svg.appendChild(defs);

    // Starfield Background
    if (this.options.starfield) {
      const starsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      starsGroup.setAttribute('class', 'starfield');
      for (let i = 0; i < 45; i++) {
        const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const angle = Math.random() * Math.PI * 2;
        const dist = this.R + 40 + Math.random() * 80;
        star.setAttribute('cx', this.centerX + Math.cos(angle) * dist);
        star.setAttribute('cy', this.centerY + Math.sin(angle) * dist);
        star.setAttribute('r', Math.random() * 0.7 + 0.3);
        star.setAttribute('fill', 'rgba(255, 255, 255, 0.35)');
        starsGroup.appendChild(star);
      }
      this.svg.appendChild(starsGroup);
    }

    // Outer Atmosphere Glow Ring
    this.glowRing = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.glowRing.setAttribute('cx', this.centerX);
    this.glowRing.setAttribute('cy', this.centerY);
    this.glowRing.setAttribute('r', this.R + 2);
    this.glowRing.setAttribute('fill', 'none');
    this.glowRing.setAttribute('stroke', this.options.glowColor);
    this.glowRing.setAttribute('stroke-width', '2');
    this.glowRing.setAttribute('filter', 'url(#globe-glow)');
    this.glowRing.setAttribute('opacity', '0.6');
    this.svg.appendChild(this.glowRing);

    // Ocean Core Circle
    this.ocean = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.ocean.setAttribute('cx', this.centerX);
    this.ocean.setAttribute('cy', this.centerY);
    this.ocean.setAttribute('r', this.R);
    this.ocean.setAttribute('fill', this.options.oceanColor);
    this.svg.appendChild(this.ocean);

    // Graticules (Gridlines) Layer
    this.gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.gridGroup.setAttribute('stroke', this.options.gridColor);
    this.gridGroup.setAttribute('stroke-width', '0.5');
    this.gridGroup.setAttribute('fill', 'none');
    this.svg.appendChild(this.gridGroup);

    // Country Landmass Polygons Layer
    this.landGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.landGroup.setAttribute('fill', this.options.landColor);
    this.landGroup.setAttribute('stroke', this.options.borderColor);
    this.landGroup.setAttribute('stroke-width', this.options.borderWidth);
    this.svg.appendChild(this.landGroup);

    // Depth Overlay
    this.depthShade = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.depthShade.setAttribute('cx', this.centerX);
    this.depthShade.setAttribute('cy', this.centerY);
    this.depthShade.setAttribute('r', this.R);
    this.depthShade.setAttribute('fill', 'url(#sphere-depth)');
    this.depthShade.style.pointerEvents = 'none';
    this.svg.appendChild(this.depthShade);

    // Rim Lighting Overlay
    this.rimLight = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.rimLight.setAttribute('cx', this.centerX);
    this.rimLight.setAttribute('cy', this.centerY);
    this.rimLight.setAttribute('r', this.R);
    this.rimLight.setAttribute('fill', 'url(#rim-light)');
    this.rimLight.style.pointerEvents = 'none';
    this.svg.appendChild(this.rimLight);

    // Interactive Markers Layer
    this.markersGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.svg.appendChild(this.markersGroup);

    // Bind Handlers
    this.bindEvents();

    // Load coordinates and run
    this.loadMapData();
  }

  bindEvents() {
    const handleStart = (e) => {
      this.isDragging = true;
      this.svg.style.cursor = 'grabbing';
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      this.lastMouseX = clientX;
      this.lastMouseY = clientY;
      this.lastActiveTime = Date.now();
    };

    const handleMove = (e) => {
      if (!this.isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = clientX - this.lastMouseX;
      const dy = clientY - this.lastMouseY;

      this.lambda += dx * this.options.dragSensitivity;
      this.phi = Math.max(-65, Math.min(65, this.phi - dy * this.options.dragSensitivity));

      this.lastMouseX = clientX;
      this.lastMouseY = clientY;
      this.lastActiveTime = Date.now();
      this.render();
    };

    const handleEnd = () => {
      this.isDragging = false;
      this.svg.style.cursor = 'grab';
    };

    this.svg.addEventListener('mousedown', handleStart);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    this.svg.addEventListener('touchstart', handleStart, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchend', handleEnd);
  }

  loadMapData() {
    // Standard high-performance 110m world countries vector GeoJSON
    const mapUrl = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson';
    fetch(mapUrl)
      .then(res => {
        if (!res.ok) throw new Error("Network issue fetching map GeoJSON");
        return res.json();
      })
      .then(data => {
        this.mapData = data;
        this.render();
        this.startLoop();
      })
      .catch(err => {
        console.warn("Globe could not retrieve GeoJSON, using grid graticules only: ", err);
        this.render();
        this.startLoop();
      });
  }

  project(lon, lat) {
    const radLon = (lon * Math.PI) / 180;
    const radLat = (lat * Math.PI) / 180;
    const radLon0 = (this.lambda * Math.PI) / 180;
    const radLat0 = (this.phi * Math.PI) / 180;

    const cosLat = Math.cos(radLat);
    const sinLat = Math.sin(radLat);
    const cosLonDiff = Math.cos(radLon - radLon0);
    const sinLonDiff = Math.sin(radLon - radLon0);

    // Z depth coordinate on rotated sphere (determines if it's on front hemisphere)
    const Z = Math.sin(radLat0) * sinLat + Math.cos(radLat0) * cosLat * cosLonDiff;

    // Screen mapped coordinates relative to globe center
    const X = cosLat * sinLonDiff;
    const Y = Math.sin(radLat0) * cosLat * cosLonDiff - Math.cos(radLat0) * sinLat;

    return {
      x: this.centerX + this.R * X,
      y: this.centerY + this.R * Y,
      z: Z,
      visible: Z >= 0
    };
  }

  // Segment clipper to avoid back-hemisphere lines drawing straight across the disk
  clipSegment(p1, p2) {
    const getRotatedCartesian = (lon, lat) => {
      const radLon = (lon * Math.PI) / 180;
      const radLat = (lat * Math.PI) / 180;
      const radLon0 = (this.lambda * Math.PI) / 180;
      const radLat0 = (this.phi * Math.PI) / 180;

      const cosLat = Math.cos(radLat);
      const sinLat = Math.sin(radLat);
      const cosLonDiff = Math.cos(radLon - radLon0);
      const sinLonDiff = Math.sin(radLon - radLon0);

      return {
        x: cosLat * sinLonDiff,
        y: Math.sin(radLat0) * cosLat * cosLonDiff - Math.cos(radLat0) * sinLat,
        z: Math.sin(radLat0) * sinLat + Math.cos(radLat0) * cosLat * cosLonDiff
      };
    };

    const c1 = getRotatedCartesian(p1[0], p1[1]);
    const c2 = getRotatedCartesian(p2[0], p2[1]);

    // Scenario A: Both endpoints are on the visible side
    if (c1.z >= 0 && c2.z >= 0) {
      return {
        draw: true,
        x1: this.centerX + this.R * c1.x,
        y1: this.centerY + this.R * c1.y,
        x2: this.centerX + this.R * c2.x,
        y2: this.centerY + this.R * c2.y
      };
    }

    // Scenario B: Both endpoints are hidden on the back face
    if (c1.z < 0 && c2.z < 0) {
      return { draw: false };
    }

    // Scenario C: Line crosses the boundary (Z = 0)
    const t = c1.z / (c1.z - c2.z);
    const xt = c1.x + t * (c2.x - c1.x);
    const yt = c1.y + t * (c2.y - c1.y);
    const dist = Math.sqrt(xt * xt + yt * yt);

    // Normalize to boundary circle coordinates
    const xClip = this.centerX + this.R * (xt / dist);
    const yClip = this.centerY + this.R * (yt / dist);

    if (c1.z >= 0) {
      return {
        draw: true,
        x1: this.centerX + this.R * c1.x,
        y1: this.centerY + this.R * c1.y,
        x2: xClip,
        y2: yClip
      };
    } else {
      return {
        draw: true,
        x1: xClip,
        y1: yClip,
        x2: this.centerX + this.R * c2.x,
        y2: this.centerY + this.R * c2.y
      };
    }
  }

  render() {
    this.renderGrid();
    this.renderLand();
    this.renderMarkers();
  }

  renderGrid() {
    this.gridGroup.innerHTML = '';
    const pathSegments = [];

    // Parallel circles of latitude
    for (let lat = -60; lat <= 60; lat += 30) {
      let segment = [];
      for (let lon = -180; lon <= 180; lon += 8) {
        segment.push([lon, lat]);
      }
      pathSegments.push(segment);
    }

    // Meridians of longitude
    for (let lon = -180; lon < 180; lon += 30) {
      let segment = [];
      for (let lat = -80; lat <= 80; lat += 8) {
        segment.push([lon, lat]);
      }
      pathSegments.push(segment);
    }

    let d = '';
    pathSegments.forEach(segment => {
      let drawing = false;
      for (let i = 0; i < segment.length - 1; i++) {
        const res = this.clipSegment(segment[i], segment[i+1]);
        if (res.draw) {
          if (!drawing) {
            d += ` M ${res.x1} ${res.y1}`;
            drawing = true;
          }
          d += ` L ${res.x2} ${res.y2}`;
        } else {
          drawing = false;
        }
      }
    });

    const gridPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    gridPath.setAttribute('d', d);
    this.gridGroup.appendChild(gridPath);
  }

  renderLand() {
    if (!this.mapData) return;
    this.landGroup.innerHTML = '';

    let d = '';
    this.mapData.features.forEach(feature => {
      const geom = feature.geometry;
      if (!geom) return;

      const processPolygon = (coords) => {
        coords.forEach(ring => {
          let drawing = false;
          for (let i = 0; i < ring.length - 1; i++) {
            const res = this.clipSegment(ring[i], ring[i+1]);
            if (res.draw) {
              if (!drawing) {
                d += ` M ${res.x1} ${res.y1}`;
                drawing = true;
              }
              d += ` L ${res.x2} ${res.y2}`;
            } else {
              drawing = false;
            }
          }
        });
      };

      if (geom.type === 'Polygon') {
        processPolygon(geom.coordinates);
      } else if (geom.type === 'MultiPolygon') {
        geom.coordinates.forEach(poly => processPolygon(poly));
      }
    });

    const landPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    landPath.setAttribute('d', d);
    this.landGroup.appendChild(landPath);
  }

  renderMarkers() {
    this.markersGroup.innerHTML = '';

    this.options.markers.forEach((marker, index) => {
      const pos = this.project(marker.lon, marker.lat);

      if (pos.visible) {
        const markerG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        markerG.setAttribute('class', 'globe-marker');
        markerG.style.opacity = Math.max(0, Math.min(1, pos.z * 5.0)); // Fade out at limb boundary
        markerG.style.cursor = 'pointer';

        const color = marker.color || 'var(--red)';

        // Inner glowing pulse
        const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        pulse.setAttribute('cx', pos.x);
        pulse.setAttribute('cy', pos.y);
        pulse.setAttribute('r', '7');
        pulse.setAttribute('fill', color);
        pulse.setAttribute('opacity', '0.35');

        const pulseAnimate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        pulseAnimate.setAttribute('attributeName', 'r');
        pulseAnimate.setAttribute('values', '4;14;4');
        pulseAnimate.setAttribute('dur', '2.5s');
        pulseAnimate.setAttribute('repeatCount', 'indefinite');
        pulse.appendChild(pulseAnimate);

        const pulseOpacityAnimate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        pulseOpacityAnimate.setAttribute('attributeName', 'opacity');
        pulseOpacityAnimate.setAttribute('values', '0.7;0;0.7');
        pulseOpacityAnimate.setAttribute('dur', '2.5s');
        pulseOpacityAnimate.setAttribute('repeatCount', 'indefinite');
        pulse.appendChild(pulseOpacityAnimate);

        // Core dot
        const core = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        core.setAttribute('cx', pos.x);
        core.setAttribute('cy', pos.y);
        core.setAttribute('r', '4');
        core.setAttribute('fill', color);
        core.setAttribute('stroke', '#0a0a0f');
        core.setAttribute('stroke-width', '1');

        // Tooltip binds
        markerG.addEventListener('mouseenter', (e) => {
          this.showTooltip(e, marker, pos.x, pos.y);
        });
        markerG.addEventListener('mouseleave', () => {
          this.hideTooltip();
        });
        markerG.addEventListener('click', () => {
          if (this.options.onMarkerClick) {
            this.options.onMarkerClick(marker);
          } else if (marker.url) {
            window.location.href = marker.url;
          }
        });

        markerG.appendChild(pulse);
        markerG.appendChild(core);
        this.markersGroup.appendChild(markerG);
      }
    });
  }

  showTooltip(e, marker, x, y) {
    let tooltip = document.getElementById('globe-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'globe-tooltip';
      tooltip.className = 'globe-tooltip';
      document.body.appendChild(tooltip);
    }

    tooltip.style.border = `1px solid ${marker.color || 'var(--red)'}`;
    tooltip.innerHTML = `
      <div class="tooltip-header" style="color:${marker.color || '#fff'}">${marker.label}</div>
      <div class="tooltip-desc">${marker.desc}</div>
      ${marker.url || this.options.onMarkerClick ? '<div class="tooltip-action">Click to inspect sector dossier &rarr;</div>' : ''}
    `;

    const rect = this.container.getBoundingClientRect();
    const tooltipX = rect.left + window.scrollX + x + 16;
    const tooltipY = rect.top + window.scrollY + y - 24;

    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${tooltipY}px`;
    tooltip.style.display = 'block';
    
    // Smooth fade in
    setTimeout(() => {
      tooltip.style.opacity = '1';
    }, 10);
  }

  hideTooltip() {
    const tooltip = document.getElementById('globe-tooltip');
    if (tooltip) {
      tooltip.style.opacity = '0';
      tooltip.style.display = 'none';
    }
  }

  startLoop() {
    const loop = () => {
      const now = Date.now();
      const timeSinceActive = now - this.lastActiveTime;

      // Auto-spin if user is idle for more than 4 seconds and not dragging
      if (this.options.autoRotate && !this.isDragging && timeSinceActive > 4000) {
        this.lambda += this.options.rotateSpeed * 0.08;
        this.render();
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}
