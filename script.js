// Lumière — Fine Dining Restaurant
// Mobile-first, award-winning interactions

document.addEventListener('DOMContentLoaded', () => {
  // ----- Mobile Menu -----
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = navMenu.querySelectorAll('a');

  function openMenu() {
    navToggle.classList.add('open');
    navMenu.classList.add('open');
    navToggle.setAttribute('aria-label', 'Close menu');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-label', 'Open menu');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close menu on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
      navToggle.focus();
    }
  });

  // ----- Navbar scroll state -----
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ----- GSAP Scroll Animations -----
  gsap.registerPlugin(ScrollTrigger);

  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Hero parallax
    const heroVideo = document.querySelector('.hero-video');
    const heroImg = document.querySelector('.hero-img');
    const heroTarget = heroVideo || heroImg;

    if (heroTarget) {
      gsap.to(heroTarget, {
        y: 120,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Menu cards stagger
    const menuCards = document.querySelectorAll('.menu-card');
    if (menuCards.length > 0) {
      gsap.fromTo(menuCards,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.menu-grid',
            start: 'top 80%'
          }
        }
      );
    }

    // Gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
      gsap.fromTo(galleryItems,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 80%'
          }
        }
      );
    }
  } else {
    // Reduced motion: show everything immediately
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  // ----- Reservation Form -----
  const reserveForm = document.getElementById('reserveForm');
  if (reserveForm) {
    reserveForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple validation
      const requiredFields = reserveForm.querySelectorAll('[required]');
      let isValid = true;
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#d63637';
          setTimeout(() => {
            field.style.borderColor = '';
          }, 2000);
        }
      });

      if (!isValid) {
        const btn = reserveForm.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'Please fill all fields';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 3000);
        return;
      }

      const btn = reserveForm.querySelector('.btn');
      const originalText = btn.textContent;
      btn.textContent = 'Request Sent ✓';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        reserveForm.reset();
      }, 3000);
    });
  }

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });
});
