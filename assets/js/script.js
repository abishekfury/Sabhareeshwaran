/* ============================================================
   BRANDIN HALL — CREATIVE DIRECTOR — PORTFOLIO JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initPageWrapper();
  initThemeToggle();
  initNavbar();
  initMobileMenu();
  initNavDrawer();
  initHudSearch();
  initSplitHeroNav();
  initScrollReveal();
  initHeroAnimation();
  initExperienceScroller();
  initCounterAnimation();
  initRecommendationsCarousel();
  initSkillsDotGrid();
  initSkillsFlipCards();
  initClocks();
  initCopyright();
  initFeaturedWorkHover();
  initSmoothScroll();
  initParallaxEffects();
  initWorkItemTransitions();
  initStatsRedirects();
  initHeroMatrix();
  initDomainDetailModal();
  initBatchInquiry();
  initHeroRoleCarousel();
  initRolesSlider();
  initHudTopology();
  initLazy3DGallery();
});

/* ===== FOLLOW EYES COMPONENT ===== */
function initFollowEyes() {
  const container = document.querySelector('.follow-eyes');
  if (!container) return;

  const numEyes = parseInt(container.getAttribute('data-eyes') || '2', 10);
  const eyeColor = container.getAttribute('data-eye-color') || '#ffffff';
  const pupilColor = container.getAttribute('data-pupil-color') || '#E05A00';
  const eyeSizePx = parseFloat(container.getAttribute('data-eye-size') || '45');
  const pupilSizePx = parseFloat(container.getAttribute('data-pupil-size') || '16');
  const eyeGapPx = parseFloat(container.getAttribute('data-eye-gap') || '12');
  const trackingSpeed = parseFloat(container.getAttribute('data-tracking-speed') || '0.08');
  const trackingRange = parseFloat(container.getAttribute('data-tracking-range') || '9');
  const blinkingEnabled = container.getAttribute('data-blinking') !== 'false';
  const blinkMinInterval = parseInt(container.getAttribute('data-blink-min-interval') || '1000', 10);
  const blinkMaxInterval = parseInt(container.getAttribute('data-blink-max-interval') || '3000', 10);

  container.style.cssText = `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${eyeGapPx}px;
    vertical-align: middle;
    line-height: 1;
  `;

  container.innerHTML = '';
  for (let i = 0; i < numEyes; i++) {
    const eye = document.createElement('div');
    eye.style.cssText = `
      width: ${eyeSizePx}px;
      height: ${eyeSizePx}px;
      background: ${eyeColor};
      border-radius: 50%;
      position: relative;
      overflow: visible;
      flex-shrink: 0;
      box-shadow: 0 0 15px rgba(255,255,255,0.15), inset 0 0 6px rgba(0,0,0,0.3);
    `;

    const pupil = document.createElement('div');
    pupil.style.cssText = `
      width: ${pupilSizePx}px;
      height: ${pupilSizePx}px;
      background: ${pupilColor};
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 6px ${pupilColor};
      pointer-events: none;
    `;

    eye.appendChild(pupil);
    container.appendChild(eye);
  }

  const eyes = Array.from(container.children);
  const pupils = eyes.map(e => e.firstElementChild);

  // Always initialize to viewport center so tracking is meaningful before any mousemove
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  const onMouseMove = e => { mouseX = e.clientX; mouseY = e.clientY; };
  const onTouchMove = e => {
    if (e.touches && e.touches[0]) { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; }
  };
  const onPointerMove = e => { mouseX = e.clientX; mouseY = e.clientY; };
  const onTouchStart = e => {
    if (e.touches && e.touches[0]) { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; }
  };
  const onPointerDown = e => { mouseX = e.clientX; mouseY = e.clientY; };

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('pointerdown', onPointerDown, { passive: true });

  document.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('touchmove', onTouchMove, { passive: true });
  document.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('touchstart', onTouchStart, { passive: true });
  document.addEventListener('pointerdown', onPointerDown, { passive: true });

  const states = pupils.map(() => ({ x: 0, y: 0 }));
  let active = false;

  function animate() {
    if (!active) return; // stop loop when preloader is done

    eyes.forEach((eye, i) => {
      // getBoundingClientRect accounts for ALL parent CSS transforms (including GSAP scale)
      const r = eye.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      // If eye hasn't rendered yet (scale still near 0), do nothing this frame
      if (r.width < 2) return;

      const dx = mouseX - cx;
      const dy = mouseY - cy;
      const dist = Math.hypot(dx, dy) || 1;

      // Scale tracking range with the eye's current rendered size so movement
      // feels proportional during the GSAP scale-in animation
      const renderScale = Math.min(r.width / eyeSizePx, 1);
      const effectiveRange = trackingRange * renderScale;
      // High-sensitivity mapping: pupil shifts directly towards mouse coordinate
      const clamped = Math.min(dist, effectiveRange);
      const angle = Math.atan2(dy, dx);

      const tx = Math.cos(angle) * clamped;
      const ty = Math.sin(angle) * clamped;

      const s = states[i];
      s.x += (tx - s.x) * trackingSpeed;
      s.y += (ty - s.y) * trackingSpeed;

      // Highly compatible double transform instead of calc()
      pupils[i].style.transform = `translate(-50%, -50%) translate(${s.x}px, ${s.y}px)`;
    });

    requestAnimationFrame(animate);
  }

  // Start is called from initPreloader immediately after gsap.set() so the
  // first getBoundingClientRect() reads the correct post-transform positions
  container._startTracking = () => { active = true; requestAnimationFrame(animate); };

  let blinkTimeout = null;
  if (blinkingEnabled) {
    container._startBlink = () => {
      function triggerBlink() {
        if (!active) return;
        eyes.forEach(e => { e.style.transition = 'transform 0.07s ease-in-out'; e.style.transform = 'scaleY(0.06)'; });
        setTimeout(() => {
          eyes.forEach(e => { e.style.transform = 'scaleY(1)'; });
          setTimeout(() => { eyes.forEach(e => { e.style.transition = ''; }); }, 140);
          const next = blinkMinInterval + Math.random() * (blinkMaxInterval - blinkMinInterval);
          blinkTimeout = setTimeout(triggerBlink, next);
        }, 110);
      }
      blinkTimeout = setTimeout(triggerBlink, 1000);
    };
  }

  // Cleanup event listeners and loops once preloader is hidden/loaded
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const preloader = document.getElementById('preloader');
        if (preloader && preloader.classList.contains('loaded')) {
          active = false;
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('touchmove', onTouchMove);
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('touchstart', onTouchStart);
          window.removeEventListener('pointerdown', onPointerDown);

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('touchmove', onTouchMove);
          document.removeEventListener('pointermove', onPointerMove);
          document.removeEventListener('touchstart', onTouchStart);
          document.removeEventListener('pointerdown', onPointerDown);

          if (blinkTimeout) clearTimeout(blinkTimeout);
          observer.disconnect();
        }
      }
    });
  });
  const preloader = document.getElementById('preloader');
  if (preloader) {
    observer.observe(preloader, { attributes: true });
  }
}

