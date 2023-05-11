import { ApiThemoviedb } from '../fetching and rendering/film-of-the-day';
import { HeroMarkUp } from '../fetching and rendering/hero-create-markup';
import { initSwiper } from './slider';
import { ResizePage } from './resize-page';
import { changingSizeElement } from './dynamic-resizing';
import debounce from 'lodash.debounce';
import { onButtonTrailerClick } from './trailer-modal';

const apiThemoviedb = new ApiThemoviedb();
const resizePage = new ResizePage(window.innerWidth);

const heroRef = document.querySelector('.hero');

if(!document.location.href.includes('my-library')) {
  heroRef.addEventListener('click', onButtonTrailerClick);
  window.addEventListener(
    'resize',
    debounce(resizePage.handleResize.bind(resizePage), 300)
  );
}


checkIsHero();

function checkIsHero() {
  heroRef && getApiData();
}

async function getApiData() {
  try {
    const response = await apiThemoviedb.getRequestData();
    addSliderMarkup(response.data.results);
  } catch (error) {
    checkError(error);
  }
}

function checkError(error) {
  if (error.response.status === 404) {
    addStaticMarkup();
    return;
  }
  console.error(error.message);
}

function addStaticMarkup() {
  heroRef.insertAdjacentHTML('beforeend', HeroMarkUp.createStaticHero());
}

function addSliderMarkup(data) {
  heroRef.insertAdjacentHTML('beforeend', HeroMarkUp.createBaseSlider());
  const sliderWrap = document.querySelector('.hero__wrap');
  sliderWrap.insertAdjacentHTML(
    'beforeend',
    HeroMarkUp.createSlides(data.slice(0, 5))
  );
  changingSizeElement();
  initSwiper();
}
