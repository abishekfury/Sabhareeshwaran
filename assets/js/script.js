/* ============================================================
   BRANDIN HALL — CREATIVE DIRECTOR — PORTFOLIO JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initMobileMenu();
  initSplitHeroNav();
  initScrollReveal();
  initHeroAnimation();
  initAccordions();
  initExperienceAccordions();
  initCounterAnimation();
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
        gsap.fromTo('.navbar',
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.1 }
        );
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
  }

  function closeNav() {
    splitMenuBtn.classList.remove('active');
    splitHeroNav.classList.remove('open', 'visible');
    document.body.classList.remove('no-scroll');
  }

  splitMenuBtn.addEventListener('click', () => {
    if (splitHeroNav.classList.contains('open')) {
      closeNav();
    } else {
      openNav();
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

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
  const menuBtn = document.querySelector('.nav-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });

  // Close button trigger
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  }

  // Close menu when clicking on links
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.classList.remove('no-scroll');
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

/* ===== CLIENT ACCORDIONS ===== */
function initAccordions() {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all first
      items.forEach(i => {
        i.classList.remove('active');
        const body = i.querySelector('.accordion-body');
        if (body) body.style.maxHeight = '0';
      });

      // Open clicked (if it was closed)
      if (!isActive) {
        item.classList.add('active');
        const body = item.querySelector('.accordion-body');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ===== EXPERIENCE ACCORDIONS ===== */
function initExperienceAccordions() {
  const items = document.querySelectorAll('.exp-item');

  function openItem(item) {
    items.forEach(i => {
      i.classList.remove('active');
      const b = i.querySelector('.exp-body');
      if (b) b.style.maxHeight = '0';
    });
    item.classList.add('active');
    const body = item.querySelector('.exp-body');
    if (body) body.style.maxHeight = body.scrollHeight + 'px';
  }

  items.forEach(item => {
    const header = item.querySelector('.exp-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      if (isActive) {
        item.classList.remove('active');
        const body = item.querySelector('.exp-body');
        if (body) body.style.maxHeight = '0';
      } else {
        openItem(item);
      }
    });
  });

  // Auto-open first item when section scrolls into view
  const section = document.getElementById('why-us');
  if (section && items.length) {
    let opened = false;
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !opened) {
          opened = true;
          openItem(items[0]);
          sectionObserver.disconnect();
        }
      });
    }, { threshold: 0.2 });
    sectionObserver.observe(section);
  }
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
