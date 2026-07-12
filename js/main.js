/* =============================================
   ALL – Association for Learning & Leadership
   Main JavaScript
   ============================================= */

'use strict';

/* ---------- Navbar scroll effect ---------- */
const navbar = document.getElementById('navbar');

function handleScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Scroll-to-top button
  const scrollTop = document.getElementById('scrollTop');
  if (scrollTop) {
    if (window.scrollY > 500) {
      scrollTop.classList.add('show');
    } else {
      scrollTop.classList.remove('show');
    }
  }
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

/* ---------- Mobile nav ---------- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');
const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

function openMobileNav() {
  mobileNav.classList.add('active');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  mobileNav.classList.remove('active');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', openMobileNav);
if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileNav);
});

/* ---------- Scroll-to-top ---------- */
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Animate on scroll (Intersection Observer) ---------- */
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

/* ---------- Counter animation ---------- */
function animateCounter(el, target, suffix, duration) {
  const start = 0;
  const startTime = performance.now();
  const isFloat = target % 1 !== 0;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.floor(eased * target);
    el.textContent = value.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString() + suffix;
    }
  }

  requestAnimationFrame(update);
}

const counterEls = document.querySelectorAll('.impact-num[data-target], .stat-num[data-target]');
let countersStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      counterEls.forEach(el => {
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix, 1800);
      });
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const impactSection = document.getElementById('impact');
if (impactSection) counterObserver.observe(impactSection);

/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  let current = '';
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active-link');
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

/* ---------- Contact form ---------- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent!';
    btn.style.background = '#2b7a4b';
    btn.style.borderColor = '#2b7a4b';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3500);
  });
}

/* ---------- Smooth scroll for internal anchors ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
