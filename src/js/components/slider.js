import Swiper from 'swiper/swiper-bundle';
import 'swiper/swiper-bundle.css';

function initSwiper() {
  new Swiper('.swiper', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      distance: 40,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,

      renderBullet: function (index, className) {
        return '<span class="' + className + '">0' + (index + 1) + '</span>';
      },
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    autoplay: {
      delay: 3000,
    },
    grabCursor: true,
    loop: true,
    speed: 1000,
    effect: 'fade',
  });
}

export { initSwiper };
