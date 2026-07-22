/* ============================================================
   HERO SECTION SCROLLTRIGGER ANIMATIONS
   ============================================================ */

// Declare lenis in global scope so it's accessible in resize/unload handlers
let lenis;

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugin
  gsap.registerPlugin(ScrollTrigger);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     LENIS SMOOTH SCROLL
     ============================================================ */

  function initSmoothScroll() {
    if (prefersReducedMotion) return;

    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.8,
    });

    // Connect Lenis to GSAP ticker for smooth integration
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Restore default lag smoothing (500ms/33ms) so GSAP catches up gracefully
    // on heavy frames instead of compounding lag
    gsap.ticker.lagSmoothing(500, 33);

    lenis.on('scroll', ScrollTrigger.update);
    window.lenis = lenis;
  }

  /* ============================================================
     SCROLL PROGRESS BAR
     ============================================================ */
  function initScrollProgressBar() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    function updateProgress() {
      const scrollTop = lenis ? lenis.scroll : window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      progressBar.style.width = progress + '%';

      // Add glow effect when scrolling
      if (progress > 0) {
        progressBar.style.boxShadow = `0 0 ${Math.min(20, progress / 5)}px rgba(255, 69, 0, 0.6)`;
      } else {
        progressBar.style.boxShadow = '0 0 10px rgba(255, 69, 0, 0.5)';
      }
    }

    // Update progress on scroll
    if (lenis) {
      lenis.on('scroll', updateProgress);
    } else {
      window.addEventListener('scroll', updateProgress, { passive: true });
    }

    updateProgress(); // Initial call
  }

  // Initialize smooth scroll and progress bar first
  initSmoothScroll();
  initScrollProgressBar();

  if (prefersReducedMotion) return;

  /* ============================================================
     TEXT LINE REVEAL ANIMATIONS
     ============================================================ */
  function splitIntoLines(element) {
    const text = element.innerHTML;
    const words = text.split(/(\s+)/);
    element.innerHTML = words.map(word =>
      word.trim() ? `<span class="line-word">${word}</span>` : word
    ).join('');
    return element.querySelectorAll('.line-word');
  }

  function initTextLineReveal() {
    // Target main headings for line reveals
    const headings = document.querySelectorAll(
      '.featured-work-heading, .expertise-main-heading, .awards-heading, .experience-heading, .clients-heading, .expertise-info-title'
    );

    const isMobile = window.innerWidth <= 768;

    headings.forEach(heading => {
      const words = splitIntoLines(heading);

      // Set initial state with overflow hidden on parent
      heading.style.overflow = 'hidden';
      gsap.set(words, {
        yPercent: 100,
        opacity: 0
      });

      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: heading,
          start: isMobile ? 'top 100%' : 'top 85%',
          toggleActions: 'play none none none',
        }
      });
    });
  }

  /* ============================================================
     SECTION REVEALS - FADE UP ON SCROLL
     ============================================================ */
  function initSectionReveals() {
    // Awards rows — IntersectionObserver reveal (CSS transitions, no GSAP)
    // GSAP overwrite:true in hover highlights was killing pending scroll-trigger tweens
    const awardsTable = document.querySelector('.awards-table');
    if (awardsTable) {
      const awardsRows = awardsTable.querySelectorAll('.awards-row');
      const rowObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          awardsRows.forEach((row, i) => {
            setTimeout(() => {
              row.classList.add('revealed');
            }, i * 70);
          });
          rowObserver.disconnect();
        }
      }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
      rowObserver.observe(awardsTable);
    }

    // Use a more aggressive start on mobile so elements don't get stuck invisible
    const isMobile = window.innerWidth <= 768;
    const triggerStart = isMobile ? 'top 100%' : 'top 88%';

    // Alternating Scroll Reveal for Stats with Scroll Scrubbing (L->R and R->L smoothly linked to scroll up & down)
    const statRows = document.querySelectorAll('.stats-container .stat-row');
    if (statRows.length) {
      statRows.forEach((row, index) => {
        const fromX = (index % 2 === 0) ? -220 : 220;
        gsap.fromTo(
          row,
          {
            opacity: 0.1,
            x: fromX,
          },
          {
            opacity: 1,
            x: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: isMobile ? 'top 98%' : 'top 92%',
              end: isMobile ? 'top 60%' : 'top 45%',
              scrub: 1.2,
            }
          }
        );
      });
    }

    const revealElements = [
      { selector: '.exp-item', stagger: 0.12 },
      { selector: '.expertise-detail-inner', stagger: 0 },
      { selector: '.about-portrait, .about-bio', stagger: 0.2 },
      { selector: '.footer-contact, .footer-about', stagger: 0.15 },
      { selector: '.accordion-item', stagger: 0.1 },
    ];

    revealElements.forEach(({ selector, stagger }) => {
      const elements = document.querySelectorAll(selector);

      elements.forEach((el, index) => {
        gsap.fromTo(el,
          {
            opacity: 0,
            y: 50,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: stagger * index * 0.6,
            scrollTrigger: {
              trigger: el,
              start: triggerStart,
              toggleActions: 'play none none none',
            }
          }
        );
      });
    });

    // Expertise banners — reveal bottom-to-top (wipe up)
    const banners = document.querySelectorAll('.expertise-banner');
    banners.forEach(banner => {
      // Banner wipe: inset bottom shrinks from 100% → 0%
      gsap.fromTo(banner,
        { clipPath: 'inset(100% 0 0% 0)' },
        {
          clipPath: 'inset(0% 0 0% 0)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: banner,
            start: isMobile ? 'top 100%' : 'top 92%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Character image: reveal from top on scroll
      const img = banner.querySelector('.expertise-banner-03 img, .expertise-banner-image img');
      if (img) {
        gsap.fromTo(img,
          { y: -80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.3,
            scrollTrigger: {
              trigger: banner,
              start: isMobile ? 'top 100%' : 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      }
    });
  }

  /* ============================================================
     SCROLL COLOR CHANGE EFFECTS
     ============================================================ */
  function initScrollColorChange() {
    // Expertise banner titles — stay white, fade in opacity
    const bannerTitles = document.querySelectorAll('.expertise-banner-title');
    bannerTitles.forEach(title => {
      gsap.fromTo(title,
        { opacity: 0.4 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title.closest('.expertise-banner'),
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    // Stat numbers glow effect
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(num => {
      gsap.fromTo(num,
        {
          color: 'rgba(255, 255, 255, 0.3)',
          textShadow: '0 0 0px rgba(255, 69, 0, 0)'
        },
        {
          color: 'rgba(255, 255, 255, 1)',
          textShadow: '0 0 30px rgba(255, 69, 0, 0.6)',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.stats',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    // Hero lines progressive color reveal
    const heroLines = document.querySelectorAll('.hero-line-gray');
    heroLines.forEach((line, index) => {
      ScrollTrigger.create({
        trigger: line,
        start: 'top 75%',
        onEnter: () => {
          const isLight = document.body.classList.contains('light-theme');
          gsap.to(line, {
            color: isLight ? '#000000' : 'rgba(255, 255, 255, 0.9)',
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out'
          });
        },
        onLeaveBack: () => {
          gsap.to(line, {
            color: 'var(--gray)',
            duration: 0.6,
            ease: 'power2.in'
          });
        }
      });
    });
  }

  /* ============================================================
     RIPPLE EFFECT FOR BUTTONS
     ============================================================ */
  function initRippleEffect() {
    const rippleButtons = document.querySelectorAll('.nav-cta, .connect-btn');

    rippleButtons.forEach(btn => {
      btn.classList.add('ripple-btn');

      btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement('span');

        ripple.classList.add('ripple-circle');
        ripple.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${e.clientX - rect.left - size / 2}px;
          top: ${e.clientY - rect.top - size / 2}px;
        `;

        this.appendChild(ripple);

        // Remove ripple after animation
        ripple.addEventListener('animationend', () => {
          ripple.remove();
        });
      });
    });
  }

  /* ============================================================
     ACTIVE NAVIGATION SECTION HIGHLIGHTING
     ============================================================ */
  function initNavActiveSection() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.mobile-menu-content a, .split-nav-link, .nav-cta, .nav-drawer-link, .menu-option-link');

    if (!navLinks.length) return;

    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => updateActiveNavLink(section.id),
        onEnterBack: () => updateActiveNavLink(section.id),
      });
    });

    function updateActiveNavLink(activeId) {
      navLinks.forEach(link => {
        link.classList.remove('nav-active');
        const href = link.getAttribute('href');
        if (href && (href === `#${activeId}` || href.endsWith(`#${activeId}`))) {
          link.classList.add('nav-active');
        }
      });
    }
  }

  /* ============================================================
     ENHANCED PARALLAX LAYERS - MULTI-LAYER BACKGROUND ELEMENTS
     ============================================================ */
  function initParallaxLayers() {
    if (window.innerWidth <= 768) return; // Disable on mobile

    // Layer 1: Slowest - About section background text (furthest back)
    const aboutBgText = document.querySelector('.about-bg-text');
    if (aboutBgText) {
      gsap.to(aboutBgText, {
        yPercent: 25,
        xPercent: -2,
        rotation: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 3, // Slowest movement
        }
      });
    }

    // Layer 2: Medium - Dot patterns (mid-layer)
    const dotPatterns = document.querySelectorAll('.about-dot-pattern');
    dotPatterns.forEach((dot, i) => {
      gsap.to(dot, {
        y: i % 2 === 0 ? -60 : 50,
        x: i % 3 === 0 ? 20 : -15,
        rotation: i % 2 === 0 ? 8 : -5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2, // Medium speed
        }
      });
    });

    // Layer 3: Stats section parallax
    const statsDots = document.querySelector('.stats-dot-pattern');
    if (statsDots) {
      gsap.to(statsDots, {
        y: -100,
        x: 30,
        rotation: 3,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: '.stats',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2.2,
        }
      });
    }

    // Layer 4: Hero section — slideshow handles its own transitions, skip parallax on individual slides

    // Layer 5: Featured work section parallax
    const workTopBar = document.querySelector('.featured-work-top-bar');
    if (workTopBar) {
      gsap.fromTo(workTopBar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.featured-work',
            start: 'top bottom',
            end: 'top center',
            scrub: 1.5,
          }
        }
      );
    }

    // Layer 6: Footer parallax elements
    const footerTopBar = document.querySelector('.footer-top-bar');
    if (footerTopBar) {
      gsap.to(footerTopBar, {
        scaleY: 0.5,
        x: '-15%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.footer-content-panel',
          start: 'top bottom',
          end: 'center center',
          scrub: 2.5,
        }
      });
    }

    // Layer 7: Awards section background effect
    const awardsSection = document.querySelector('.awards');
    if (awardsSection) {
      gsap.to(awardsSection, {
        backgroundPosition: '150% 50%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.awards',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 3.5,
        }
      });
    }
  }

  /* ============================================================
     EXPERTISE BANNER ADVANCED INNER PARALLAX
     ============================================================ */
  function initExpertiseBannerInnerParallax() {
    if (window.innerWidth <= 768) return; // Disable on mobile

    const expertiseBanners = document.querySelectorAll('.expertise-banner');

    expertiseBanners.forEach((banner, bannerIndex) => {
      // Layer 1: Background Japanese text
      const bgText = banner.querySelector('.expertise-banner-bg-text');
      if (bgText) {
        gsap.to(bgText, {
          yPercent: 15,
          rotation: bannerIndex % 2 === 0 ? 2 : -2,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: banner,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 4, // Slowest layer
          }
        });
      }

      // Layer 2: Image parallax — comes from top as banner enters viewport
      const bannerImg = banner.querySelector('.expertise-banner-image img');
      if (bannerImg) {
        gsap.to(bannerImg, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: banner,
            start: 'top 85%',
            end: 'bottom top',
            scrub: 2,
          }
        });
      }

      // Layer 3: Banner content — subtle vertical drift only (no horizontal shake)
      const bannerContent = banner.querySelector('.expertise-banner-content');
      if (bannerContent) {
        gsap.to(bannerContent, {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: banner,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        });
      }

      // Layer 4: Banner number — vertical drift only
      const bannerNum = banner.querySelector('.expertise-banner-num');
      if (bannerNum) {
        gsap.to(bannerNum, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: banner,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        });
      }
    });

    // Global expertise section parallax
    const expertiseSticky = document.querySelectorAll('.expertise-banner-sticky-bar');
    expertiseSticky.forEach((sticky, index) => {
      gsap.to(sticky, {
        xPercent: index % 2 === 0 ? 3 : -3,
        ease: 'none',
        scrollTrigger: {
          trigger: sticky,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 3,
        }
      });
    });
  }

  /* ============================================================
     ADDITIONAL PARALLAX MICRO-INTERACTIONS
     ============================================================ */
  function initParallaxMicroInteractions() {
    if (window.innerWidth <= 768) return;

    // Side badge advanced parallax
    const sideBadge = document.querySelector('.side-badge');
    if (sideBadge) {
      gsap.to(sideBadge, {
        y: -40,
        rotation: 2,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 4,
        }
      });
    }

    // Work item previews parallax on hover
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
      const preview = item.querySelector('.work-item-preview');
      if (preview) {
        item.addEventListener('mousemove', (e) => {
          const rect = item.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;

          gsap.to(preview, {
            x: (x - 0.5) * 30,
            y: (y - 0.5) * 20,
            rotation: (x - 0.5) * 5,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(preview, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
          });
        });
      }
    });
  }

  /* ===== INTRO HERO PARALLAX ===== */
  function initIntroHeroParallax() {
    const heroImg = document.querySelector('.intro-hero-bg img');

    if (heroImg) {
      // Parallax effect on hero image
      gsap.to(heroImg, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: '#intro-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        }
      });
    }

    // Fade out hero content as user scrolls
    const heroContent = document.querySelector('.intro-hero-content');
    if (heroContent) {
      gsap.to(heroContent, {
        yPercent: -20,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: '#intro-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });
    }

    // Fade bottom text
    const heroBottom = document.querySelector('.intro-hero-bottom');
    if (heroBottom) {
      gsap.to(heroBottom, {
        y: -30,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#intro-hero',
          start: 'top top',
          end: '50% top',
          scrub: 1,
        }
      });
    }
  }

  /* ===== HERO TYPOGRAPHY REVEAL ===== */
  function initHeroTypographyReveal() {
    const heroLines = document.querySelectorAll('.hero-line');
    if (!heroLines.length) return;

    const isMobile = window.innerWidth <= 768;

    // Set initial hidden state via GSAP (overrides CSS initial state)
    gsap.set(heroLines, { opacity: 0, y: 80 });

    // Each line gets its own ScrollTrigger so they reveal one-by-one on
    // scroll-down and hide one-by-one (in reverse order) on scroll-up.
    heroLines.forEach((line) => {
      ScrollTrigger.create({
        trigger: line,
        start: isMobile ? 'top 108%' : 'top 90%',
        end: 'bottom 5%',
        onEnter: () => {
          gsap.to(line, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', overwrite: 'auto' });
        },
        onLeave: () => {
          gsap.to(line, { opacity: 0, y: -60, duration: 0.7, ease: 'power2.in', overwrite: 'auto' });
        },
        onEnterBack: () => {
          gsap.to(line, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', overwrite: 'auto' });
        },
        onLeaveBack: () => {
          gsap.to(line, { opacity: 0, y: 80, duration: 0.7, ease: 'power2.in', overwrite: 'auto' });
        },
      });
    });

    // Color transition for gray lines
    const grayLines = document.querySelectorAll('.hero-line-gray');
    grayLines.forEach(line => {
      ScrollTrigger.create({
        trigger: line,
        start: isMobile ? 'top 108%' : 'top 70%',
        onEnter: () => {
          const isLight = document.body.classList.contains('light-theme');
          gsap.to(line, { color: isLight ? '#000000' : 'rgba(255, 255, 255, 0.85)', duration: 0.8, ease: 'power2.out' });
        },
        onLeaveBack: () => {
          gsap.to(line, { color: 'var(--gray)', duration: 0.6, ease: 'power2.in' });
        },
      });
    });
  }

  /* ===== HERO IMAGES HOVER EFFECTS ===== */
  function initHeroImageEffects() {
    const inlineImages = document.querySelectorAll('.hero-img-inline');

    inlineImages.forEach(imgContainer => {
      const img = imgContainer.querySelector('img');
      if (!img) return;

      imgContainer.addEventListener('mouseenter', () => {
        gsap.to(img, {
          scale: 1.15,
          rotation: 2,
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      imgContainer.addEventListener('mouseleave', () => {
        gsap.to(img, {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }

  /* ===== ENHANCED PRELOADER INTEGRATION ===== */
  function enhancePreloaderExit() {
    // Synchronized with preloader timing from script.js
    setTimeout(() => {
      const introHero = document.querySelector('#intro-hero');
      if (introHero) {
        // Smooth fade in after preloader
        gsap.fromTo(introHero,
          { opacity: 0, scale: 1.03 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out'
          }
        );
      }
    }, 1200);
  }

  /* ===== HERO SECTION SCALE ON SCROLL ===== */
  function initHeroScaleEffect() {
    const heroSection = document.querySelector('#intro-hero');

    if (heroSection) {
      gsap.to(heroSection, {
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        }
      });
    }
  }

  /* ============================================================
     CARD TILT EFFECT
     ============================================================ */
  function initCardTilt() {
    if (window.innerWidth <= 768 || prefersReducedMotion) return;

    // Select all interactive card components
    const cards = document.querySelectorAll('.stat-row, .exp-item, .skill-card-container, .timeline-card, .rec-card');

    cards.forEach(card => {
      const isSkillCard = card.classList.contains('skill-card-container');
      const isRecCard = card.classList.contains('rec-card');

      // Determine the tilt target
      let tiltTarget = card;
      if (isSkillCard) {
        tiltTarget = card.querySelector('.skill-card-inner');
      } else if (isRecCard) {
        // Wrap rec-card contents dynamically if not already wrapped
        let inner = card.querySelector('.rec-card-inner');
        if (!inner) {
          inner = document.createElement('div');
          inner.className = 'rec-card-inner';
          inner.style.cssText = `
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          `;
          while (card.firstChild) {
            inner.appendChild(card.firstChild);
          }
          card.appendChild(inner);
        }
        tiltTarget = inner;
      }

      if (!tiltTarget) return;

      // 1. Create and append glow overlay dynamically
      let glow = card.querySelector('.card-glow');
      if (!glow) {
        glow = document.createElement('div');
        glow.className = 'card-glow';
        glow.style.cssText = `
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: inherit;
          background: radial-gradient(circle at 50% 50%, rgba(255, 69, 0, 0.12) 0%, transparent 60%);
        `;

        if (isSkillCard) {
          const front = card.querySelector('.skill-card-front');
          const back = card.querySelector('.skill-card-back');
          if (front) front.appendChild(glow.cloneNode(true));
          if (back) back.appendChild(glow.cloneNode(true));
        } else if (isRecCard) {
          tiltTarget.appendChild(glow);
        } else {
          card.appendChild(glow);
        }
      }

      // Initialize 3D context
      gsap.set(tiltTarget, { transformPerspective: 1200 });

      // Mouseenter interaction
      card.addEventListener('mouseenter', () => {
        const glows = isSkillCard ? card.querySelectorAll('.card-glow') : [glow];
        glows.forEach(g => g.style.opacity = '1');

        card.classList.add('is-hovered');

        if (isSkillCard) {
          // Flip card to the back smoothly
          gsap.to(tiltTarget, {
            rotationY: 180,
            duration: 0.6,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        } else if (!isRecCard) {
          // Lift up the card on hover (except for carousel card which uses relative pos)
          gsap.to(tiltTarget, {
            y: -6,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });

      // Mousemove tilt and glow calculation
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateX = ((e.clientY - centerY) / rect.height) * -8;
        const rotateY = ((e.clientX - centerX) / rect.width) * 8;

        if (isSkillCard) {
          // Invert horizontal tilt when flipped to match the back face coordinate space
          const currentRotationY = 180 - rotateY;
          gsap.to(tiltTarget, {
            rotationX: rotateX,
            rotationY: currentRotationY,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        } else if (isRecCard) {
          gsap.to(tiltTarget, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        } else {
          // Tilt and lift
          gsap.to(tiltTarget, {
            rotationX: rotateX,
            rotationY: rotateY,
            y: -6,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }

        // Update glow gradient position
        const glows = isSkillCard ? card.querySelectorAll('.card-glow') : [glow];
        glows.forEach(g => {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          g.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 69, 0, 0.15) 0%, transparent 60%)`;
        });
      });

      // Mouseleave reset
      card.addEventListener('mouseleave', () => {
        const glows = isSkillCard ? card.querySelectorAll('.card-glow') : [glow];
        glows.forEach(g => g.style.opacity = '0');

        if (isSkillCard) {
          // If clicked/pinned (has flipped class), return to flat back (180). Otherwise return to front (0).
          const targetRotY = card.classList.contains('flipped') ? 180 : 0;
          gsap.to(tiltTarget, {
            rotationX: 0,
            rotationY: targetRotY,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto',
            onComplete: () => {
              card.classList.remove('is-hovered');
            }
          });
        } else if (isRecCard) {
          gsap.to(tiltTarget, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto',
            onComplete: () => {
              card.classList.remove('is-hovered');
            }
          });
        } else {
          gsap.to(tiltTarget, {
            rotationX: 0,
            rotationY: 0,
            y: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)',
            overwrite: 'auto',
            onComplete: () => {
              card.classList.remove('is-hovered');
            }
          });
        }
      });
    });
  }

  /* ============================================================
     CUSTOM MOUSE CURSOR
     ============================================================ */
  function initCustomCursor() {
    if (window.innerWidth <= 768 || prefersReducedMotion) return;

    // Create custom cursor elements dynamically
    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';

    const follower = document.createElement('div');
    follower.className = 'custom-cursor-follower';

    const cursorText = document.createElement('span');
    cursorText.className = 'cursor-text';
    follower.appendChild(cursorText);

    document.body.appendChild(dot);
    document.body.appendChild(follower);

    // Set initial centering transform properties via GSAP
    gsap.set([dot, follower], { xPercent: -50, yPercent: -50 });

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let followerX = 0;
    let followerY = 0;

    // Track mouse coordinates
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Animate custom cursor on every GSAP tick
    gsap.ticker.add(() => {
      // Small center dot moves faster
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;

      // Outer ring has a smooth delay
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;

      gsap.set(dot, { x: dotX, y: dotY });
      gsap.set(follower, { x: followerX, y: followerY });
    });

    // Helper to register hover transitions
    const setupCursorHover = (selector, hoverClass, text = '') => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          follower.classList.add(hoverClass);
          dot.classList.add('hovering');
          if (text) {
            cursorText.textContent = text;
          }
        });
        el.addEventListener('mouseleave', () => {
          follower.classList.remove(hoverClass);
          dot.classList.remove('hovering');
        });
      });
    };

    // Standard links, buttons, and clickable items
    setupCursorHover('a, button, [role="button"], .clickable, .nav-menu-btn, .rec-btn, .mobile-menu-close', 'hover-link');

    // Skill flip cards
    setupCursorHover('.skill-card-container', 'hover-card', 'FLIP');

    // Recommendation cards
    setupCursorHover('.rec-card', 'hover-card', 'SWIPE');

    // Featured work items / other portfolio links
    setupCursorHover('.work-item, .exp-scroller-item', 'hover-view', 'VIEW');

    // Hide custom cursor when mouse leaves the page
    document.addEventListener('mouseleave', () => {
      gsap.to([dot, follower], { opacity: 0, duration: 0.3 });
    });

    document.addEventListener('mouseenter', () => {
      gsap.to([dot, follower], { opacity: 1, duration: 0.3 });
    });
  }


  /* ============================================================
     FOOTER NAME GRADIENT EFFECT
     ============================================================ */
  function initFooterNameGradient() {
    const footerName = document.querySelector('.footer-big-name span');
    if (!footerName) return;

    // Create gradient background
    footerName.style.background = 'linear-gradient(90deg, var(--white) 0%, var(--red) 50%, var(--white) 100%)';
    footerName.style.backgroundSize = '200% auto';
    footerName.style.webkitBackgroundClip = 'text';
    footerName.style.webkitTextFillColor = 'transparent';
    footerName.style.backgroundClip = 'text';
    footerName.style.transition = 'background-position 0.8s var(--ease-out-expo)';

    footerName.closest('.footer-big-name').addEventListener('mouseenter', () => {
      footerName.style.backgroundPosition = '100% center';
    });

    footerName.closest('.footer-big-name').addEventListener('mouseleave', () => {
      footerName.style.backgroundPosition = '0% center';
    });
  }

  /* ============================================================
     CLOCK DOT PULSE ANIMATION
     ============================================================ */
  function initClockDotPulse() {
    if (prefersReducedMotion) return;

    const clockDots = document.querySelectorAll('.clock-dot');
    clockDots.forEach((dot, index) => {
      gsap.to(dot, {
        scale: 1.4,
        opacity: 0.6,
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: index * 0.4,
      });
    });
  }

  /* ============================================================
     ENHANCED STAT GLOW EFFECT
     ============================================================ */
  function initEnhancedStatGlow() {
    if (prefersReducedMotion) return;

    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat, index) => {
      ScrollTrigger.create({
        trigger: '.stats',
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(stat,
            {
              textShadow: '0 0 0px rgba(255, 69, 0, 0)',
              color: 'rgba(255, 255, 255, 0.4)'
            },
            {
              textShadow: '0 0 40px rgba(255, 69, 0, 0.8), 0 0 80px rgba(255, 69, 0, 0.3)',
              color: 'rgba(255, 255, 255, 1)',
              duration: 1.2,
              delay: index * 0.2,
              ease: 'power2.out'
            }
          );
        }
      });
    });
  }

  /* ============================================================
     LINK UNDERLINES ANIMATION
     ============================================================ */
  function initLinkUnderlines() {
    const links = document.querySelectorAll('.footer-email-address, .mobile-menu-content a, .nav-cta');

    links.forEach(link => {
      link.classList.add('animated-underline');

      // Create underline element
      const underline = document.createElement('span');
      underline.className = 'link-underline-element';
      link.appendChild(underline);

      link.addEventListener('mouseenter', () => {
        gsap.to(underline, {
          scaleX: 1,
          duration: 0.4,
          ease: 'power3.out',
        });
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(underline, {
          scaleX: 0,
          duration: 0.4,
          ease: 'power3.out',
        });
      });
    });
  }

  /* ============================================================
     ICON BOUNCE EFFECTS
     ============================================================ */
  function initIconBounce() {
    if (prefersReducedMotion) return;

    // Nav logo bounce on hover
    const navLogo = document.querySelector('.nav-logo svg');
    if (navLogo) {
      const logoParent = navLogo.closest('a');

      logoParent.addEventListener('mouseenter', () => {
        gsap.fromTo(navLogo,
          { rotation: 0, scale: 1 },
          {
            rotation: 15,
            scale: 1.1,
            duration: 0.3,
            ease: 'back.out(1.7)'
          }
        );
      });

      logoParent.addEventListener('mouseleave', () => {
        gsap.to(navLogo, {
          rotation: 0,
          scale: 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    }

    // Side badge floating animation
    const sideBadge = document.querySelector('.side-badge');
    if (sideBadge) {
      gsap.to(sideBadge, {
        y: -8,
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Menu button hover bounce
    const menuBtn = document.querySelector('.nav-menu-btn');
    if (menuBtn) {
      menuBtn.addEventListener('mouseenter', () => {
        gsap.to(menuBtn, {
          scale: 1.1,
          rotation: 5,
          duration: 0.2,
          ease: 'back.out(1.7)'
        });
      });

      menuBtn.addEventListener('mouseleave', () => {
        gsap.to(menuBtn, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    }

    // Scroll indicator bounce (if exists)
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        y: 5,
        duration: 1.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }
  }

  // Initialize all hero animations
  initIntroHeroParallax();
  initHeroTypographyReveal();
  initHeroImageEffects();
  enhancePreloaderExit();
  initHeroScaleEffect();

  // Initialize all new animation features
  initTextLineReveal();
  initSectionReveals();
  initScrollColorChange();
  initRippleEffect();
  initNavActiveSection();
  initParallaxLayers();
  initExpertiseBannerInnerParallax();
  initExpertiseBannerInteractions();
  initParallaxMicroInteractions();
  initCardTilt();
  initCustomCursor();
  initFooterNameGradient();
  initClockDotPulse();
  initEnhancedStatGlow();
  initLinkUnderlines();
  initIconBounce();
  initScrollDirectionImages();
  initDynamicExpertiseHighlights();
  initReviewRowHighlights();
  initTamilScramble();
  initAboutImageAndTextAnimations();
  initVolunteeringAnimations();
  initAwardsAnimations();

  /* ============================================================
     REVIEW ROW MOUSE HOVER HIGHLIGHT
     ============================================================ */
  function initReviewRowHighlights() {
    const rows = document.querySelectorAll('.awards-row');
    rows.forEach(row => {
      // Mouse hover
      row.addEventListener('mouseenter', () => {
        rows.forEach(r => {
          if (r !== row) {
            gsap.to(r, { backgroundColor: 'transparent', color: 'rgba(255,255,255,1)', duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
            r.classList.remove('highlight');
          }
        });
        row.classList.add('highlight');
        gsap.to(row, { backgroundColor: '#ffffff', color: '#000000', duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
      });
      row.addEventListener('mouseleave', () => {
        row.classList.remove('highlight');
        gsap.to(row, { backgroundColor: 'transparent', color: 'rgba(255,255,255,1)', duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
      });

      // Touch support
      row.addEventListener('touchstart', () => {
        rows.forEach(r => {
          gsap.to(r, { backgroundColor: 'transparent', color: 'rgba(255,255,255,1)', duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
          r.classList.remove('highlight');
        });
        row.classList.add('highlight');
        gsap.to(row, { backgroundColor: '#ffffff', color: '#000000', duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
      }, { passive: true });

      row.addEventListener('touchend', () => {
        setTimeout(() => {
          row.classList.remove('highlight');
          gsap.to(row, { backgroundColor: 'transparent', color: 'rgba(255,255,255,1)', duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
        }, 700);
      }, { passive: true });
    });
  }

  /* ============================================================
     EXPERTISE BANNER INTERACTIONS
     (image entrance · bg-text click-move · title scramble)
     ============================================================ */
  function initExpertiseBannerInteractions() {
    if (prefersReducedMotion) return;
    const banners = document.querySelectorAll('.expertise-banner');
    const jpChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

    banners.forEach((banner) => {
      const imgContainer = banner.querySelector('.expertise-banner-image');
      const bgText = banner.querySelector('.expertise-banner-bg-text');
      const titleEl = banner.querySelector('.expertise-banner-title');

      // 1 ── Image reveals top-to-bottom on scroll enter ────────────
      if (imgContainer) {
        gsap.fromTo(
          imgContainer,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.5,
            ease: 'power3.out',
            delay: 0.25,
            scrollTrigger: {
              trigger: banner,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2 ── Click right → bg text moves left; click left → moves right ──
      if (bgText) {
        banner.addEventListener('click', (e) => {
          const rect = banner.getBoundingClientRect();
          const isRightSide = e.clientX - rect.left > rect.width / 2;
          const moveX = isRightSide ? -350 : 350;
          gsap.killTweensOf(bgText, 'x');
          gsap.to(bgText, { x: `+=${moveX}`, duration: 0.65, ease: 'power3.out' });
          gsap.to(bgText, { x: 0, duration: 1.1, ease: 'elastic.out(1, 0.4)', delay: 0.9 });
        });
      }

      // 3 ── Title scrambles to JP chars then back on scroll + click ────
      if (titleEl) {
        const originalHTML = titleEl.innerHTML;
        const originalText = titleEl.textContent.trim().replace(/\s+/g, ' ');

        function runScramble() {
          if (titleEl.dataset.animating === 'true') return;
          titleEl.dataset.animating = 'true';

          const jpLen = Math.max(4, Math.round(originalText.replace(/ /g, '').length * 0.8));
          let jpTarget = '';
          for (let i = 0; i < jpLen; i++) {
            jpTarget += jpChars[Math.floor(Math.random() * jpChars.length)];
          }

          const totalTicks = 44;
          const halfTicks = 20;
          let tick = 0;

          const timer = setInterval(() => {
            tick++;
            if (tick <= halfTicks) {
              const locked = Math.floor((tick / halfTicks) * jpTarget.length);
              let out = '';
              for (let i = 0; i < jpTarget.length; i++) {
                out += i < locked ? jpTarget[i] : jpChars[Math.floor(Math.random() * jpChars.length)];
              }
              titleEl.textContent = out;
            } else {
              const locked = Math.floor(((tick - halfTicks) / (totalTicks - halfTicks)) * originalText.length);
              let out = '';
              for (let i = 0; i < originalText.length; i++) {
                if (i < locked) {
                  out += originalText[i];
                } else if (originalText[i] === ' ') {
                  out += ' ';
                } else {
                  out += jpChars[Math.floor(Math.random() * jpChars.length)];
                }
              }
              titleEl.textContent = out;
            }
            if (tick >= totalTicks) {
              clearInterval(timer);
              titleEl.innerHTML = originalHTML;
              titleEl.dataset.animating = 'false';
            }
          }, 45);
        }

        ScrollTrigger.create({ trigger: banner, start: 'top 80%', onEnter: () => runScramble() });
        banner.addEventListener('click', () => runScramble());
      }
    });
  }

  /* ============================================================
     TAMIL TEXT SCRAMBLE → ENGLISH ON CLICK (GLOBAL TOGGLE)
     ============================================================ */
  function initTamilScramble() {
    const taToEn = {
      'எதிர்காலம்': '10-YEAR VISION',
      'அனுபவம்': 'EXPERIENCE',
      'திறன்கள்': 'SKILLS',
      'சேவைகள்': 'SERVICES',
      'பயிற்சி': 'TRAINING PROGRAMS',
      'சான்றிதழ்கள்': 'CERTIFICATIONS',
      'திட்டங்கள்': 'PROJECTS & LABS',
      'ஆராய்ச்சி': 'RESEARCH',
      'வலைப்பதிவு': 'BLOG',
      'கல்வி': 'EDUCATION',
      'தன்னார்வம்': 'VOLUNTEERING',
      'விருதுகள்': 'HONORS & AWARDS',
      'காட்சி கூடம்': 'VISUAL GALLERY',
      'சான்றுகள்': 'TESTIMONIALS',
      'வெளியீடுகள்': 'PUBLICATIONS',
    };

    const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&!?';
    const selectors = [
      '.section-label-jp',
      '.section-label-jp-dark',
      '.expertise-label-jp',
      '.expertise-banner-sticky-jp',
    ];

    const labels = [];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        const taText = el.textContent.trim();
        const enText = taToEn[taText];
        if (enText) {
          el.dataset.taText = taText;
          el.dataset.enText = enText;
          el.dataset.state = 'ta';
          el.style.cursor = 'pointer';
          el.title = 'Click to translate all';
          labels.push(el);
        }
      });
    });

    let isTranslatingGlobal = false;

    labels.forEach(el => {
      el.addEventListener('click', () => {
        if (isTranslatingGlobal) return;
        isTranslatingGlobal = true;

        // Toggle state for all labels based on clicked element
        const nextState = el.dataset.state === 'ta' ? 'en' : 'ta';
        let completedCount = 0;

        labels.forEach(item => {
          item.dataset.animating = 'true';
          const targetText = nextState === 'en' ? item.dataset.enText : item.dataset.taText;
          const totalDuration = 1000;
          const tickInterval = 40;
          const totalTicks = Math.round(totalDuration / tickInterval);
          let tick = 0;

          const timer = setInterval(() => {
            tick++;
            const progress = tick / totalTicks;
            const lockedCount = Math.floor(progress * targetText.length);

            let display = '';
            for (let i = 0; i < targetText.length; i++) {
              if (i < lockedCount) {
                display += targetText[i];
              } else if (targetText[i] === ' ') {
                display += ' ';
              } else {
                display += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
              }
            }
            item.textContent = display;

            if (tick >= totalTicks) {
              clearInterval(timer);
              item.textContent = targetText;
              item.dataset.state = nextState;
              item.dataset.animating = 'false';

              completedCount++;
              if (completedCount === labels.length) {
                isTranslatingGlobal = false;
              }
            }
          }, tickInterval);
        });
      });
    });
  }

  /* ============================================================
     ABOUT PORTRAIT IMAGE SCROLL TO BLACK & TEXT COLOR SHIFT
     ============================================================ */
  function initAboutImageAndTextAnimations() {
    // 1. Image turns to black/dark on scroll down
    const aboutImg = document.querySelector('.about-portrait img');
    if (aboutImg) {
      gsap.set(aboutImg, { filter: 'grayscale(0%) brightness(1) contrast(1)' });
      gsap.to(aboutImg, {
        filter: 'grayscale(100%) brightness(0.25) contrast(1.15)',
        scrollTrigger: {
          trigger: '.about-portrait',
          start: 'top 35%',
          end: 'bottom 10%',
          scrub: true,
        }
      });
    }

    // 2. Text color shift from light white to dark white (gray)
    const aboutParagraphs = document.querySelectorAll('.about-bio p');
    aboutParagraphs.forEach(p => {
      gsap.fromTo(p,
        { color: 'rgba(255, 255, 255, 0.95)' }, // light white
        {
          color: 'rgba(255, 255, 255, 0.35)', // dark white
          scrollTrigger: {
            trigger: p,
            start: 'top 50%',
            end: 'bottom 20%',
            scrub: true,
          }
        }
      );
    });
  }

  /* ============================================================
     SCROLL DIRECTION IMAGE VISIBILITY
     ============================================================ */
  function initScrollDirectionImages() {
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth <= 768;

    let lastScrollY = 0;
    let scrollDirection = 'down';

    // Track scroll direction
    function updateScrollDirection() {
      const currentScrollY = window.scrollY;
      scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = currentScrollY;
    }

    // Throttled scroll direction update
    let scrollTicking = false;
    function onScroll() {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          updateScrollDirection();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Image visibility handlers (excluding work item previews and about-portrait)
    const imageSelectors = [
      '.intro-hero-img',
      '.hero-img-inline',
      '.expertise-banner-image'
    ];

    imageSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);

      elements.forEach(element => {
        if (isMobile) {
          // On mobile: always add visible when element enters viewport, no direction check
          ScrollTrigger.create({
            trigger: element,
            start: 'top 100%',
            onEnter: () => element.classList.add('visible'),
            onEnterBack: () => element.classList.add('visible'),
          });
        } else {
          ScrollTrigger.create({
            trigger: element,
            start: 'top 80%',
            onEnter: () => {
              element.classList.add('visible');
            },
            onEnterBack: () => {
              element.classList.add('visible');
            }
          });
        }
      });
    });

    // About portrait: grayscale → color on scroll in, back to grayscale on scroll out
    const aboutPortraits = document.querySelectorAll('.about-portrait');
    aboutPortraits.forEach(element => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top 85%',
        end: 'bottom 15%',
        onEnter: () => element.classList.add('visible'),
        onLeave: () => element.classList.remove('visible'),
        onEnterBack: () => element.classList.add('visible'),
        onLeaveBack: () => element.classList.remove('visible'),
      });
    });

    // Hero inline images: on mobile always show, on desktop use scroll direction
    const heroImages = document.querySelectorAll('.hero-img-inline');
    heroImages.forEach((img, index) => {
      if (isMobile) {
        // On mobile: always show when the hero section is visible
        ScrollTrigger.create({
          trigger: img.closest('.hero-line'),
          start: 'top 100%',
          onEnter: () => {
            gsap.delayedCall(0.2 + (index * 0.08), () => {
              img.classList.add('visible');
            });
          },
        });
      } else {
        ScrollTrigger.create({
          trigger: img.closest('.hero-line'),
          start: 'top 85%',
          end: 'bottom 5%',
          onEnter: () => {
            gsap.delayedCall(0.3 + (index * 0.1), () => {
              img.classList.add('visible');
            });
          },
          onLeave: () => {
            img.classList.remove('visible');
          },
          onEnterBack: () => {
            img.classList.add('visible');
          },
          onLeaveBack: () => {
            img.classList.remove('visible');
          }
        });
      }
    });

    // Ensure work item preview images are always ready for hover
    const workItemPreviewImgs = document.querySelectorAll('.work-item-preview img');
    workItemPreviewImgs.forEach(img => {
      img.style.opacity = '1';
      img.style.transform = 'none';
    });
  }

  /* ============================================================
     DYNAMIC EXPERTISE LIST HIGHLIGHTING
     ============================================================ */
  function initDynamicExpertiseHighlights() {
    if (prefersReducedMotion) return;

    // Use the same scroll direction tracking from image visibility
    let lastScrollY = 0;
    let scrollDirection = 'down';

    // Mouse direction tracking
    let lastMouseY = 0;
    let mouseDirection = 'down';

    function updateScrollDirection() {
      const currentScrollY = window.scrollY;
      scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = currentScrollY;
    }

    function updateMouseDirection(e) {
      const currentMouseY = e.clientY;
      mouseDirection = currentMouseY > lastMouseY ? 'down' : 'up';
      lastMouseY = currentMouseY;
    }

    let scrollTicking = false;
    function onScroll() {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          updateScrollDirection();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', updateMouseDirection, { passive: true });

    // Get each expertise section separately to highlight one item per section
    const expertiseSections = document.querySelectorAll('.expertise-detail');

    expertiseSections.forEach((section) => {
      const listItems = section.querySelectorAll('.expertise-list-item');

      listItems.forEach((item) => {
        // Mouse: show white highlight on enter
        item.addEventListener('mouseenter', () => {
          listItems.forEach(other => other.classList.remove('highlight', 'mouse-highlight'));
          item.classList.add('highlight', 'mouse-highlight');
        });

        // Mouse: remove white highlight on leave
        item.addEventListener('mouseleave', () => {
          item.classList.remove('highlight', 'mouse-highlight');
        });

        // Touch: show white highlight on touch
        item.addEventListener('touchstart', () => {
          listItems.forEach(other => other.classList.remove('highlight', 'mouse-highlight'));
          item.classList.add('highlight', 'mouse-highlight');
        }, { passive: true });

        item.addEventListener('touchend', () => {
          setTimeout(() => item.classList.remove('highlight', 'mouse-highlight'), 600);
        }, { passive: true });
      });
    });
  }

  /* ============================================================
     VOLUNTEERING & AWARDS SCROLL-DRIVEN STORYTELLING
     ============================================================ */
  function initVolunteeringAnimations() {
    if (prefersReducedMotion) return;

    const volunteeringSection = document.getElementById("volunteering");
    const slides = gsap.utils.toArray("#volunteering .vol-story-slide");

    if (!volunteeringSection || slides.length === 0) return;

    // Reset initial state for all slides and generate background text dynamically
    slides.forEach((slide, i) => {
      // Generate dynamic background text if not already present
      if (!slide.querySelector('.slide-bg-text-top')) {
        const org = slide.querySelector('.vol-org');
        if (org) {
          const bgText = document.createElement('div');
          bgText.className = 'slide-bg-text slide-bg-text-top';
          bgText.textContent = org.textContent;
          slide.appendChild(bgText);
        }
      }
      if (!slide.querySelector('.slide-bg-text-bottom')) {
        const role = slide.querySelector('.vol-role');
        if (role) {
          const bgText = document.createElement('div');
          bgText.className = 'slide-bg-text slide-bg-text-bottom';
          bgText.textContent = role.textContent;
          slide.appendChild(bgText);
        }
      }

      if (i === 0) {
        gsap.set(slide, { opacity: 1, autoAlpha: 1, pointerEvents: "auto", '--overlay-opacity': 0 });
        const wrappers = slide.querySelectorAll('.vol-img-wrapper');
        wrappers.forEach(w => gsap.set(w, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1 }));
        const textCard = slide.querySelector('.vol-info');
        if (textCard) gsap.set(textCard, { opacity: 0, y: 30 });
      } else {
        gsap.set(slide, { opacity: 0, autoAlpha: 0, pointerEvents: "none", '--overlay-opacity': 0 });
        const wrappers = slide.querySelectorAll('.vol-img-wrapper');
        wrappers.forEach(w => gsap.set(w, { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, scale: 1.1 }));
        const textCard = slide.querySelector('.vol-info');
        if (textCard) gsap.set(textCard, { opacity: 0, y: 30 });
      }
    });

    // Create scroll-driven master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: volunteeringSection,
        start: "top top",
        end: `+=${slides.length * 250}%`,
        pin: true,
        scrub: true,
        anticipatePin: 1
      }
    });

    // For each slide: Phase 1 = images, Phase 2 = overlay + text, Phase 3 = hold, Phase 4 = transition out
    slides.forEach((slide, index) => {
      const textCard = slide.querySelector('.vol-info');
      const wrappers = slide.querySelectorAll('.vol-img-wrapper');

      if (index === 0) {
        // --- SLIDE 0: Already visible, just add overlay + text ---
        // Phase 1: Hold on images (already visible) and collapse the section header
        const header = volunteeringSection.querySelector('.awards-header');
        if (header) {
          tl.to(header, {
            opacity: 0,
            height: 0,
            marginBottom: 0,
            marginTop: 0,
            overflow: 'hidden',
            duration: 0.8
          }, 0);
        }
        tl.to({}, {}, "+=0.8");

        // Phase 2: Darken overlay and show text
        tl.to(slide, { '--overlay-opacity': 1, duration: 1 });
        if (textCard) {
          tl.to(textCard, { opacity: 1, y: 0, duration: 1 }, "-=1");
        }

        // Phase 3: Hold for reading
        tl.to({}, {}, "+=2");
      } else {
        const prevSlide = slides[index - 1];
        const prevTextCard = prevSlide.querySelector('.vol-info');

        // Phase 4 of previous slide: Transition OUT
        if (prevTextCard) {
          tl.to(prevTextCard, { opacity: 0, y: -30, duration: 0.6 });
        }
        tl.to(prevSlide, { opacity: 0, autoAlpha: 0, pointerEvents: "none", duration: 0.6 }, "-=0.4");

        // Phase 1: Images reveal IN
        tl.set(slide, { opacity: 1, autoAlpha: 1, pointerEvents: "auto", '--overlay-opacity': 0 });
        if (wrappers.length > 0) {
          wrappers.forEach((wrapper, wIndex) => {
            tl.fromTo(wrapper,
              { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, scale: 1.1 },
              { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1, duration: 1.2, ease: 'power3.inOut' },
              wIndex === 0 ? "-=0.1" : "-=0.9"
            );
          });
        }

        // Hold on images
        tl.to({}, {}, "+=0.8");

        // Phase 2: Darken overlay and show text
        tl.to(slide, { '--overlay-opacity': 1, duration: 1 });
        if (textCard) {
          tl.to(textCard, { opacity: 1, y: 0, duration: 1 }, "-=1");
        }

        // Phase 3: Hold for reading
        tl.to({}, {}, "+=2");
      }
    });

    tl.to({}, {}, "+=0.1"); // end padding
  }

  function initAwardsAnimations() {
    if (prefersReducedMotion) return;

    const awardsSection = document.getElementById("awards");
    const slides = gsap.utils.toArray("#awards .award-story-slide");

    if (!awardsSection || slides.length === 0) return;

    // Reset initial state for all slides
    slides.forEach((slide, i) => {
      // Generate dynamic background text if not already present
      if (!slide.querySelector('.slide-bg-text-top')) {
        const title = slide.querySelector('.award-showcase-title');
        if (title) {
          const bgText = document.createElement('div');
          bgText.className = 'slide-bg-text slide-bg-text-top';
          bgText.textContent = title.textContent;
          slide.appendChild(bgText);
        }
      }
      if (!slide.querySelector('.slide-bg-text-bottom')) {
        const event = slide.querySelector('.award-showcase-event');
        if (event) {
          const bgText = document.createElement('div');
          bgText.className = 'slide-bg-text slide-bg-text-bottom';
          bgText.textContent = event.textContent;
          slide.appendChild(bgText);
        }
      }

      if (i === 0) {
        gsap.set(slide, { opacity: 1, autoAlpha: 1, pointerEvents: "auto", '--overlay-opacity': 0 });
        const wrappers = slide.querySelectorAll('.award-img-wrapper');
        wrappers.forEach(w => gsap.set(w, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1 }));
        const textCard = slide.querySelector('.award-showcase-info');
        if (textCard) gsap.set(textCard, { opacity: 0, y: 30 });
      } else {
        gsap.set(slide, { opacity: 0, autoAlpha: 0, pointerEvents: "none", '--overlay-opacity': 0 });
        const wrappers = slide.querySelectorAll('.award-img-wrapper');
        wrappers.forEach(w => gsap.set(w, { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, scale: 1.1 }));
        const textCard = slide.querySelector('.award-showcase-info');
        if (textCard) gsap.set(textCard, { opacity: 0, y: 30 });
      }
    });

    // Create scroll-driven master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: awardsSection,
        start: "top top",
        end: `+=${slides.length * 250}%`,
        pin: true,
        scrub: true,
        anticipatePin: 1
      }
    });

    // For each slide: Phase 1 = images, Phase 2 = overlay + text, Phase 3 = hold, Phase 4 = transition out
    slides.forEach((slide, index) => {
      const textCard = slide.querySelector('.award-showcase-info');
      const wrappers = slide.querySelectorAll('.award-img-wrapper');

      if (index === 0) {
        // --- SLIDE 0: Already visible, just add overlay + text ---
        // Phase 1: Hold on images (already visible) and collapse the section header
        const header = awardsSection.querySelector('.experience-header');
        if (header) {
          tl.to(header, {
            opacity: 0,
            height: 0,
            marginBottom: 0,
            marginTop: 0,
            overflow: 'hidden',
            duration: 0.8
          }, 0);
        }
        tl.to({}, {}, "+=0.8");

        // Phase 2: Darken overlay and show text
        tl.to(slide, { '--overlay-opacity': 1, duration: 1 });
        if (textCard) {
          tl.to(textCard, { opacity: 1, y: 0, duration: 1 }, "-=1");
        }

        // Phase 3: Hold for reading
        tl.to({}, {}, "+=2");
      } else {
        const prevSlide = slides[index - 1];
        const prevTextCard = prevSlide.querySelector('.award-showcase-info');

        // Phase 4 of previous slide: Transition OUT
        if (prevTextCard) {
          tl.to(prevTextCard, { opacity: 0, y: -30, duration: 0.6 });
        }
        tl.to(prevSlide, { opacity: 0, autoAlpha: 0, pointerEvents: "none", duration: 0.6 }, "-=0.4");

        // Phase 1: Images reveal IN
        tl.set(slide, { opacity: 1, autoAlpha: 1, pointerEvents: "auto", '--overlay-opacity': 0 });
        if (wrappers.length > 0) {
          wrappers.forEach((wrapper, wIndex) => {
            tl.fromTo(wrapper,
              { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, scale: 1.1 },
              { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1, duration: 1.2, ease: 'power3.inOut' },
              wIndex === 0 ? "-=0.1" : "-=0.9"
            );
          });
        }

        // Hold on images
        tl.to({}, {}, "+=0.8");

        // Phase 2: Darken overlay and show text
        tl.to(slide, { '--overlay-opacity': 1, duration: 1 });
        if (textCard) {
          tl.to(textCard, { opacity: 1, y: 0, duration: 1 }, "-=1");
        }

        // Phase 3: Hold for reading
        tl.to({}, {}, "+=2");
      }
    });

    tl.to({}, {}, "+=0.1"); // end padding
  }

  /* ============================================================
     SMOOTH SCROLL ANCHOR LINKS
     ============================================================ */
  function initSmoothAnchorLinks() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || !targetId.startsWith('#') || targetId === '#') return;

        try {
          const target = document.querySelector(targetId);
          if (!target) return;

          e.preventDefault();

          if (lenis) {
            lenis.scrollTo(target, {
              offset: -80, // Account for fixed navbar
              duration: 1.5,
              easing: (t) => 1 - Math.pow(1 - t, 3),
            });
          } else {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        } catch (err) {
          console.warn("Smooth scroll skipped due to invalid selector:", targetId, err);
        }
      });
    });
  }

  /* ============================================================
     INTERACTIVE PINNED SCROLL FOOTER ANIMATION
     ============================================================ */
  function initFooterScrollerAnimation() {
    const scroller = document.querySelector('.footer-scroller');
    const pinnedWrapper = document.querySelector('.footer-pinned-wrapper');
    if (!scroller || !pinnedWrapper) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 0px)", () => {
      // Set initial centering offsets that preserve GSAP properties
      gsap.set('.footer-img-container', { xPercent: -50, yPercent: -50 });
      gsap.set('.footer-content-panel', { yPercent: 100, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scroller,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: true,
          anticipatePin: 1
        }
      });

      // Phase 1: Scale image container to full screen, fade out background text, fade in CTA button
      tl.to('.footer-img-container', {
        width: '100vw',
        height: '100vh',
        borderRadius: 0,
        duration: 1,
        ease: 'none'
      }, 0)
        .to('.footer-bg-text', {
          opacity: 0,
          duration: 0.8,
          ease: 'none'
        }, 0)
        .to('.footer-cta-overlay', {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.5,
          ease: 'none'
        }, 0.5);

      // Phase 2: Slide up image and reveal the footer content panel
      tl.to('.footer-img-container', {
        y: () => -document.querySelector('.footer-content-panel').offsetHeight * 0.5,
        duration: 1,
        ease: 'none'
      }, 1)
        .to('.footer-content-panel', {
          yPercent: 0,
          duration: 1,
          ease: 'none'
        }, 1);

      return () => {
        gsap.set('.footer-img-container', { clearProps: 'all' });
        gsap.set('.footer-bg-text', { clearProps: 'all' });
        gsap.set('.footer-cta-overlay', { clearProps: 'all' });
        gsap.set('.footer-content-panel', { clearProps: 'all' });
      };
    });
  }

  /* ============================================================
     EDUCATION TIMELINE SCROLL TRIGGER
     ============================================================ */
  function initEducationTimelineAnimation() {
    const timeline = document.querySelector('.education-timeline-container');
    if (!timeline) return;

    const items = timeline.querySelectorAll('.timeline-item');
    const progressBar = timeline.querySelector('.education-timeline-line-progress');

    // Create a ScrollTrigger timeline to animate the progress bar filling up
    if (progressBar) {
      gsap.fromTo(progressBar,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 70%',
            end: 'bottom 75%',
            scrub: true
          }
        }
      );
    }

    // Animate each timeline card as it scrolls into view
    items.forEach((item) => {
      const dot = item.querySelector('.timeline-dot');
      const card = item.querySelector('.timeline-card');
      const isLeft = item.classList.contains('left');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 80%', // when top of item hits 80% of viewport
          toggleActions: 'play none none reverse', // reverse animation on scroll back up
        }
      });

      // Animate item opacity, dot glow, and card slide
      tl.to(item, {
        opacity: 1,
        duration: 0.2
      })
        .to(dot, {
          backgroundColor: 'var(--red)',
          borderColor: 'var(--white)',
          boxShadow: '0 0 12px var(--red), 0 0 24px var(--red)',
          duration: 0.3
        }, '<')
        .fromTo(card,
          {
            opacity: 0,
            x: isLeft ? -50 : 50,
            scale: 0.95
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out'
          },
          '<+0.1'
        );
    });
  }

  initEducationTimelineAnimation();
  initSmoothAnchorLinks();
  initFooterScrollerAnimation();




  // Refresh ScrollTrigger after initialization
  ScrollTrigger.refresh();
});

// Refresh on window resize with Lenis integration
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (lenis) lenis.resize();
    ScrollTrigger.refresh();
  }, 250);
});

// Refresh on window load to handle any layout shifts from slow-loading images/fonts
window.addEventListener('load', () => {
  if (lenis) lenis.resize();
  ScrollTrigger.refresh();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (lenis) {
    lenis.destroy();
  }
});