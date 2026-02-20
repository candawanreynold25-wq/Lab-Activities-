// Simple mouse-following glow (optional enhancement)
document.addEventListener('mousemove', e => {
  const x = e.clientX / window.innerWidth * 100;
  const y = e.clientY / window.innerHeight * 100;
  
  document.querySelector('.glow-bg').style.background = `
    radial-gradient(circle at ${x}% ${y}%, rgba(0,240,255,0.11) 0%, transparent 35%),
    radial-gradient(circle at ${100-x}% ${100-y}%, rgba(192,132,252,0.09) 0%, transparent 40%),
    radial-gradient(circle at ${y}% ${x}%, rgba(255,46,99,0.07) 0%, transparent 45%)
  `;
});

// Optional: reveal animation on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.card, .explore-btn').forEach(el => {
  observer.observe(el);
});