const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  if (body.classList.contains('light-theme')) {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.removeItem('theme');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-theme');
  }
});

// Scroll reveal for content blocks
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