/* ===== PRELOADER ===== */
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return;

  initFollowEyes();

  document.body.classList.add('no-scroll');

  // Safety fallback timeout to prevent any stuck state if GSAP or assets hang
  const safetyTimeout = setTimeout(() => {
    if (!preloader.classList.contains('loaded')) {
      preloader.classList.add('loaded');
      document.body.classList.remove('no-scroll');
      initIntroHeroAnimation();
    }
  }, 4500);

  try {
    if (typeof gsap === 'undefined') {
      // Fallback: make everything visible and fade out preloader after 3s
      document.querySelectorAll('.preloader-wrap > div').forEach(el => {
        el.style.opacity = '1';
      });
      const eyeContainerFb = document.querySelector('.follow-eyes');
      if (eyeContainerFb && eyeContainerFb._startTracking) {
        eyeContainerFb._startTracking();
        if (eyeContainerFb._startBlink) eyeContainerFb._startBlink();
      }
      setTimeout(() => {
        clearTimeout(safetyTimeout);
        preloader.classList.add('loaded');
        document.body.classList.remove('no-scroll');
        initIntroHeroAnimation();
      }, 3000);
      return;
    }

    // Set initial states via GSAP — clean, subtle offsets instead of massive 250px jumps
    gsap.set('.preloader-center-x', { opacity: 0, scale: 0.7 });
    gsap.set('.preloader-name', { opacity: 0, y: -25 });
    gsap.set('.preloader-role', { opacity: 0, y: 25 });

    // Start eye tracking loop immediately so pupils track smoothly from frame 1
    const eyeContainer = document.querySelector('.follow-eyes');
    if (eyeContainer && eyeContainer._startTracking) {
      eyeContainer._startTracking();
      if (eyeContainer._startBlink) eyeContainer._startBlink();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        clearTimeout(safetyTimeout);
        preloader.classList.add('loaded');
        document.body.classList.remove('no-scroll');
        initIntroHeroAnimation();

        // Website reveal animation: smooth hero drag down
        gsap.fromTo('.split-hero',
          { y: -80, scale: 1.03 },
          { y: 0, scale: 1, duration: 1.0, ease: 'power4.out' }
        );
        const isScrolled = window.scrollY > 60;
        if (isScrolled) {
          gsap.fromTo('.navbar',
            { y: -60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out', delay: 0.05, clearProps: 'opacity' }
          );
        } else {
          gsap.fromTo('.navbar',
            { y: -60 },
            { y: 0, duration: 0.9, ease: 'power4.out', delay: 0.05 }
          );
        }
      }
    });

    // 1. Scale and fade in the center eyes smoothly
    tl.to('.preloader-center-x', {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out'
    })
      // 2. Reveal Name & Role simultaneously with gentle slide-in
      .to('.preloader-name', {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.2')
      .to('.preloader-role', {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.35')
      // 3. Hold preloader on screen for ~2.5s so total display is ~3 seconds with eye-tracking active
      .to(preloader, {
        yPercent: -100,
        duration: 0.65,
        ease: 'power3.inOut'
      }, '+=2.3');

  } catch (error) {
    console.error("initPreloader error: ", error);
    clearTimeout(safetyTimeout);
    preloader.classList.add('loaded');
    document.body.classList.remove('no-scroll');
    initIntroHeroAnimation();
  }
}

/* ===== INTRO HERO ANIMATION ===== */
function initIntroHeroAnimation() {
  const subtitle = document.querySelector('.intro-hero-subtitle');
  const name = document.querySelector('.intro-hero-name');
  const bottomSpans = document.querySelectorAll('.intro-hero-bottom span');

  if (subtitle) {
    setTimeout(() => subtitle.classList.add('animate'), 200);
  }

  if (name) {
    setTimeout(() => name.classList.add('animate'), 450);
  }

  bottomSpans.forEach((span, i) => {
    setTimeout(() => span.classList.add('animate'), 800 + i * 150);
  });

  // Start hero image slideshow
  initHeroSlideshow();
  // Right panel stays hidden until user clicks hamburger
}

/* ===== HERO SLIDESHOW ===== */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  let current = 0;

  // Show first slide immediately
  slides[0].classList.add('active');

  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 3500);
}

/* ===== SPLIT HERO NAV ===== */
function initSplitHeroNav() {
  // The split hero hamburger (#splitMenuBtn) is now wired in initNavDrawer.
  // We just need to wire the split-nav-links inside #splitHeroNav (the old desktop panel)
  // Those close via the overlay — no extra code needed.
}

/* ===== NAVBAR ===== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function updateNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar(); // Run once on init
}

/* ===== THEME TOGGLE ===== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const splitThemeToggleBtn = document.getElementById('splitThemeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');

  // Helper to update the text inside old-style mobile theme toggle (no-op for icon-based buttons)
  function updateMobileThemeText(theme) {
    if (mobileThemeToggleBtn) {
      const valueSpan = mobileThemeToggleBtn.querySelector('.theme-value');
      if (valueSpan) valueSpan.textContent = theme === 'light' ? 'LIGHT' : 'DARK';
    }
  }

  // Get current active theme
  const initialTheme = localStorage.getItem('theme') || 'dark';
  if (initialTheme === 'light') {
    document.body.classList.add('light-theme');
    document.documentElement.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
    document.documentElement.classList.remove('light-theme');
  }
  updateMobileThemeText(initialTheme);

  function toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    document.documentElement.classList.toggle('light-theme', isLight);
    const newTheme = isLight ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    updateMobileThemeText(newTheme);

    // Update active color of GSAP-controlled elements
    const grayLines = document.querySelectorAll('.hero-line-gray');
    grayLines.forEach(line => {
      if (line.style.color) {
        line.style.color = isLight ? '#000000' : 'rgba(255, 255, 255, 0.9)';
      }
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (splitThemeToggleBtn) {
    splitThemeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', toggleTheme);
  }
}

/* ===== NAV DRAWER (unified for all hamburgers) ===== */
function initMobileMenu() {
  // This is now handled by initNavDrawer — kept as stub for compat
}

