// Hamburger toggle for mobile nav
const hamburger = document.querySelector('.hamburger');
const navMenu = document.getElementById('nav-menu');

function closeMenu() {
  navMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('open');
});

// Close menu after picking a link (mobile). Links navigate normally;
// CSS scroll-behavior handles smooth scrolling for #anchors.
navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

// Highlight the nav link for the section in view (home page only)
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });

document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

// Fade sections in as they scroll into view
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Only animate sections that start below the fold, so the first screen never waits
document.querySelectorAll('main .section .container').forEach(el => {
  if (el.getBoundingClientRect().top < window.innerHeight) return;
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Safety net: never leave content hidden if the observer doesn't fire
setTimeout(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => el.classList.add('visible'));
}, 2500);

// Add a border/shadow to the header once the page is scrolled
const header = document.querySelector('.site-header');
const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
