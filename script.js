// Theme Toggle
const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  toggle.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
});

// Reveal on Scroll
const blocks = document.querySelectorAll('.content-block');
function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  blocks.forEach(block => {
    const blockTop = block.getBoundingClientRect().top;
    if (blockTop < triggerBottom) {
      block.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Create Floating Orbs
for (let i = 0; i < 5; i++) {
  const orb = document.createElement('div');
  orb.classList.add('orb');
  orb.style.top = `${Math.random() * 100}%`;
  orb.style.left = `${Math.random() * 100}%`;
  orb.style.animationDuration = `${10 + Math.random() * 10}s`;
  document.body.appendChild(orb);
}