function initNavDrawer() {
  const overlay = document.getElementById('navDrawerOverlay');
  const drawer = document.getElementById('navDrawer');
  const closeBtn = document.getElementById('navDrawerClose');
  const menuBtns = [
    document.getElementById('menuBtn'),
    document.getElementById('splitMenuBtn')
  ];

  if (!overlay || !drawer) return;

  // Build the new menu options dynamically
  const container = drawer.querySelector('.menu-options-container');
  if (container) {
    container.innerHTML = `
      <a href="index.html#about" class="menu-option-link" data-node="about">About</a>
      <a href="index.html#experience" class="menu-option-link" data-node="experience">Experience</a>
      <a href="index.html#skills" class="menu-option-link" data-node="skills">Skills</a>
      <a href="services.html" class="menu-option-link" data-node="services">Services</a>
      <a href="roadmap.html" class="menu-option-link" data-node="certifications">Certifications</a>
      <a href="index.html#education" class="menu-option-link" data-node="education">Education</a>
      <a href="index.html#volunteering" class="menu-option-link" data-node="volunteering">Volunteering</a>
      <a href="index.html#awards" class="menu-option-link" data-node="awards">Honors</a>
      <a href="index.html#recommendations" class="menu-option-link" data-node="reviews">Reviews</a>
      <a href="index.html#publications" class="menu-option-link" data-node="publications">Publications</a>
      <a href="index.html#courses" class="menu-option-link" data-node="courses">Courses</a>
      <a href="index.html#contact" class="menu-option-link" data-node="contact">Connect</a>
    `;
  }

  // On homepage, clean up menu links to enable smooth scrolling without page reloads
  const currentPath = window.location.pathname;
  if (currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '/index.html') {
    drawer.querySelectorAll('.menu-option-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('index.html#')) {
        link.setAttribute('href', href.substring(10));
      }
    });
  }

  function highlightCurrentPageLink() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    const navLinks = drawer.querySelectorAll('.menu-option-link');

    navLinks.forEach(link => {
      link.classList.remove('nav-active');
      const href = link.getAttribute('href');
      if (!href) return;

      if (currentHash && (href === currentHash || href.endsWith(currentHash))) {
        link.classList.add('nav-active');
      } else if (!currentHash || currentHash === '') {
        if (currentPath.includes('services.html') && href === 'services.html') {
          link.classList.add('nav-active');
        } else if (currentPath.includes('roadmap.html') && href === 'roadmap.html') {
          link.classList.add('nav-active');
        } else if (currentPath.includes('roadmap-') && href === 'roadmap.html') {
          link.classList.add('nav-active');
        }
      }
    });
  }

  function openDrawer() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const originY = scrollTop + (viewportHeight / 2);

    const pageWrapper = document.getElementById('page-wrapper');
    if (pageWrapper) {
      pageWrapper.style.transformOrigin = `100% ${originY}px`;
    }

    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.classList.add('no-scroll');
    document.body.classList.add('menu-open');
    if (window.lenis) window.lenis.stop();
    menuBtns.forEach(btn => btn && btn.classList.add('active'));

    // Highlight current link
    highlightCurrentPageLink();

    // High-end GSAP stagger reveal animation for drawer components
    if (window.gsap) {
      const drawerLinks = drawer.querySelectorAll('.menu-option-link');

      // Set initial state to prevent flash before animation
      gsap.set(drawerLinks, { opacity: 0, y: 30 });

      // Sequenced stagger timelines
      gsap.to(drawerLinks, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: 'power3.out',
        delay: 0.2,
        clearProps: 'transform,opacity' // Clears inline styles so hover states work perfectly
      });
    }
  }

  function closeDrawer() {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.classList.remove('no-scroll');
    document.body.classList.remove('menu-open');
    if (window.lenis) window.lenis.start();
    menuBtns.forEach(btn => btn && btn.classList.remove('active'));

    // Reset transform origin after transition
    setTimeout(() => {
      const pageWrapper = document.getElementById('page-wrapper');
      if (pageWrapper && !document.body.classList.contains('menu-open')) {
        pageWrapper.style.transformOrigin = '';
      }
    }, 600);
  }

  // Open on all hamburger buttons
  menuBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', () => {
      if (drawer.classList.contains('open')) closeDrawer();
      else openDrawer();
    });
  });

  // Close on X button
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  // Close on overlay click
  overlay.addEventListener('click', closeDrawer);

  // Close on background click
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer || e.target === drawer.querySelector('.nav-drawer-content')) {
      closeDrawer();
    }
  });

  // Close on link click (smooth scroll to section or page navigation)
  drawer.querySelectorAll('.menu-option-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href) {
        if (href.startsWith('#')) {
          e.preventDefault();
          e.stopImmediatePropagation();
          closeDrawer();
          setTimeout(() => {
            try {
              const target = document.querySelector(href);
              if (target) {
                if (window.lenis) {
                  window.lenis.scrollTo(target, {
                    offset: -80,
                    duration: 1.2,
                    easing: (t) => 1 - Math.pow(1 - t, 3),
                  });
                } else {
                  target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }
            } catch (err) {
              console.warn("Deferred scroll failed:", err);
            }
          }, 550); // wait for 550ms off-canvas transition to finish
        } else {
          // Page link: Close drawer and navigate synchronously to avoid mobile gesture blocking
          closeDrawer();
          window.location.href = href;
        }
      }
    });
  });

  // Close on resize
  window.addEventListener('resize', () => {
    if (drawer.classList.contains('open')) closeDrawer();
  });

  // Close on page wrapper click
  const pageWrapper = document.getElementById('page-wrapper');
  if (pageWrapper) {
    pageWrapper.addEventListener('click', (e) => {
      if (document.body.classList.contains('menu-open')) {
        e.preventDefault();
        e.stopPropagation();
        closeDrawer();
      }
    });
  }

  // Close on page wrapper close button click
  const wrapperCloseBtn = document.getElementById('pageWrapperClose');
  if (wrapperCloseBtn) {
    wrapperCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });
  }

  // Close when clicking the shifted navbar (except hamburger menu buttons)
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.addEventListener('click', (e) => {
      if (document.body.classList.contains('menu-open')) {
        const isMenuBtn = e.target.closest('#menuBtn') || e.target.closest('#splitMenuBtn');
        if (!isMenuBtn) {
          e.preventDefault();
          e.stopPropagation();
          closeDrawer();
        }
      }
    });
  }



  // Run initial highlight
  highlightCurrentPageLink();
}

