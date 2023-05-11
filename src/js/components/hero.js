import { ApiThemoviedb } from '../fetching and rendering/film-of-the-day';
import { HeroMarkUp } from '../fetching and rendering/hero-create-markup';
import { initSwiper } from './slider';
import { ResizePage } from './resize-page';
import { changingSizeElement } from './dynamic-resizing';
import debounce from 'lodash.debounce';
import { fetchThemoviedbTralier } from '../../js/fetching and rendering/film-trailer';
import {
  trailerModalNoData,
  trailModalVideo,
} from './create-trailer-modal-markup';

const apiThemoviedb = new ApiThemoviedb();
const resizePage = new ResizePage(window.innerWidth);

const heroRef = document.querySelector('.hero');

heroRef.addEventListener('click', onButtonTrailerClick);

window.addEventListener(
  'resize',
  debounce(resizePage.handleResize.bind(resizePage), 300)
);

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

function onButtonTrailerClick(e) {
  const element = e.target;
  if (element.tagName === 'BUTTON') {
    getTrailerRequest(element.dataset.id);
  }
}

async function getTrailerRequest(id) {
  try {
    const response = await fetchThemoviedbTralier(id);
    findingKey(response);
  } catch (error) {
    ddMarkupModalTrailer(trailerModalNoData());
  }
}

function findingKey(response) {
  const keyVideo = response.results.find(
    result => result.name === 'Official Trailer'
  ).key;
  addMarkupModalTrailer(trailModalVideo(keyVideo));
}

function addMarkupModalTrailer(markup) {
  const modalTrailerRef = document.querySelector('.modal-trailer');
  console.log(markup);
  modalTrailerRef.insertAdjacentHTML('beforeend', markup);
}
