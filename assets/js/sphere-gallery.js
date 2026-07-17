// 3D Sphere Gallery Engine using Three.js

const GALLERY_IMAGES = [
  { src: 'assets/images/about1.jpg', title: 'Cybersecurity Professional', desc: 'Protecting assets, auditing ISMS systems, and securing architectures.' },
  { src: 'assets/images/about2.jpg', title: 'Cybersecurity Researcher', desc: 'Analyzing vulnerabilities, writing papers, and tracking zero-days.' },
  { src: 'assets/images/about3.jpg', title: 'Security Consultant', desc: 'Providing GRC services and risk mitigation strategies.' },
  { src: 'assets/images/about4.jpg', title: 'Technical Trainer', desc: 'Delivering hands-on lab training on CCNA, CEH, and offensive security.' },
  { src: 'assets/images/about5.jpg', title: 'Public Speaker', desc: 'Keynoting at cybersecurity conferences, colleges, and industry panels.' },
  { src: 'assets/images/about6.jpg', title: 'Content Creator', desc: 'Developing lab walkthroughs, security guides, and career resources.' },
  { src: 'assets/images/about7.jpg', title: 'Technology Mentor', desc: 'Guiding freshers and professionals through transition pathways.' },
  { src: 'assets/images/about8.jpg', title: 'Innovation Leader', desc: 'Building future-proof strategies for AI and quantum security.' },
  { src: 'assets/images/about9.jpg', title: 'Corporate Trainer', desc: 'Upholding cybersecurity awareness programs for enterprises.' },
  { src: 'assets/images/about10.jpg', title: 'Technical Author', desc: 'Writing standard operating procedures, documentation, and technical articles.' },
  { src: 'assets/images/img5.png?v=3', title: 'Star of Fastohit 2k23', desc: 'Overall champion trophy presentation.' },
  { src: 'assets/images/img7.png?v=3', title: 'Sathyabama University Speaker', desc: 'Ethical hacking & cybercrime seminar.' },
  { src: 'assets/images/img8.png?v=3', title: 'Care Group of Institutions', desc: 'Network security architectural training.' },
  { src: 'assets/images/img9.png?v=3', title: 'Firewall & SIEM Demos', desc: 'Teaching enterprise defense strategies.' },
  { src: 'assets/images/img10.png?v=3', title: 'Infrastructure Lab Session', desc: 'Hands-on session with firewall controls.' },
  { src: 'assets/images/img11.png?v=3', title: 'Sathyabama Session Speaker', desc: 'Engaging future cybersecurity professionals.' },
  { src: 'assets/images/service1.jpg', title: 'SOC Operations Showcase', desc: 'Security Operations Center dashboard overview.' },
  { src: 'assets/images/service2.png', title: 'Vulnerability Assessment Lab', desc: 'Vulnerability scanning and remediation demo.' },
  { src: 'assets/images/service3.jpg', title: 'Cloud Security Audit', desc: 'Cloud infrastructure auditing session.' },
  { src: 'assets/images/service4.png', title: 'ISMS Compliance Consulting', desc: 'ISO 27001 implementation controls review.' },
  { src: 'assets/images/service05.jpeg', title: 'Incident Response Briefing', desc: 'Analyzing cyber threat entry points.' },
  { src: 'assets/images/service6.jpg', title: 'Executive Cyber Briefing', desc: 'Presenting technical reports to stakeholders.' },
  { src: 'assets/images/about.jpg', title: 'Sab Profile Portrait', desc: 'Professional cybersecurity consultant portrait.' },
  { src: 'assets/images/mentor.jpeg', title: 'Mentorship Session', desc: 'Training session with student groups.' }
];

class SphereGallery {
  constructor() {
    this.container = document.getElementById('gallery-canvas-container');
    if (!this.container) return;

    this.loadingEl = document.getElementById('canvas-loading');
    this.lightbox = document.getElementById('gallery-lightbox');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.lightboxTitle = document.getElementById('lightbox-title');
    this.lightboxDesc = document.getElementById('lightbox-desc');
    this.hudDetails = document.getElementById('hud-details-panel');

    // Default configuration (bindable to sliders)
    this.config = {
      layout: 'sphere', // sphere, grid, cylinder, organic
      speed: 0.7,
      radius: 320,
      itemSize: 90,
      itemCount: 24,
      damping: 0.05
    };

    // Width/Height ratio for plane geometry
    this.aspectRatio = 4 / 3;

    // Interaction states
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.dragRotation = { x: 0, y: 0 };
    this.targetRotation = { x: 0, y: 0 };
    this.currentRotation = { x: 0, y: 0 };
    this.zoomDistance = 650;
    this.targetZoomDistance = 650;

    // Raycasting & mouse
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredNode = null;
    this.focusedNode = null;

    // ThreeJS components
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.group = null;
    this.meshes = [];
    this.textures = [];

    this.init();
  }

