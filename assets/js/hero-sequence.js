/**
 * CyberEntity - 180° Hero Rotation Canvas Sequencer
 * High-performance 236-frame scrubbed canvas player with progressive caching,
 * nearest-neighbor fallback, Retina DPI scaling, and interactive 3-perspective HUD.
 */

(function () {
  'use strict';

  const TOTAL_FRAMES = 236;
  const FRAME_PATH = (index) =>
    `assets/images/hero-sequence/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

  let canvas, ctx;
  let trackEl, fallbackWrap;
  let hudDegreeVal, hudTrackFill, hudButtons, scrollHint;
  const images = new Array(TOTAL_FRAMES + 1);
  let loadedCount = 0;
  let isFirstFrameDrawn = false;

  let targetFrame = 1;
  let currentFrame = 1;
  let isReducedMotion = false;

  function init() {
    canvas = document.getElementById('heroSequenceCanvas');
    trackEl = document.getElementById('heroScrollTrack');
    fallbackWrap = document.getElementById('heroFallbackWrap');
    hudDegreeVal = document.getElementById('hudDegreeVal');
    hudTrackFill = document.getElementById('hudTrackFill');
    hudButtons = document.querySelectorAll('.hud-angle-btn');
    scrollHint = document.getElementById('heroScrollRotateHint');

    if (!canvas || !trackEl) return;

    ctx = canvas.getContext('2d', { alpha: false });
    isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    resizeCanvas();
    window.addEventListener('resize', onResize, { passive: true });

    setupHudClicks();
    preloadSequence();
    bindScroll();

    // Start render loop
    requestAnimationFrame(renderLoop);
  }

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const newWidth = Math.round(rect.width * dpr);
    const newHeight = Math.round(rect.height * dpr);

    if (canvas.width !== newWidth || canvas.height !== newHeight) {
      canvas.width = newWidth;
      canvas.height = newHeight;
    }

    // Force redraw current frame on resize
    drawFrame(Math.round(currentFrame));
  }

  let resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 60);
  }

  /**
   * Progressive Preloader
   * 1. Frame 1 immediately
   * 2. Key landmarks (every 20 frames)
   * 3. Remaining frames in batches
   */
  function preloadSequence() {
    // Step 1: Load Frame 1 first
    loadSingleImage(1, () => {
      if (!isFirstFrameDrawn) {
        drawFrame(1);
        isFirstFrameDrawn = true;
        if (fallbackWrap) fallbackWrap.classList.add('ready');
      }
    });

    // Step 2: Load key milestone frames
    const milestones = [1, 30, 60, 90, 118, 150, 180, 210, 236];
    milestones.forEach((idx) => {
      if (idx !== 1) loadSingleImage(idx);
    });

    // Step 3: Progressive chunk loading for remaining frames
    const remaining = [];
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      if (!milestones.includes(i)) remaining.push(i);
    }

    let chunkIndex = 0;
    const CHUNK_SIZE = 16;

    function loadNextChunk() {
      if (chunkIndex >= remaining.length) return;
      const slice = remaining.slice(chunkIndex, chunkIndex + CHUNK_SIZE);
      slice.forEach((idx) => loadSingleImage(idx));
      chunkIndex += CHUNK_SIZE;

      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadNextChunk, { timeout: 100 });
      } else {
        setTimeout(loadNextChunk, 20);
      }
    }

    setTimeout(loadNextChunk, 80);
  }

  function loadSingleImage(index, onComplete) {
    if (images[index]) return;
    const img = new Image();
    img.src = FRAME_PATH(index);
    img.decoding = 'async';
    img.onload = () => {
      images[index] = img;
      loadedCount++;
      if (onComplete) onComplete();
    };
    img.onerror = () => {
      // If an individual frame fails, fallback will handle it
    };
  }

  function findNearestLoadedFrame(targetIdx) {
    if (images[targetIdx] && images[targetIdx].complete && images[targetIdx].naturalWidth > 0) {
      return images[targetIdx];
    }
    // Search outward
    for (let delta = 1; delta < TOTAL_FRAMES; delta++) {
      const lower = targetIdx - delta;
      if (lower >= 1 && images[lower] && images[lower].complete && images[lower].naturalWidth > 0) {
        return images[lower];
      }
      const upper = targetIdx + delta;
      if (upper <= TOTAL_FRAMES && images[upper] && images[upper].complete && images[upper].naturalWidth > 0) {
        return images[upper];
      }
    }
    return null;
  }

  function drawFrame(frameIdx) {
    if (!ctx || !canvas) return;

    const img = findNearestLoadedFrame(frameIdx);
    if (!img) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth || 2560;
    const imgHeight = img.naturalHeight || 1440;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let renderWidth, renderHeight, renderX, renderY;

    // Responsive focal framing:
    // On desktop, align slightly to center-right to complement left text
    const isDesktop = window.innerWidth > 900;
    const focalX = isDesktop ? 0.54 : 0.5;
    const focalY = isDesktop ? 0.2 : 0.15;

    if (canvasRatio > imgRatio) {
      renderWidth = canvasWidth;
      renderHeight = canvasWidth / imgRatio;
      renderX = 0;
      renderY = (canvasHeight - renderHeight) * focalY;
    if (window.innerWidth <= 768) {
      // Mobile Alignment:
      // Frame Sab cleanly in upper ~54% of screen, leaving lower area for text & CTAs
      const targetH = Math.min(canvasHeight * 0.54, Math.max(canvasHeight * 0.44, canvasWidth * 1.05));
      const mobileRatio = targetH / imgHeight;
      renderWidth = Math.round(imgWidth * mobileRatio);
      renderHeight = Math.round(imgHeight * mobileRatio);
      renderX = Math.round((canvasWidth - renderWidth) * 0.5);
      renderY = Math.round(Math.max(14 * (window.devicePixelRatio || 1), canvasHeight * 0.04));
    } else if (window.innerWidth <= 1024) {
      // Tablet Alignment:
      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      renderWidth = imgWidth * ratio;
      renderHeight = imgHeight * ratio;
      renderX = (canvasWidth - renderWidth) * 0.52;
      renderY = (canvasHeight - renderHeight) * 0.15;
    } else {
      renderHeight = canvasHeight;
      renderWidth = canvasHeight * imgRatio;
      renderX = (canvasWidth - renderWidth) * focalX;
      renderY = (canvasHeight - renderHeight) * focalY;
      // Desktop Alignment:
      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      renderWidth = imgWidth * ratio;
      renderHeight = imgHeight * ratio;
      renderX = (canvasWidth - renderWidth) * 0.54;
      renderY = (canvasHeight - renderHeight) * 0.2;
    }

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, renderX, renderY, renderWidth, renderHeight);
  }

  function renderLoop() {
    if (isReducedMotion) {
      // Reduced motion: show center forward perspective
      targetFrame = 118;
      drawFrame(118);
      return;
    }

    // Smooth lerping for Apple-grade inertia
    const diff = targetFrame - currentFrame;
    if (Math.abs(diff) > 0.04) {
      currentFrame += diff * 0.22;
      drawFrame(Math.round(currentFrame));
    }

    requestAnimationFrame(renderLoop);
  }

  function bindScroll() {
    function updateOnScroll() {
      if (!trackEl) return;
      const rect = trackEl.getBoundingClientRect();
      const trackHeight = trackEl.offsetHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = trackHeight - viewportHeight;

      if (maxScroll <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / maxScroll));

      // Map progress to 1..236
      targetFrame = 1 + progress * (TOTAL_FRAMES - 1);

      updateHud(progress);
    }

    // Connect with Lenis if active
    if (window.lenis) {
      window.lenis.on('scroll', updateOnScroll);
    } else {
      window.addEventListener('scroll', updateOnScroll, { passive: true });
    }

    // If GSAP ScrollTrigger refreshes, synchronize
    if (window.ScrollTrigger) {
      ScrollTrigger.addEventListener('refresh', updateOnScroll);
    }

    updateOnScroll();
  }

  function updateHud(progress) {
    // 1. Degree Angle Calculation (-45° Left -> 0° Center -> +45° Right)
    const deg = Math.round(-45 + progress * 90);
    if (hudDegreeVal) {
      hudDegreeVal.textContent = (deg > 0 ? '+' : '') + deg + '°';
    }

    // 2. Track fill bar
    if (hudTrackFill) {
      hudTrackFill.style.width = (progress * 100).toFixed(1) + '%';
    }

    // 3. Active Angle Button State
    let activeStep = 'left';
    if (progress >= 0.35 && progress <= 0.65) {
      activeStep = 'center';
    } else if (progress > 0.65) {
      activeStep = 'right';
    }

    if (hudButtons) {
      hudButtons.forEach((btn) => {
        const step = btn.getAttribute('data-target-step');
        if (step === activeStep) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    // 4. Scroll Hint fade out
    if (scrollHint) {
      if (progress > 0.08) {
        scrollHint.classList.add('faded');
      } else {
        scrollHint.classList.remove('faded');
      }
    }
  }

  function setupHudClicks() {
    if (!hudButtons || !trackEl) return;

    hudButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const step = btn.getAttribute('data-target-step');
        let targetProgress = 0;
        if (step === 'center') targetProgress = 0.5;
        if (step === 'right') targetProgress = 0.96;

        const trackTop = trackEl.getBoundingClientRect().top + (window.pageYOffset || window.scrollY);
        const maxScroll = trackEl.offsetHeight - window.innerHeight;
        const targetScrollY = trackTop + maxScroll * targetProgress;

        if (window.lenis && typeof window.lenis.scrollTo === 'function') {
          window.lenis.scrollTo(targetScrollY, { duration: 1.1 });
        } else {
          window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
