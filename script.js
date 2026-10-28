// Lumière — Fine Dining Restaurant
// GSAP scroll animations + mobile menu + form handling

document.addEventListener('DOMContentLoaded', () => {
  // ----- Preloader -----
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 800);
  });

  // ----- Mobile Menu -----
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = navMenu.querySelectorAll('a');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
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
    reveals.forEach((el, i) => {
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
          },
          delay: (i % 4) * 0.08
        }
      );
    });

    // Parallax hero image
    gsap.to('.hero-img', {
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

    // Menu cards stagger
    gsap.fromTo('.menu-card', 
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

    // Gallery items
    gsap.fromTo('.gallery-item',
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
  } else {
    // If reduced motion, just make everything visible immediately
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  // ----- Reservation Form -----
  const reserveForm = document.getElementById('reserveForm');
  reserveForm.addEventListener('submit', (e) => {
    e.preventDefault();
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

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
