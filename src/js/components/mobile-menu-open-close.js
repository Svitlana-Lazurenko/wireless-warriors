const menuButton = document.querySelector('.header__menu');
const mobileMenu = document.querySelector('.mobileMenu');

menuButton.addEventListener('click', openMobileMenu);

function openMobileMenu () {
    mobileMenu.classList.add('openModal');
}

const home = document.location.href;

function addSytle () {
    if(home.includes('index.html')) {
        document.getElementById('home').style.color = 'orange';
        document.getElementById('mobile-home').style.color = 'orange';
    }
    else if(home.includes('catalog.html')) {
        document.getElementById('catalog').style.color = 'orange';
        document.getElementById('mobile-catalog').style.color = 'orange';
    }
    else if(home.includes('library.html')) {
        document.getElementById('library').style.color = 'orange';
        document.getElementById('mobile-library').style.color = 'orange';
    }
}

addSytle();