/* ===== HUD NAV DRAWER SEARCH/FILTER ===== */
function initHudSearch() {
  const searchInput = document.getElementById('hudSearchInput');
  const navLinks = document.querySelectorAll('.nav-drawer-link, .hud-menu-item-link');
  const navCols = document.querySelectorAll('.hud-nav-col, .hud-menu-section');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query === '') {
      // Reset all links and columns to normal state
      navLinks.forEach(link => {
        link.style.opacity = '1';
        link.style.transform = 'none';
        link.style.filter = 'none';
      });
      navCols.forEach(col => {
        col.style.opacity = '1';
      });
      return;
    }

    navLinks.forEach(link => {
      const text = link.textContent.toLowerCase();
      // Check if text matches search query
      if (text.includes(query)) {
        link.style.opacity = '1';
        link.style.transform = 'scale(1.04) translateX(4px)';
        link.style.filter = 'drop-shadow(0 0 8px rgba(224, 90, 0, 0.4))';
      } else {
        link.style.opacity = '0.15';
        link.style.transform = 'scale(0.95)';
        link.style.filter = 'none';
      }
    });

    // Fade out columns that contain no matching links
    navCols.forEach(col => {
      const activeLinks = col.querySelectorAll('.nav-drawer-link, .hud-menu-item-link');
      const hasMatch = Array.from(activeLinks).some(link => link.textContent.toLowerCase().includes(query));
      if (hasMatch) {
        col.style.opacity = '1';
      } else {
        col.style.opacity = '0.35';
      }
    });
  });
}


/* ===== STATS REDIRECTS ===== */
function initStatsRedirects() {
  const linkedinStat = document.getElementById('stat-linkedin');
  const certsStat = document.getElementById('stat-certifications');

  if (linkedinStat) {
    linkedinStat.addEventListener('click', () => {
      window.open('https://www.linkedin.com/in/sabhareeshwaran/', '_blank');
    });
  }

  if (certsStat) {
    certsStat.addEventListener('click', () => {
      const target = document.querySelector('#certifications');
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
}

/* ===== HERO TYPOGRAPHY ANIMATION ===== */
function initHeroAnimation() {
  const heroLines = document.querySelectorAll('.hero-line');
  if (!heroLines.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lines = entry.target.querySelectorAll('.hero-line');
        lines.forEach((line, i) => {
          setTimeout(() => {
            line.classList.add('animate');
          }, i * 130);
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -80px 0px'
  });

  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    observer.observe(heroContent);
  }
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ===== EXPERIENCE BLUR SCROLLER ===== */
function initExperienceScroller() {
  const expSection = document.querySelector('.experience');
  const scrollerList = document.getElementById('expScrollerList');
  const scrollerItems = document.querySelectorAll('.exp-scroller-item');
  const detailsContents = document.querySelectorAll('.exp-details-content');

  if (!expSection || !scrollerList || !scrollerItems.length || !detailsContents.length) return;

  let activeIndex = 0;
  const isDesktop = window.matchMedia('(min-width: 901px)');
  let scrollTriggerInstance = null;

  function setActiveExperience(index) {
    if (index === activeIndex) return;
    activeIndex = index;

    scrollerItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    detailsContents.forEach((detail, i) => {
      if (i === index) {
        detail.classList.add('active');
      } else {
        detail.classList.remove('active');
      }
    });

    // Mobile: animate the wheel translation to center the active item
    if (!isDesktop.matches) {
      const scrollerWindow = document.querySelector('.exp-scroller-window');
      const windowHeight = scrollerWindow ? scrollerWindow.clientHeight : 180;
      const itemHeight = scrollerItems[0].clientHeight || 50;
      const centerY = (windowHeight - itemHeight) / 2;

      gsap.to(scrollerList, {
        y: centerY - index * (itemHeight + 15), // 15px gap
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }

  function initScroller() {
    if (isDesktop.matches) {
      // Desktop Setup: Pin & Scroll
      const scrollerWindow = document.querySelector('.exp-scroller-window');
      const itemHeight = scrollerItems[0].clientHeight || 60;
      const startY = 10; // Top-aligned start position level with right side details

      // Reset list translation to startY for activeIndex
      const totalItems = scrollerItems.length;
      const totalTranslation = (totalItems - 1) * (itemHeight + 15); // including gap

      gsap.set(scrollerList, { y: startY - activeIndex * (itemHeight + 15) });

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: '.experience',
        start: 'top top',
        end: `+=${totalItems * 350}px`,
        pin: true,
        scrub: 0.5,
        id: 'expScrollTrigger',
        animation: gsap.to(scrollerList, {
          y: startY - totalTranslation,
          ease: 'none'
        }),
        onUpdate: (self) => {
          const progress = self.progress;
          // Map progress directly to item indices
          const rawIndex = progress * (totalItems - 0.5);
          const index = Math.max(0, Math.min(totalItems - 1, Math.floor(rawIndex)));
          setActiveExperience(index);
        }
      });

    } else {
      // Mobile Setup: No pin, simple tap to switch
      const scrollerWindow = document.querySelector('.exp-scroller-window');
      const windowHeight = scrollerWindow ? scrollerWindow.clientHeight : 180;
      const itemHeight = scrollerItems[0].clientHeight || 50;
      const centerY = (windowHeight - itemHeight) / 2;

      // Center the active item initially
      gsap.set(scrollerList, { y: centerY - activeIndex * (itemHeight + 15) });
    }

    // Item click handling: bound once using flag to avoid duplication on resize
    scrollerItems.forEach((item, i) => {
      if (!item.dataset.hasListener) {
        item.addEventListener('click', () => {
          if (isDesktop.matches) {
            if (scrollTriggerInstance) {
              const start = scrollTriggerInstance.start;
              const end = scrollTriggerInstance.end;
              const totalItems = scrollerItems.length;
              const targetScroll = start + (i / (totalItems - 1)) * (end - start) + 10;
              window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
              });
            }
          } else {
            setActiveExperience(i);
          }
        });
        item.dataset.hasListener = "true";
      }
    });
  }

  initScroller();

  // Handle resizing/responsiveness
  window.addEventListener('resize', () => {
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
      scrollTriggerInstance = null;
    }
    // Clean up inline styles of list
    gsap.set(scrollerList, { clearProps: 'all' });
    initScroller();
  });
}

/* ===== COUNTER ANIMATION ===== */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number, .proof-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  if (isNaN(target)) return;

  const duration = 2200;
  const start = performance.now();

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function fmtNum(n) {
    return n.toLocaleString('en-IN');
  }

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(easeOutCubic(progress) * target);

    // Preserve the sup element
    const sup = el.querySelector('sup');
    if (sup) {
      el.textContent = fmtNum(value);
      el.appendChild(sup);
    } else {
      el.textContent = fmtNum(value);
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      if (sup) {
        el.textContent = fmtNum(target);
        el.appendChild(sup);
      } else {
        el.textContent = fmtNum(target);
      }
    }
  }

  requestAnimationFrame(update);
}

