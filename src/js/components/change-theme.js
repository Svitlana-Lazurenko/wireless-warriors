const inputChangeTheme = document.querySelector('.header__input');
const animateUl = document.querySelector('.header__animation');

inputChangeTheme.addEventListener('click', changeBtnOnTheme);

function changeBtnOnTheme () {
    animateUl.classList.toggle('changeTheme');
}