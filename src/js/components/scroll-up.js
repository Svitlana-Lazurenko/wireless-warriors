const topButton = document.getElementById('button-up');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  if (scrollPosition >= window.innerHeight) {
    topButton.style.display = 'block';
    topButton.classList.add('button__scroll__up--show');
  } else {
    topButton.style.display = 'none';
    topButton.classList.remove('button__scroll__up--show');
  }
});

topButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
