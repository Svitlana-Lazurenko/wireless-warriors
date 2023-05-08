import { BASE_THEMOVIEDB_URL, apiKey } from '../tmdb-api';
import axios from 'axios';
import Notiflix from 'notiflix';
//
const filmInfoRefs = {
  body: document.querySelector('body'),
  btnCloseModalMovie: document.querySelector('.js-btn-close-modal'),
  cardMovie: document.querySelector('.js-modal-card'),
  backdropMovie: document.querySelector('.js-backdrop-movie'),
};

if (document.querySelector('.js-cards')) {
  const cardsList = document.querySelector('.js-cards');
  cardsList.addEventListener('click', onCardClickOpenModal);
}

if (filmInfoRefs.btnCloseModalMovie) {
  filmInfoRefs.btnCloseModalMovie.addEventListener('click', onCloseModalClick);
}

// filmInfoRefs.btnCloseModalMovie.addEventListener('click', onCloseModalClick);
document.addEventListener('keydown', onEscKeyDownModal);

function onEscKeyDownModal(event) {
  if (event.code === 'Escape') {
    onCloseModalClick();
  }
}

// filmInfoRefs.backdropMovie.addEventListener('click', event => {
//   if (event.target === filmInfoRefs.backdropMovie) {
//     onCloseModalClick();
//   }
// });

if (filmInfoRefs.backdropMovie) {
  filmInfoRefs.backdropMovie.addEventListener('click', event => {
    if (event.target === filmInfoRefs.backdropMovie) {
      onCloseModalClick();
    }
  });
}

// ---MAIN-FUNCTIONS---

let idMovie = undefined;

// Open modal window
async function onCardClickOpenModal(event) {
  const cardEl = event.target.closest('.card');
  idMovie = cardEl?.dataset?.id;

  if (idMovie === undefined) {
    return;
  }

  filmInfoRefs.cardMovie.innerHTML = '';
  Notiflix.Loading.circle();
  filmInfoRefs.backdropMovie.classList.remove('is-hidden');
  filmInfoRefs.body.classList.add('stop-scroll');
  const response = await fetchData(idMovie);
  movieInfo = getOneMovieInfo(response.data);
  renderModalMovieInfo(movieInfo);
  Notiflix.Loading.remove();
}

// Close  modal window
function onCloseModalClick() {
  filmInfoRefs.backdropMovie.classList.add('is-hidden');
  filmInfoRefs.body.classList.remove('stop-scroll');
}

// Fetch data
async function fetchData(idMovie) {
  const API_URL = `https://api.themoviedb.org/3/movie/${idMovie}`;
  const options = {
    params: {
      api_key: 'df4f25ddce476816dc7867d9ac4bd1ea',
      language: 'en-US',
    },
  };
  try {
    const response = await axios.get(API_URL, options);
    return response;
  } catch (error) {
    console.log(error);
  }
}

// Receive data for one movie
function getOneMovieInfo({
  id,
  poster_path,
  title,
  genres,
  popularity,
  overview,
  vote_average,
  vote_count,
}) {
  const posterPath = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : defaultImage;

  let genresMovie = [];
  genres.forEach(genre => {
    genresMovie.push(genre.name);
  });
  genresMovie = genresMovie.join(', ');

  const movieInfo = {
    id: id,
    poster: posterPath,
    title,
    overview,
    genresMovie,
    popularity: popularity.toFixed(1),
    voteAverage: vote_average.toFixed(1),
    voteCount: vote_count,
  };

  return movieInfo;
}

// Render markup with received data
function renderModalMovieInfo(movieInfo) {
  const {
    id,
    poster,
    title,
    overview,
    genresMovie,
    popularity,
    voteAverage,
    voteCount,
  } = movieInfo;

  const markup = `<div class="modal-card__thumb-left">
  <img
    class="modal-card__img"
    src="${poster}"
    alt="${title}"
    data-id="${id}"
    />
<div class="modal-card__thumb-right">
  <p class="thumb-right__title">${title}</p>
  <div class="thumb-right__details">
    <ul class="thumb-right__name-details">
      <li class="thumb-right__name-item">Vote / Votes</li>
      <li class="thumb-right__name-item">Popularity</li>
      <li class="thumb-right__name-item">Genre</li>
    </ul>
    <ul class="thumb-right__value-details">
      <li class="thumb-right__value-item">
        <span class="thumb-right__vote">${voteAverage}</span>
        <span class="thumb-right__delimiter">/</span>
        <span class="thumb-right__votes">${voteCount}</span>
      </li>
      <li class="thumb-right__value-item">${popularity}</li>
      <li class="thumb-right__value-item">${genresMovie}</li>
    </ul>
  </div>
  <p class="thumb-right__about">About</p>
  <p class="thumb-right__overview">${overview}</p>

  <div class="modal-card__btn-wrap">
    <button class="modal-card__library-btn js-add-library-btn" data-id="${id}" data-name="library-btn">
      Add to library
    </button>
  </div>
</div>`;

  filmInfoRefs.cardMovie.insertAdjacentHTML('beforeend', markup);
}
