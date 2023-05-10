const inputChangeTheme = document.querySelector('.header__input');
const animateUl = document.querySelector('.header__animation');

inputChangeTheme.addEventListener('click', changeBtnOnTheme);

function changeBtnOnTheme() {
  animateUl.classList.toggle('changeTheme');
  document.body.classList.toggle('white-theme');
  document.querySelector('main + footer').classList.add('white-theme');

  const isWhiteTheme = document.body.classList.contains('white-theme');
  localStorage.setItem('isWhiteTheme', isWhiteTheme);
}

const isWhiteTheme = localStorage.getItem('isWhiteTheme');
if (isWhiteTheme === 'true') {
  document.body.classList.add('white-theme');
}
