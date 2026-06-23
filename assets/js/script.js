/* ============================================================
   BRANDIN HALL — CREATIVE DIRECTOR — PORTFOLIO JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initThemeToggle();
  initNavbar();
  initMobileMenu();
  initSplitHeroNav();
  initScrollReveal();
  initHeroAnimation();
  initExperienceScroller();
  initCounterAnimation();
  initRecommendationsCarousel();
  initSkillsDotGrid();
  initSkillsFlipCards();
  initClocks();
  initFeaturedWorkHover();
  initSmoothScroll();
  initParallaxEffects();
  initWorkItemTransitions();
  initStatsRedirects();
});

/* ===== PRELOADER ===== */
function initPreloader() {
  console.log("initPreloader: Initializing...");
  const preloader = document.querySelector('.preloader');
  if (!preloader) {
    console.warn("initPreloader: Preloader element not found.");
    return;
  }

  document.body.classList.add('no-scroll');

  try {
    if (typeof gsap === 'undefined') {
      console.warn("initPreloader: GSAP is not defined. Falling back to CSS transition.");
      // Fallback: make everything visible and fade out preloader after 2s
      document.querySelectorAll('.preloader-wrap > div').forEach(el => {
        el.style.opacity = '1';
      });
      setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.classList.remove('no-scroll');
        initIntroHeroAnimation();
      }, 2000);
      return;
    }

    // Set initial states via GSAP
    gsap.set('.preloader-center-x', { opacity: 0, scale: 0, rotation: -180 });
    gsap.set('.preloader-name', { opacity: 0, y: -250 });
    gsap.set('.preloader-role', { opacity: 0, y: 250 });

    const tl = gsap.timeline({
      onComplete: () => {
        console.log("initPreloader: Timeline complete. Exiting...");
        // Exit animation: preloader slides up
        gsap.to(preloader, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete: () => {
            preloader.classList.add('loaded');
            document.body.classList.remove('no-scroll');
            initIntroHeroAnimation();
          }
        });

        // Website reveal animation: parallax drag down
        gsap.fromTo('.split-hero',
          { y: -120, scale: 1.05 },
          { y: 0, scale: 1, duration: 1.4, ease: 'power4.out' }
        );
        const isScrolled = window.scrollY > 60;
        if (isScrolled) {
          gsap.fromTo('.navbar',
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.1, clearProps: 'opacity' }
          );
        } else {
          gsap.fromTo('.navbar',
            { y: -80 },
            { y: 0, duration: 1.2, ease: 'power4.out', delay: 0.1 }
          );
        }
      }
    });

    // 1. Spin and scale in the center X
    tl.to('.preloader-center-x', {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: 'back.out(1.5)'
    })
      // 2. Slide in the name and role from top and bottom to meet X
      .to('.preloader-name', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power4.out'
      }, '-=0.3')
      .to('.preloader-role', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power4.out'
      }, '-=1.2')
      // 3. Hold the complete matched logo state
      .to({}, { duration: 0.6 });

  } catch (error) {
    console.error("initPreloader error: ", error);
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

/* ===== SPLIT HERO NAV (hamburger inside left panel) ===== */
function initSplitHeroNav() {
  const splitMenuBtn = document.getElementById('splitMenuBtn');
  const splitNavClose = document.getElementById('splitNavClose');
  const splitHeroNav = document.getElementById('splitHeroNav');

  if (!splitMenuBtn || !splitHeroNav) return;

  function openNav() {
    splitMenuBtn.classList.add('active');
    splitHeroNav.classList.add('open');
    // Stagger links after panel starts expanding
    setTimeout(() => splitHeroNav.classList.add('visible'), 80);
    document.body.classList.add('no-scroll');
    if (window.lenis) window.lenis.stop();
  }

  function closeNav() {
    splitMenuBtn.classList.remove('active');
    splitHeroNav.classList.remove('open', 'visible');
    document.body.classList.remove('no-scroll');
    if (window.lenis) window.lenis.start();
  }

  splitMenuBtn.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      const mobileMenu = document.getElementById('mobileMenu');
      const menuBtn = document.getElementById('menuBtn');
      if (mobileMenu && menuBtn) {
        menuBtn.classList.add('active');
        mobileMenu.classList.add('open');
        document.body.classList.add('no-scroll');
        if (window.lenis) window.lenis.stop();
      }
    } else {
      if (splitHeroNav.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    }
  });

  if (splitNavClose) {
    splitNavClose.addEventListener('click', closeNav);
  }

  // Close on link click (both desktop and mobile)
  splitHeroNav.querySelectorAll('.split-nav-link').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // On resize: close if open (so panel doesn't get stuck)
  window.addEventListener('resize', () => {
    if (splitHeroNav.classList.contains('open')) {
      closeNav();
    }
  });
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

  // Helper to update the text inside the mobile theme toggle button
  function updateMobileThemeText(theme) {
    if (mobileThemeToggleBtn) {
      const valueSpan = mobileThemeToggleBtn.querySelector('.theme-value');
      if (valueSpan) {
        valueSpan.textContent = theme === 'light' ? 'LIGHT' : 'DARK';
      }
    }
  }

  // Get current active theme
  const initialTheme = localStorage.getItem('theme') || 'dark';
  updateMobileThemeText(initialTheme);

  function toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    const newTheme = isLight ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    updateMobileThemeText(newTheme);

    // Update active color of GSAP-controlled elements to prevent color mismatch
    const grayLines = document.querySelectorAll('.hero-line-gray');
    grayLines.forEach(line => {
      if (line.style.color) {
        line.style.color = isLight ? '#000000' : 'rgba(255, 255, 255, 0.9)';
      }
    });

    console.log(`Theme switched to: ${newTheme}`);
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

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
  const menuBtn = document.querySelector('.nav-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    const isOpen = mobileMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
    if (window.lenis) {
      if (isOpen) window.lenis.stop();
      else window.lenis.start();
    }
  });

  // Close button trigger
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.classList.remove('no-scroll');
      if (window.lenis) window.lenis.start();
    });
  }

  // Close menu when clicking on links
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.classList.remove('no-scroll');
      if (window.lenis) window.lenis.start();
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
      const windowHeight = scrollerWindow ? scrollerWindow.clientHeight : 400;
      const itemHeight = scrollerItems[0].clientHeight || 60;
      const centerY = (windowHeight - itemHeight) / 2;

      // Reset list translation to centerY for activeIndex
      const totalItems = scrollerItems.length;
      const totalTranslation = (totalItems - 1) * (itemHeight + 15); // including gap

      gsap.set(scrollerList, { y: centerY - activeIndex * (itemHeight + 15) });

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: '.experience',
        start: 'top top',
        end: `+=${totalItems * 350}px`,
        pin: true,
        scrub: 0.5,
        id: 'expScrollTrigger',
        animation: gsap.to(scrollerList, {
          y: centerY - totalTranslation,
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
  const counters = document.querySelectorAll('.stat-number');
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

/* ===== FEATURED WORK HOVER ===== */
function initFeaturedWorkHover() {
  const workItems = document.querySelectorAll('.work-item');

  workItems.forEach(item => {
    const preview = item.querySelector('.work-item-preview');
    if (!preview) return;

    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Position preview relative to cursor
      preview.style.left = `${x - 150}px`;
      preview.style.top = `${y - 110}px`;
      preview.style.transform = 'scale(1) rotate(0deg)';
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
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
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
function initParallaxEffects() {
  const aboutBgText = document.querySelector('.about-bg-text');
  const dotPatterns = document.querySelectorAll('.about-dot-pattern');

  if (!aboutBgText && !dotPatterns.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (aboutBgText) {
      const rect = aboutBgText.closest('.about')?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        aboutBgText.style.transform = `translate(-50%, ${-60 + progress * 12}%) scale(${1 + progress * 0.05})`;
      }
    }

    dotPatterns.forEach((dot, i) => {
      const speed = i % 2 === 0 ? 0.03 : -0.02;
      const rect = dot.closest('.about')?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (window.innerHeight - rect.top) * speed;
        dot.style.transform = `translateY(${offset}px)`;
      }
    });
  }, { passive: true });
}

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

  // Recalculate on screen resize
  window.addEventListener('resize', updateCarousel);
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

    function resize() {
      const rect = section.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
      initDots();
    }

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

      const rect = canvas.getBoundingClientRect();
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

      requestAnimationFrame(animate);
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

    window.addEventListener('resize', resize);

    resize();
    animate();
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
