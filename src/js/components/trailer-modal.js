import {
  trailerModalNoData,
  trailModalVideo,
} from './create-trailer-modal-markup';
import { fetchThemoviedbTralier } from '../../js/fetching and rendering/film-trailer';

const backdrop = document.querySelector(`[data-modal="modal-2"]`);
const closeBtnTrailer = document.querySelector('.trailer-modal__button-close');

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
    addMarkupModalTrailer(trailerModalNoData());
  }
}

function findingKey(response) {
  const keyVideo = response.results.find(
    result => result.name === 'Official Trailer'
  ).key;
  addMarkupModalTrailer(trailModalVideo(keyVideo));
}

function addMarkupModalTrailer(markup) {
  const modalTrailerWrapRef = document.querySelector('.modal-trailer__wrap');
  modalTrailerWrapRef.innerHTML = '';
  modalTrailerWrapRef.insertAdjacentHTML('beforeend', markup);
  openModalTrailer();
}

function openModalTrailer() {
  backdrop.classList.remove('is-hidden');
  document.querySelector('body').classList.add('noScroll');
  document.addEventListener('keydown', hideModal);
  backdrop.addEventListener('click', hideModal);
  closeBtnTrailer.addEventListener('click', modalClose);
}
function modalClose() {
  backdrop.classList.add('is-hidden');
  removeListeners();
}
function hideModal(e) {
  if (e.key === 'Escape' || e.target === backdrop) {
    backdrop.classList.add('is-hidden');
    removeListeners();
  }
}
function removeListeners() {
  document.removeEventListener('keydown', hideModal);
  backdrop.removeEventListener('click', hideModal);
  closeBtnTrailer.removeEventListener('click', modalClose);
  document.querySelector('body').classList.remove('noScroll');
  const videoFrame = document.querySelector('.trailerFrame');
  stopVideo(videoFrame);
}

function stopVideo(videoFrame) {
  videoFrame.src = videoFrame.src;
}

export { onButtonTrailerClick };
