// Hamburger toggle for mobile nav
const hamburger = document.querySelector('.hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('open');
});

// Close menu on nav link click (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});

// Highlight nav on scroll using IntersectionObserver
const sections = document.querySelectorAll('main section, footer');
const observerOptions = { threshold: 0.5 };

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const navLink = document.querySelector(`nav a[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// Scroll reveal for content blocks
const contentBlocks = document.querySelectorAll('.content-block');
const revealObserverOptions = { threshold: 0.1 };

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: unobserve after reveal for performance
      revealObserver.unobserve(entry.target);
    }
  });
}, revealObserverOptions);

contentBlocks.forEach(block => revealObserver.observe(block));

// Sticky header background change on scroll with debounce
const header = document.querySelector('header');
let scrollTimeout = null;

window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(() => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, 50); // adjust delay as needed
});

// Bonus: Smooth scroll behavior for internal links
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