/* ===== CLOCKS ===== */
function initClocks() {
  const clockElements = document.querySelectorAll('.clock-time');
  if (!clockElements.length) return;

  function updateClocks() {
    clockElements.forEach(el => {
      const tz = el.getAttribute('data-tz');
      if (!tz) return;

      try {
        const time = new Date().toLocaleTimeString('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        el.textContent = time;
      } catch (e) {
        el.textContent = '--:--:--';
      }
    });
  }

  updateClocks();
  setInterval(updateClocks, 1000);
}

/* ===== COPYRIGHT YEAR ===== */
function initCopyright() {
  const copyrightElements = document.querySelectorAll('.copyright-year');
  if (!copyrightElements.length) return;
  const currentYear = new Date().getFullYear();
  copyrightElements.forEach(el => {
    el.textContent = currentYear;
  });
}

/* ===== FEATURED WORK HOVER ===== */
function initFeaturedWorkHover() {
  const workItems = document.querySelectorAll('.work-item');

  workItems.forEach(item => {
    const preview = item.querySelector('.work-item-preview');
    if (!preview) return;

    // RAF-throttled mousemove: avoids triggering layout on every pixel
    let _rafPending = false;
    let _lastClientX = 0;
    let _lastClientY = 0;
    item.addEventListener('mousemove', (e) => {
      _lastClientX = e.clientX;
      _lastClientY = e.clientY;
      if (_rafPending) return;
      _rafPending = true;
      requestAnimationFrame(() => {
        const rect = item.getBoundingClientRect();
        const x = _lastClientX - rect.left;
        const y = _lastClientY - rect.top;
        preview.style.left = `${x - 150}px`;
        preview.style.top = `${y - 110}px`;
        preview.style.transform = 'scale(1) rotate(0deg)';
        _rafPending = false;
      });
    });

    item.addEventListener('mouseenter', () => {
      preview.style.opacity = '1';
      preview.style.transform = 'scale(1) rotate(0deg)';
    });

    item.addEventListener('mouseleave', () => {
      preview.style.opacity = '0';
      preview.style.transform = 'scale(0.85) rotate(-2deg)';
    });

    // Touch support for mobile
    let touchTimer = null;
    item.addEventListener('touchstart', () => {
      workItems.forEach(w => w.classList.remove('touch-active'));
      item.classList.add('touch-active');
      clearTimeout(touchTimer);
      touchTimer = setTimeout(() => item.classList.remove('touch-active'), 2000);
    }, { passive: true });

    item.addEventListener('touchend', () => {
      clearTimeout(touchTimer);
      touchTimer = setTimeout(() => item.classList.remove('touch-active'), 1500);
    }, { passive: true });
  });
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || !targetId.startsWith('#') || targetId === '#') return;

      try {
        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } catch (err) {
        console.warn("Smooth scroll skipped due to invalid selector:", targetId, err);
      }
    });
  });
}

