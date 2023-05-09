import { BASE_THEMOVIEDB_URL, apiKey } from '../tmdb-api';
import axios from 'axios';
import { fetchThemoviedbGenres } from './film-genres';
import { createPagination } from '../pagination';
import { makeStarsMarkup } from '../components/star-markup';

const ul = document.querySelector('.gallery__films');
const img = 'https://image.tmdb.org/t/p/w500/';
console.log('test');
async function fetchThemoviedbWeek() {
  const response = await axios(
    `${BASE_THEMOVIEDB_URL}/trending/movie/week?api_key=${apiKey}`
  );
  const newCollection = await response.data;

  pagination = createPagination(
    response.data.total_results,
    response.data.total_pages,
    response.data.page
  );

  let page = response.data.page;
  page = pagination.getCurrentPage();
  pagination.reset(response.data.total_pages);
  getPagination(page);

  console.log(page);

  return newCollection;
}

async function getPagination(page) {
  try {
    // await paganation.on('afterMove', event => {
    //   const currentPage = event.page;
    //   console.log(currentPage);
    // });
    await pagination.on('beforeMove', ({ page }) => {
      ul.innerHTML = '';

      fetchThemoviedbWeek();
      loadMoviesWeek();
    });
  } catch (error) {
    onFetchError(error);
  }
}

async function loadMoviesWeek() {
  try {
    const { results } = await fetchThemoviedbWeek();
    const { genres } = await fetchThemoviedbGenres();
    let genresList = {};
    genres
      .map(({ id, name }) => {
        genresList[id] = name;
      })
      .join('');

    const markup = results.reduce(
      (markup, result) => markup + createMarkup(result, genresList),
      ''
    );
    updateMoviesList(markup);

    return;
  } catch (error) {
    onFetchError(error);
  }
}

function onlyYearFilter(release_date) {
  return !release_date
    ? 'Unknown Year'
    : release_date.split('').slice(0, 4).join('');
}

function createMarkup(
  { id, poster_path, release_date, title, vote_average, genre_ids },
  genresList
) {
  const genreNames = getGenresName(genre_ids, genresList);
  return `
   <li class='movie__card'>
   <div class='movie__link' data-id=${id}>
    <img src='${img}${poster_path}' alt='${title}' loading='lazy' class='movie__image' width='395' height='574'/>
      <h2 class='info-title'>${title}</h2>
      <p class='info-genre'>${genreNames}<span> | </span>${onlyYearFilter(
    release_date
  )}</p>
      <p class='info-vote'>${makeStarsMarkup(
        vote_average,
        'hero__rating-stars'
      )}</p>
    </div>
  </li>`;
}

function getGenresName(genre_ids, genresList) {
  try {
    const genreIds = genre_ids.map(id => genresList[id]).join(' , ');
    return genreIds;
  } catch (error) {
    console.error(error);
  }
}

function updateMoviesList(markup) {
  if (markup !== undefined) {
    ul.innerHTML = markup;
  }
}

function clearMoviesList() {
  ul.innerHTML = '';
}

function onFetchError(error) {
  if (apiKey === '') {
    return console.log('Error, invalid or missing API key');
  }
  if (!error.status) {
    return console.log('Oops, something went wrong, please try again.');
  }
}

window.addEventListener('load', loadMoviesWeek);

export { fetchThemoviedbWeek };
