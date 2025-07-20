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