/* ===== PAGE TRANSITION — WORK ITEMS ===== */
function initWorkItemTransitions() {
  document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      if (!href || href === '#' || href.startsWith('mailto') || href.startsWith('http')) return;

      e.preventDefault();
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed; inset: 0; background: #000; z-index: 99999;
        opacity: 0; pointer-events: none;
      `;
      document.body.appendChild(overlay);

      // Animate overlay in
      let start = null;
      const duration = 420;
      function animateOverlay(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        overlay.style.opacity = ease;
        if (progress < 1) {
          requestAnimationFrame(animateOverlay);
        } else {
          window.location.href = href;
        }
      }
      requestAnimationFrame(animateOverlay);
    });
  });
}

/* ===== PARALLAX EFFECTS ===== */
// NOTE: Parallax for .about-bg-text and .about-dot-pattern is handled by GSAP
// ScrollTrigger in animations.js (initParallaxLayers). Duplicating it here with
// raw scroll listeners caused forced layout recalculations (getBoundingClientRect
// inside scroll handler) and style-transform conflicts. No-op here intentionally.
function initParallaxEffects() { }

/* ===== RECOMMENDATIONS 3D CAROUSEL ===== */
function initRecommendationsCarousel() {
  const cards = document.querySelectorAll('.rec-card');
  const nextBtn = document.getElementById('recNextBtn');
  const prevBtn = document.getElementById('recPrevBtn');

  if (!cards.length) return;

  let currentIdx = 0;
  const totalCards = cards.length;

  function updateCarousel() {
    cards.forEach((card, i) => {
      let offset = i - currentIdx;

      // Handle infinite wrapping
      if (offset < -totalCards / 2) offset += totalCards;
      if (offset > totalCards / 2) offset -= totalCards;

      const absOffset = Math.abs(offset);

      // Only show the active card + 2 on each side
      if (absOffset > 2) {
        gsap.to(card, {
          opacity: 0,
          scale: 0.7,
          rotation: offset * 10,
          x: offset * 280,
          y: absOffset * 30,
          visibility: 'hidden',
          pointerEvents: 'none',
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto'
        });
        card.classList.remove('active');
        return;
      }

      // Spacing configuration
      const isMobile = window.innerWidth <= 768;
      const spacing = isMobile ? 120 : 260;
      const translationY = absOffset * (isMobile ? 15 : 30);
      const rotation = offset * (isMobile ? 8 : 12);
      const scale = 1 - absOffset * 0.12;
      const zIndex = 10 - absOffset;

      gsap.to(card, {
        x: offset * spacing,
        y: translationY,
        rotation: rotation,
        scale: scale,
        zIndex: zIndex,
        opacity: 1,
        visibility: 'visible',
        pointerEvents: 'auto',
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto'
      });

      if (offset === 0) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  // Next & Prev click listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIdx = (currentIdx + 1) % totalCards;
      updateCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIdx = (currentIdx - 1 + totalCards) % totalCards;
      updateCarousel();
    });
  }

  // Click card to make active
  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      if (i !== currentIdx) {
        currentIdx = i;
        updateCarousel();
      }
    });
  });

  // Swipe support for mobile touch screens
  let startX = 0;
  const wrapper = document.getElementById('recCarouselWrapper');
  if (wrapper) {
    wrapper.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          currentIdx = (currentIdx + 1) % totalCards;
        } else {
          currentIdx = (currentIdx - 1 + totalCards) % totalCards;
        }
        updateCarousel();
      }
    }, { passive: true });
  }

  // Initialize positioning
  updateCarousel();

  // Debounced resize for carousel
  let _carouselResizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(_carouselResizeTimer);
    _carouselResizeTimer = setTimeout(updateCarousel, 150);
  });
}

/* ===== SKILLS & EDUCATION DYNAMIC DOT GRID ===== */
function initSkillsDotGrid() {
  function initDotGridForSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'skills-dot-grid-canvas';
    section.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let dots = [];
    const spacing = 22; // spacing between dots in pixels
    let width, height;

    const mouse = {
      x: null,
      y: null,
      radius: 130 // interaction radius in pixels
    };

    let cachedRect = { left: 0, top: 0, right: 0, bottom: 0 };
    // Declared early so the scroll listener closure below can reference it safely
    let _visible = false;
    let _rafId = null;

    function resize() {
      const rect = section.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
      // Cache once after resize — avoids getBoundingClientRect inside animation loop
      cachedRect = canvas.getBoundingClientRect();
      initDots();
    }

    // Re-cache rect on scroll (lightweight, only runs when section is visible)
    window.addEventListener('scroll', () => {
      if (_visible) cachedRect = canvas.getBoundingClientRect();
    }, { passive: true });

    function initDots() {
      dots = [];
      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);
      const startX = (width - cols * spacing) / 2;
      const startY = (height - rows * spacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: startX + c * spacing + spacing / 2,
            y: startY + r * spacing + spacing / 2,
            baseX: startX + c * spacing + spacing / 2,
            baseY: startY + r * spacing + spacing / 2
          });
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Use cached rect — no forced reflow inside animation loop
      const rect = cachedRect;
      const isMouseActive = mouse.x !== null && mouse.y !== null &&
        mouse.x >= rect.left && mouse.x <= rect.right &&
        mouse.y >= rect.top && mouse.y <= rect.bottom;

      dots.forEach(dot => {
        let dx = 0;
        let dy = 0;
        let distance = Infinity;

        if (isMouseActive) {
          // Adjust mouse relative to the canvas origin
          const canvasMouseX = mouse.x - rect.left;
          const canvasMouseY = mouse.y - rect.top;

          dx = dot.baseX - canvasMouseX;
          dy = dot.baseY - canvasMouseY;
          distance = Math.sqrt(dx * dx + dy * dy);
        }

        let size = 1.5;
        let alpha = 0.15;
        let color = '255, 69, 0'; // Orange (rgb)

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius; // 0 to 1
          const angle = Math.atan2(dy, dx);
          const repelDist = force * 16; // Repulsion strength

          // Shift dot location
          dot.x = dot.baseX + Math.cos(angle) * repelDist;
          dot.y = dot.baseY + Math.sin(angle) * repelDist;

          // Size and brightness scale
          size = 1.5 + force * 4.5;
          alpha = 0.15 + force * 0.85;
        } else {
          // Return smoothly to grid configuration
          dot.x += (dot.baseX - dot.x) * 0.12;
          dot.y += (dot.baseY - dot.y) * 0.12;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.fill();
      });
      // NOTE: requestAnimationFrame scheduling is handled by the tick() wrapper
      // in startLoop() below — do NOT add requestAnimationFrame(animate) here.
    }

    // Mouse move listener
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // Reset mouse tracker when leaving viewport
    section.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Debounced resize
    let _resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(_resizeTimer);
      _resizeTimer = setTimeout(resize, 120);
    });

    // Pause animation loop when canvas section is off-screen
    function startLoop() {
      if (_rafId) return;
      function tick() {
        animate();
        _rafId = _visible ? requestAnimationFrame(tick) : null;
      }
      _rafId = requestAnimationFrame(tick);
    }
    function stopLoop() {
      if (_rafId) { cancelAnimationFrame(_rafId); _rafId = null; }
    }
    // Override the original animate call with pauseable version
    const _observer = new IntersectionObserver(entries => {
      _visible = entries[0].isIntersecting;
      _visible ? startLoop() : stopLoop();
    }, { threshold: 0 });
    _observer.observe(section);

    resize();
  }

  // Initialize for both skills and education sections
  initDotGridForSection('skills');
  initDotGridForSection('education');
}

/* ===== SKILLS 3D FLIP CARDS ===== */
function initSkillsFlipCards() {
  const cards = document.querySelectorAll('.skill-card-container');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
}

/* ===== HERO CANVAS MATRIX RAIN ===== */
function initHeroMatrix() {
  const canvas = document.getElementById('hero-matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;

  const columns = Math.floor(width / 20) + 1;
  const yPositions = Array(columns).fill(0);

  // cybersecurity-like character set (binary, hex, symbols)
  const chars = "010101010101ABCDEF#@$%&*".split("");

  function step() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.08)'; // trails
    // In light theme, clear with a light color instead!
    const isLightTheme = document.body.classList.contains('light-theme');
    if (isLightTheme) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    }
    ctx.fillRect(0, 0, width, height);

    ctx.font = '11pt monospace';

    yPositions.forEach((y, index) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = index * 20;

      // Color scheme: mostly orange, some steel blue, occasionally white highlights
      const rand = Math.random();
      if (rand < 0.15) {
        ctx.fillStyle = '#ffffff'; // White glow highlight
      } else if (rand < 0.6) {
        ctx.fillStyle = '#E05A00'; // Brand Deep Orange
      } else {
        ctx.fillStyle = '#005F73'; // Brand Steel Blue
      }

      ctx.fillText(char, x, y);

      if (y > 100 + Math.random() * 10000) {
        yPositions[index] = 0;
      } else {
        yPositions[index] = y + 20;
      }
    });
  }

  let _matrixRafId = null;
  let _matrixVisible = false;

  function matrixLoop() {
    step();
    _matrixRafId = _matrixVisible ? requestAnimationFrame(matrixLoop) : null;
  }

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    const newCols = Math.floor(width / 20) + 1;
    while (yPositions.length < newCols) yPositions.push(0);
  }

  let _matrixResizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(_matrixResizeTimer);
    _matrixResizeTimer = setTimeout(resize, 120);
  });

  // Only run matrix when hero section is visible
  const _matrixObserver = new IntersectionObserver(entries => {
    _matrixVisible = entries[0].isIntersecting;
    if (_matrixVisible && !_matrixRafId) matrixLoop();
  }, { threshold: 0 });
  _matrixObserver.observe(canvas);
}

/* ===== DOMAIN DETAILS ACCORDION ===== */
function initDomainDetailModal() {
  const cards = document.querySelectorAll('.domain-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      const isExpanded = card.classList.contains('expanded');

      // Close all other cards to keep layout clean (accordion style)
      cards.forEach(c => {
        c.classList.remove('expanded');
      });

      // Toggle clicked card
      if (!isExpanded) {
        card.classList.add('expanded');
      }
    });
  });
}

/* ===== UPCOMING BATCHES INQUIRY INTERACTION ===== */
function initBatchInquiry() {
  const inquiryBtns = document.querySelectorAll('.batch-inquiry-btn');
  const subjectSelect = document.getElementById('cf-subject');
  const messageTextarea = document.getElementById('cf-message');

  if (!inquiryBtns.length || !subjectSelect || !messageTextarea) return;

  inquiryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const programName = btn.getAttribute('data-program');
      if (!programName) return;

      // Select the training topic automatically
      subjectSelect.value = 'training';

      // Prefill message details for user convenience
      messageTextarea.value = `Hi Sab, I would like to inquire about the upcoming batch for "${programName}". Please share details regarding schedules and admissions.`;

      // Smooth scroll to the contact form section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ===== DYNAMIC HERO ROLE TICKER ===== */
function initHeroRoleCarousel() {
  const el = document.getElementById('heroRoleValue');
  if (!el) return;

  const roles = [
    "CYBERSECURITY PROFESSIONAL",
    "CYBERSECURITY RESEARCHER",
    "SECURITY CONSULTANT",
    "TECHNICAL TRAINER",
    "PUBLIC SPEAKER",
    "CONTENT CREATOR",
    "TECHNOLOGY MENTOR",
    "INNOVATION LEADER",
    "CORPORATE TRAINER",
    "TECHNICAL AUTHOR"
  ];

  let currentIdx = 0;
  const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&!?_-$[]{}';

  function scrambleText(targetText, callback) {
    let currentText = el.textContent;
    let length = Math.max(currentText.length, targetText.length);
    let step = 0;
    const maxSteps = 15;

    const interval = setInterval(() => {
      let display = '';
      for (let i = 0; i < length; i++) {
        if (i < step) {
          display += targetText[i] || '';
        } else {
          if (i < targetText.length || i < currentText.length) {
            display += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }
        }
      }
      el.textContent = display;
      step++;

      if (step > maxSteps) {
        clearInterval(interval);
        el.textContent = targetText;
        if (callback) callback();
      }
    }, 40);
  }

  function cycle() {
    setTimeout(() => {
      currentIdx = (currentIdx + 1) % roles.length;
      scrambleText(roles[currentIdx], cycle);
    }, 3500);
  }

  cycle();
}

/* ===== HUD TOPOLOGY INTERACTIVE MAP ===== */
function initHudTopology() {
  const svg = document.getElementById('hudTopologySvg');
  if (!svg) return;

  const nodeLinks = document.querySelectorAll('.hud-menu-item-link');
  const svgNodes = svg.querySelectorAll('.topo-child-node');
  const infoPanel = document.getElementById('hudNodeInfoPanel');

  const nodeData = {
    skills: { ip: "10.0.3.45", status: "ACTIVE", compiler: "v2.3_GCC", desc: "Technical skill matrix: Security operations, GRC, Ethical Hacking, Forensics, and DevSecOps." },
    volunteering: { ip: "10.0.8.20", status: "ONLINE", compiler: "v1.1_CLANG", desc: "Volunteer records: Community education, tech mentoring, and public security advisor." },
    education: { ip: "10.0.5.12", status: "ACTIVE", compiler: "v2.0_GCC", desc: "Academic profile: Degree in Computer Science, specialized cyber security coursework." },
    awards: { ip: "10.0.3.89", status: "ACTIVE", compiler: "v1.0_GCC", desc: "Honors and recognition: Industry accomplishments and cybersecurity excellence awards." },
    recommendations: { ip: "10.0.1.23", status: "SECURE", compiler: "v2.2_GCC", desc: "Professional recommendations: Peer endorsements and client satisfaction reviews." },
    courses: { ip: "10.0.8.43", status: "ONLINE", compiler: "v3.1_CLANG", desc: "Completed courses: Advanced threat intelligence, digital forensics, and cloud architecture." },
    services: { ip: "10.0.2.10", status: "ACTIVE", compiler: "v2.4_GCC", desc: "Professional offerings: Security Auditing, Vulnerability Assessment, and GRC Consulting." },
    training: { ip: "10.0.2.22", status: "ONLINE", compiler: "v2.1_GCC", desc: "Educational services: Corporate training programs, cyber defense bootcamps, and career coaching." },
    certifications: { ip: "10.0.2.80", status: "ACTIVE", compiler: "v1.8_GCC", desc: "Certification Roadmap: Interactive constellation skill tree tracking 480+ professional credentials." },
    projects: { ip: "10.0.2.15", status: "ACTIVE", compiler: "v2.5_GCC", desc: "Projects and Labs: Practical security tools, vulnerability research, and hands-on lab sandboxes." },
    research: { ip: "10.0.6.10", status: "ONLINE", compiler: "v1.0_GCC", desc: "Security publications: Threat intelligence briefs, security blueprints, and advanced technical research." },
    blog: { ip: "10.0.6.53", status: "OFFLINE", compiler: "N/A", desc: "Thought leadership: Cybersecurity articles, tool analysis, and regular security briefings (Coming soon)." }
  };

  const nodeIpEl = document.getElementById('nodeIp');
  const nodeStatusEl = document.getElementById('nodeStatus');
  const nodeCompilerEl = document.getElementById('nodeCompiler');
  const nodeDescEl = document.getElementById('nodeDesc');
  const infoHeaderEl = infoPanel ? infoPanel.querySelector('.info-header') : null;

  function updateInfoPanel(nodeKey) {
    const data = nodeData[nodeKey];
    if (!data) return;
    if (nodeIpEl) nodeIpEl.textContent = data.ip;
    if (nodeStatusEl) {
      nodeStatusEl.textContent = data.status;
      if (data.status === 'OFFLINE') {
        nodeStatusEl.className = 'info-val';
        nodeStatusEl.style.color = 'var(--red)';
      } else {
        nodeStatusEl.className = 'info-val text-green';
        nodeStatusEl.style.color = '#25D366';
      }
    }
    if (nodeCompilerEl) nodeCompilerEl.textContent = data.compiler;
    if (nodeDescEl) nodeDescEl.textContent = data.desc;
    if (infoHeaderEl) infoHeaderEl.textContent = `// NODE_DETAILS: ${nodeKey.toUpperCase()}_PORT`;
  }

  function resetInfoPanel() {
    if (nodeIpEl) nodeIpEl.textContent = "10.0.3.15";
    if (nodeStatusEl) {
      nodeStatusEl.textContent = "ACTIVE";
      nodeStatusEl.style.color = '#25D366';
    }
    if (nodeCompilerEl) nodeCompilerEl.textContent = "v2.3_GCC";
    if (nodeDescEl) nodeDescEl.textContent = "Core routing node for  index. Hover over nodes or links to analyze systems.";
    if (infoHeaderEl) infoHeaderEl.textContent = "// NODE_DETAILS: SAB_NEXUS";
  }

  function highlightNode(nodeKey) {
    svgNodes.forEach(node => {
      if (node.getAttribute('data-node') === nodeKey) {
        node.classList.add('hover-active');
      } else {
        node.classList.add('dimmed');
      }
    });

    const targetLine = svg.querySelector(`.topo-sub-line[data-line-node="${nodeKey}"]`);
    if (targetLine) targetLine.style.stroke = 'var(--red)';

    nodeLinks.forEach(link => {
      if (link.getAttribute('data-node') === nodeKey) {
        link.style.background = 'rgba(224, 90, 0, 0.12)';
        link.style.borderColor = 'var(--red)';
        link.style.color = 'var(--red)';
      } else {
        link.style.opacity = '0.3';
      }
    });
  }

  function clearHighlights() {
    svgNodes.forEach(node => {
      node.classList.remove('hover-active', 'dimmed');
    });

    const lines = svg.querySelectorAll('.topo-sub-line');
    lines.forEach(line => {
      line.style.stroke = '';
    });

    nodeLinks.forEach(link => {
      link.style.background = '';
      link.style.borderColor = '';
      link.style.color = '';
      link.style.opacity = '';
    });
  }

  // Hover events on Menu Links
  nodeLinks.forEach(link => {
    const nodeKey = link.getAttribute('data-node');
    link.addEventListener('mouseenter', () => {
      highlightNode(nodeKey);
      updateInfoPanel(nodeKey);
    });
    link.addEventListener('mouseleave', () => {
      clearHighlights();
      resetInfoPanel();
    });
  });

  // Hover events on SVG Nodes
  svgNodes.forEach(node => {
    const nodeKey = node.getAttribute('data-node');
    node.addEventListener('mouseenter', () => {
      highlightNode(nodeKey);
      updateInfoPanel(nodeKey);
    });
    node.addEventListener('mouseleave', () => {
      clearHighlights();
      resetInfoPanel();
    });
  });
}

