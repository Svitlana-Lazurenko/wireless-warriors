const menuButton = document.querySelector('.header__menu');
const mobileMenu = document.querySelector('.mobileMenu');

menuButton.addEventListener('click', openMobileMenu);

function openMobileMenu () {
    mobileMenu.classList.add('openModal');
}