  async init() {
    this.setupScene();
    await this.loadTextures();
    this.createGalleryMeshes();
    this.updateLayoutPositions();
    this.setupEvents();
    this.setupSliders();
    this.animate();

    // Hide spinner once loaded
    if (this.loadingEl) {
      this.loadingEl.classList.add('loaded');
    }
  }

  setupScene() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.scene = new THREE.Scene();

    // Add Fog for organic depth in darker spaces
    this.scene.fog = new THREE.FogExp2(0x060606, 0.001);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    this.camera.position.z = this.zoomDistance;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Group for dragging rotation
    this.group = new THREE.Group();
    this.scene.add(this.group);

    // Subtle ambient lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(ambientLight);
  }

  loadTextures() {
    const loader = new THREE.TextureLoader();
    const loadPromises = GALLERY_IMAGES.map((imgData, index) => {
      return new Promise((resolve) => {
        loader.load(
          imgData.src,
          (texture) => {
            texture.minFilter = THREE.LinearFilter;
            texture.generateMipmaps = false;
            this.textures[index] = texture;
            resolve();
          },
          undefined,
          () => {
            // Fallback: create plain colored canvas texture if image fails to load
            console.warn(`Failed to load texture: ${imgData.src}`);
            const canvas = document.createElement('canvas');
            canvas.width = 128;
            canvas.height = 128;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#E05A00';
            ctx.fillRect(0, 0, 128, 128);
            ctx.fillStyle = '#ffffff';
            ctx.font = '14px Arial';
            ctx.fillText(imgData.title.substring(0, 10), 10, 64);
            const texture = new THREE.CanvasTexture(canvas);
            this.textures[index] = texture;
            resolve();
          }
        );
      });
    });

    return Promise.all(loadPromises);
  }

  createGalleryMeshes() {
    const baseW = this.config.itemSize;
    const baseH = baseW / this.aspectRatio;
    const geometry = new THREE.PlaneGeometry(baseW, baseH);

    for (let i = 0; i < GALLERY_IMAGES.length; i++) {
      const texture = this.textures[i];
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
        depthWrite: true,
        depthTest: true
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Store custom metadata
      mesh.userData = {
        id: i,
        title: GALLERY_IMAGES[i].title,
        desc: GALLERY_IMAGES[i].desc,
        src: GALLERY_IMAGES[i].src
      };

      // Set initial state
      mesh.position.set(0, 0, 0);
      mesh.targetPosition = new THREE.Vector3(0, 0, 0);
      mesh.targetQuaternion = new THREE.Quaternion();

      this.group.add(mesh);
      this.meshes.push(mesh);
    }
  }

  updateLayoutPositions() {
    const count = this.config.itemCount;
    const radius = this.config.radius;
    const baseW = this.config.itemSize;
    const baseH = baseW / this.aspectRatio;

    // Filter which meshes are visible based on count config
    for (let i = 0; i < this.meshes.length; i++) {
      this.meshes[i].visible = i < count;
    }

    if (this.config.layout === 'sphere') {
      // Fibonacci Sphere algorithm for even spacing
      for (let i = 0; i < count; i++) {
        const mesh = this.meshes[i];
        const phi = Math.acos(1 - 2 * (i + 0.5) / count);
        const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        mesh.targetPosition.set(x, y, z);

        // Face outward from center
        const lookTarget = new THREE.Vector3(x * 2, y * 2, z * 2);
        const m = new THREE.Matrix4();
        m.lookAt(mesh.targetPosition, lookTarget, new THREE.Vector3(0, 1, 0));
        mesh.targetQuaternion.setFromRotationMatrix(m);
      }
    }
    else if (this.config.layout === 'grid') {
      // Flat 2D grid facing the camera
      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);
      const spacingX = baseW * 1.3;
      const spacingY = baseH * 1.3;

      for (let i = 0; i < count; i++) {
        const mesh = this.meshes[i];
        const col = i % cols;
        const row = Math.floor(i / cols);

        const x = (col - (cols - 1) / 2) * spacingX;
        const y = (row - (rows - 1) / 2) * -spacingY; // Go top-to-bottom
        const z = 0;

        mesh.targetPosition.set(x, y, z);

        // Face forward parallel to screen
        mesh.targetQuaternion.set(0, 0, 0, 1);
      }
    }
    else if (this.config.layout === 'cylinder') {
      // Concentric rings arranged vertically
      const rings = Math.max(2, Math.ceil(count / 8));
      const itemsPerRing = Math.ceil(count / rings);
      const ringHeight = baseH * 1.5;

      for (let i = 0; i < count; i++) {
        const mesh = this.meshes[i];
        const ringIndex = Math.floor(i / itemsPerRing);
        const ringOffset = ringIndex - (rings - 1) / 2;

        const angle = (i % itemsPerRing) * (Math.PI * 2 / itemsPerRing);
        const x = radius * Math.cos(angle);
        const y = ringOffset * ringHeight;
        const z = radius * Math.sin(angle);

        mesh.targetPosition.set(x, y, z);

        // Face outward from central vertical cylinder axis
        const lookTarget = new THREE.Vector3(x * 2, y, z * 2);
        const m = new THREE.Matrix4();
        m.lookAt(mesh.targetPosition, lookTarget, new THREE.Vector3(0, 1, 0));
        mesh.targetQuaternion.setFromRotationMatrix(m);
      }
    }
    else if (this.config.layout === 'organic') {
      // Random organic floating distribution inside outer spherical volume
      // Seed random so switching organic doesn't shuffle every frame
      let seed = 42;
      const random = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
      };

      for (let i = 0; i < count; i++) {
        const mesh = this.meshes[i];
        const u = random();
        const v = random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);

        // Distribute in a thick shell
        const r = radius * (0.7 + random() * 0.4);

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        mesh.targetPosition.set(x, y, z);

        // Face camera directly with slight organic rotation tilt
        const tiltX = (random() - 0.5) * 0.15;
        const tiltY = (random() - 0.5) * 0.15;
        const tiltZ = (random() - 0.5) * 0.15;

        const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(tiltX, tiltY, tiltZ));
        mesh.targetQuaternion.copy(q);
      }
    }
  }

  setupEvents() {
    // Window resize
    window.addEventListener('resize', this.onResize.bind(this));

    // Pointer events on container canvas
    const canvas = this.renderer.domElement;

    canvas.addEventListener('pointerdown', (e) => {
      this.isDragging = true;
      canvas.setPointerCapture(e.pointerId);
      this.dragStart.x = e.clientX;
      this.dragStart.y = e.clientY;
      this.dragRotation.x = this.targetRotation.x;
      this.dragRotation.y = this.targetRotation.y;
    });

    canvas.addEventListener('pointermove', (e) => {
      // Raycast update (for hovering details)
      this.updateRaycasting(e);

      if (!this.isDragging) return;

      const deltaX = e.clientX - this.dragStart.x;
      const deltaY = e.clientY - this.dragStart.y;

      const sensitivity = 0.005;
      this.targetRotation.y = this.dragRotation.y + deltaX * sensitivity;
      this.targetRotation.x = this.dragRotation.x + deltaY * sensitivity;

      // Restrict vertical rotation to prevent flipping upside down
      this.targetRotation.x = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, this.targetRotation.x));
    });

    const pointerUpHandler = (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      canvas.releasePointerCapture(e.pointerId);

      // If dragging is negligible, click!
      const deltaX = Math.abs(e.clientX - this.dragStart.x);
      const deltaY = Math.abs(e.clientY - this.dragStart.y);
      if (deltaX < 5 && deltaY < 5) {
        this.handleClick(e);
      }
    };

    canvas.addEventListener('pointerup', pointerUpHandler);
    canvas.addEventListener('pointercancel', pointerUpHandler);

    // Scroll wheel zoom
    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      // Zoom factor: tweak speed
      this.targetZoomDistance += e.deltaY * 0.4;
      // Boundaries
      this.targetZoomDistance = Math.max(300, Math.min(1200, this.targetZoomDistance));
    }, { passive: false });

    // Focus Node action button in HUD
    const focusBtn = document.getElementById('btn-focus-node');
    if (focusBtn) {
      focusBtn.addEventListener('click', () => {
        if (this.focusedNode) {
          this.triggerFocusZoom(this.focusedNode);
        }
      });
    }

    // Lightbox modal close
    const lightboxClose = document.getElementById('lightbox-close-btn');
    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => this.closeLightbox());
    }
    const lightboxOverlay = this.lightbox.querySelector('.lightbox-overlay');
    if (lightboxOverlay) {
      lightboxOverlay.addEventListener('click', () => this.closeLightbox());
    }

    // Close lightbox on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeLightbox();
      }
    });
  }

  onResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  updateRaycasting(e) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    // Raycast only against visible meshes
    const visibleMeshes = this.meshes.filter(m => m.visible);
    const intersects = this.raycaster.intersectObjects(visibleMeshes);

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object;

      if (this.hoveredNode !== hitMesh) {
        // Reset old hover
        if (this.hoveredNode) {
          this.hoveredNode.scale.set(1, 1, 1);
          this.hoveredNode.material.opacity = 0.85;
        }

        // Apply new hover
        this.hoveredNode = hitMesh;
        this.hoveredNode.scale.set(1.15, 1.15, 1);
        this.hoveredNode.material.opacity = 1.0;

        // Play feedback sound/vibration if supported
        if (navigator.vibrate) {
          navigator.vibrate(5);
        }

        // Update HUD Details Panel
        this.updateHUDDetails(hitMesh.userData);
      }
      this.container.style.cursor = 'pointer';
    } else {
      if (this.hoveredNode) {
        this.hoveredNode.scale.set(1, 1, 1);
        this.hoveredNode.material.opacity = 0.85;
        this.hoveredNode = null;

        // Hide details unless something is focused
        if (!this.focusedNode) {
          this.clearHUDDetails();
        } else {
          this.updateHUDDetails(this.focusedNode.userData);
        }
      }
      this.container.style.cursor = this.isDragging ? 'grabbing' : 'grab';
    }
  }

  handleClick(e) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const visibleMeshes = this.meshes.filter(m => m.visible);
    const intersects = this.raycaster.intersectObjects(visibleMeshes);

    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object;
      this.focusedNode = clickedMesh;
      this.triggerFocusZoom(clickedMesh);
    }
  }

  triggerFocusZoom(mesh) {
    // Zoom in on node
    this.targetZoomDistance = 450;

    // Rotate the group so that the node faces the camera
    // To do this, we need the node's position in world coordinates to align with the camera direction (0, 0, Z)
    // The node's local position is mesh.targetPosition. We want to rotate the group by an angle that offsets this.
    // Specifically, if targetPosition is p, we want group rotation to align -p with the Z axis.
    const pos = mesh.targetPosition.clone();

    // Calculate polar angles of the position
    const r = pos.length();
    if (r > 0) {
      const theta = Math.atan2(pos.x, pos.z);
      const phi = Math.asin(pos.y / r);

      // Target rotations for group
      this.targetRotation.y = -theta;
      this.targetRotation.x = phi;
    }

    // Delay the lightbox trigger slightly to allow camera glide first
    setTimeout(() => {
      this.openLightbox(mesh.userData);
    }, 450);
  }

  updateHUDDetails(data) {
    if (!this.hudDetails) return;
    const placeholder = this.hudDetails.querySelector('.hud-details-placeholder');
    const dataContainer = this.hudDetails.querySelector('.hud-details-data');
    const titleEl = this.hudDetails.querySelector('.hud-details-title');
    const descEl = this.hudDetails.querySelector('.hud-details-desc');

    if (placeholder && dataContainer && titleEl && descEl) {
      placeholder.style.display = 'none';
      dataContainer.style.display = 'flex';
      titleEl.textContent = data.title;
      descEl.textContent = data.desc;
    }
  }

  clearHUDDetails() {
    if (!this.hudDetails) return;
    const placeholder = this.hudDetails.querySelector('.hud-details-placeholder');
    const dataContainer = this.hudDetails.querySelector('.hud-details-data');

    if (placeholder && dataContainer) {
      placeholder.style.display = 'block';
      dataContainer.style.display = 'none';
    }
  }

  openLightbox(data) {
    if (!this.lightbox) return;

    this.lightboxImg.classList.remove('loaded');
    this.lightboxImg.src = data.src;
    this.lightboxImg.alt = data.title;
    this.lightboxTitle.textContent = data.title;
    this.lightboxDesc.textContent = data.desc;

    this.lightboxImg.onload = () => {
      this.lightboxImg.classList.add('loaded');
    };

    this.lightbox.classList.add('open');
    document.body.classList.add('no-scroll');
  }

  closeLightbox() {
    if (!this.lightbox) return;
    this.lightbox.classList.remove('open');
    document.body.classList.remove('no-scroll');
    this.focusedNode = null;
  }

  setupSliders() {
    // Layout switches
    const layoutBtns = document.querySelectorAll('[data-layout]');
    layoutBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        layoutBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.config.layout = btn.getAttribute('data-layout');
        this.updateLayoutPositions();
      });
    });

    // Speed Slider
    const speedSlider = document.getElementById('slider-speed');
    const speedDisplay = document.getElementById('val-speed');
    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.config.speed = val;
        speedDisplay.textContent = val.toFixed(1) + 'x';
      });
    }

    // Radius Slider
    const radiusSlider = document.getElementById('slider-radius');
    const radiusDisplay = document.getElementById('val-radius');
    if (radiusSlider) {
      radiusSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        this.config.radius = val;
        radiusDisplay.textContent = val + 'px';
        this.updateLayoutPositions();
      });
    }

    // Item Size Slider
    const sizeSlider = document.getElementById('slider-size');
    const sizeDisplay = document.getElementById('val-size');
    if (sizeSlider) {
      sizeSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        this.config.itemSize = val;
        sizeDisplay.textContent = val + 'px';

        // Scale existing meshes
        const scaleFactor = val / 100;
        this.meshes.forEach(m => {
          m.scale.set(scaleFactor, scaleFactor, 1);
        });
      });
    }

    // Item Count Slider
    const countSlider = document.getElementById('slider-count');
    const countDisplay = document.getElementById('val-count');
    if (countSlider) {
      countSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        this.config.itemCount = val;
        countDisplay.textContent = val;
        this.updateLayoutPositions();
      });
    }

    // Damping Slider
    const dampingSlider = document.getElementById('slider-damping');
    const dampingDisplay = document.getElementById('val-damping');
    if (dampingSlider) {
      dampingSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.config.damping = val;
        dampingDisplay.textContent = val.toFixed(2);
      });
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    // Smooth position & rotation transitions for meshes (layout transitions)
    const lerpFactor = 0.08;
    for (let i = 0; i < this.meshes.length; i++) {
      const mesh = this.meshes[i];
      mesh.position.lerp(mesh.targetPosition, lerpFactor);
      mesh.quaternion.slerp(mesh.targetQuaternion, lerpFactor);
    }

    // Auto-rotation when not dragging
    if (!this.isDragging) {
      this.targetRotation.y += this.config.speed * 0.003;
    }

    // Interpolate group rotations (drag rotation with damping)
    const damp = this.config.damping;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * damp;
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * damp;

    this.group.rotation.y = this.currentRotation.y;
    this.group.rotation.x = this.currentRotation.x;

    // Camera zoom interpolation
    this.zoomDistance += (this.targetZoomDistance - this.zoomDistance) * 0.08;
    this.camera.position.z = this.zoomDistance;

    this.renderer.render(this.scene, this.camera);
  }
}

// Instantiate once DOM is fully parsed
document.addEventListener('DOMContentLoaded', () => {
  // Check if WebGL is available first
  try {
    const canvas = document.createElement('canvas');
    const glAvailable = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    if (glAvailable) {
      new SphereGallery();
    } else {
      console.error('WebGL is not supported in this browser.');
      const container = document.getElementById('gallery-canvas-container');
      if (container) {
        container.innerHTML = `
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#E05A00;font-family:monospace;padding:2rem;text-align:center;">
            <span>[ ERROR: WEBGL_INTERFACE_UNAVAILABLE ]</span>
            <p style="color:#fff;margin-top:1rem;font-size:0.85rem;max-width:400px;">
              Your browser or graphics card does not seem to support WebGL. Please upgrade or switch hardware acceleration settings.
            </p>
          </div>
        `;
      }
    }
  } catch (e) {
    console.error('Error verifying WebGL status:', e);
  }
});