/* ===== ABOUT ROLES SLIDER COMPONENT ===== */
function initRolesSlider() {
  const slider = document.getElementById('aboutRolesSlider');
  const cards = document.querySelectorAll('.role-card');
  const prevBtn = document.getElementById('rolesPrevBtn');
  const nextBtn = document.getElementById('rolesNextBtn');
  const progressBar = document.getElementById('rolesProgressBar');

  if (!slider || !cards.length) return;

  let cardWidth = cards[0].offsetWidth;
  let gap = parseInt(window.getComputedStyle(slider).gap) || 24;

  // Recalculate dimensions on window resize to ensure calculations are correct
  window.addEventListener('resize', () => {
    cardWidth = cards[0].offsetWidth;
    gap = parseInt(window.getComputedStyle(slider).gap) || 24;
    updateActiveCard();
  }, { passive: true });

  // Update active slide class mathematically (reflow-free and layout-thrashing free!)
  function updateActiveCard() {
    const scrollLeft = slider.scrollLeft;
    const cardStep = cardWidth + gap;

    // Determine closest card index mathematically
    const activeIndex = Math.min(cards.length - 1, Math.max(0, Math.round(scrollLeft / cardStep)));

    cards.forEach((card, idx) => {
      if (idx === activeIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // Update progress bar
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(5, progress))}%`;
    }
  }

  // Scroll event listener (passive and lightweight)
  slider.addEventListener('scroll', () => {
    updateActiveCard();
  }, { passive: true });

  // Initial call to set active card and progress
  updateActiveCard();

  // Drag to scroll functionality (uses requestAnimationFrame for high performance)
  let isDown = false;
  let startX;
  let scrollLeftStart;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('dragging');
    startX = e.pageX - slider.offsetLeft;
    scrollLeftStart = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    if (isDown) {
      isDown = false;
      slider.classList.remove('dragging');
      updateActiveCard();
    }
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('dragging');
    updateActiveCard();
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll speed multiplier
    slider.scrollLeft = scrollLeftStart - walk;
    updateActiveCard();
  });

  // Tap/click card to scroll it into focus
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index')) || 0;
      const cardStep = cardWidth + gap;
      slider.scrollTo({ left: idx * cardStep, behavior: 'smooth' });
    });
  });

  // Next/Prev Buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const cardStep = cardWidth + gap;
      slider.scrollBy({ left: cardStep, behavior: 'smooth' });
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const cardStep = cardWidth + gap;
      slider.scrollBy({ left: -cardStep, behavior: 'smooth' });
    });
  }
}

/* ===== DYNAMIC PAGE WRAPPER ===== */
function initPageWrapper() {
  if (document.getElementById('page-wrapper')) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'page-wrapper';

  const keepInBody = [
    'preloader',
    'scrollProgress',
    'navDrawerOverlay',
    'navDrawer',
    'whatsappFloat',
    'navbar'
  ];

  const children = Array.from(document.body.children);
  children.forEach(child => {
    if (child.tagName === 'SCRIPT' ||
      child.tagName === 'NOSCRIPT' ||
      keepInBody.includes(child.id) ||
      child.classList.contains('preloader') ||
      child.classList.contains('nav-drawer-overlay') ||
      child.classList.contains('nav-drawer') ||
      child.classList.contains('scroll-progress') ||
      child.classList.contains('whatsapp-float') ||
      child.classList.contains('side-badge') ||
      child.classList.contains('navbar')) {
      return;
    }
    wrapper.appendChild(child);
  });

  // Create page wrapper close button
  const closeBtn = document.createElement('button');
  closeBtn.id = 'pageWrapperClose';
  closeBtn.className = 'page-wrapper-close';
  closeBtn.setAttribute('aria-label', 'Close menu');
  closeBtn.innerHTML = '&#10005;'; // X
  document.body.appendChild(closeBtn);

  document.body.appendChild(wrapper);
}

/* ===== LAZY-LOAD THREE.JS AND 3D SPHERE GALLERY ===== */
function initLazy3DGallery() {
  const container = document.getElementById('gallery-canvas-container');
  if (!container) return;

  let loaded = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !loaded) {
        loaded = true;
        observer.disconnect();

        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        threeScript.onload = () => {
          const galleryScript = document.createElement('script');
          galleryScript.src = 'assets/js/sphere-gallery.js?v=1.0';
          document.body.appendChild(galleryScript);
        };
        document.body.appendChild(threeScript);
      }
    });
  }, { rootMargin: '400px' });

  observer.observe(container);
}


