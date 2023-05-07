import { BASE_THEMOVIEDB_URL, apiKey } from '../tmdb-api';
import axios from 'axios';
import { makeStarsMarkup } from '../components/star-markup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { pagination } from '../pagination';

class PostApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalResult = 0;
  }

  async fetchPost() {
    const OPTIONS = new URLSearchParams({
      api_key: apiKey,
      query: this.searchQuery,
      page: this.page,
    });

    try {
      const response = await axios.get(
        `${BASE_THEMOVIEDB_URL}/search/movie?${OPTIONS.toString()}`
      );
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      // this.incrementPage();
      return response.data;
    } catch (error) {
      console.error(error.toJSON());
    }
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  resetPage() {
    this.page = 1;
  }
}

const refs = {
  form: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery__films'),
  pagination: document.querySelector('.tui-pagination'),
};
const postApiService = new PostApiService();

refs.form.addEventListener('submit', onSearch);
// refs.pagination.addEventListener('click', onBtnPagination);

function onSearch(e) {
  e.preventDefault();
  postApiService.query = e.target.searchQuery.value.trim();
  postApiService.resetPage();
  clearCardList();
  fetchPost();
  refs.form.reset();
}
function fetchPost() {
  postApiService
    .fetchPost()
    .then(data => {
      renderMarkup(data.results);
      // pagination(data.page, data.total_pages);
    })
    .catch(onError);
}

function createMarkup(data) {
  return data.reduce(
    (acc, { poster_path, title, genre_ids, release_date, vote_average }) => {
      acc += `<li class="movie__card">
      <div class="movie__card-thumb">
        <a href="#" class="movie__link">
            <img src='https://image.tmdb.org/t/p/original${poster_path}' alt='${title}' loading='lazy' class='movie__image' width='395' height='574'/>
          </a>
      </div>
          <div class="info overlay">
            <div class="info-thumb__text"><h2 class="info__title">${title}</h2>
              <p class="info__genre">${getGenreName(
                genre_ids
              )}<span>|</span>${onlyYearFilter(release_date)}</p></div>
              <div class="info-thumb__vote"><p class="info__vote">${makeStarsMarkup(
                vote_average,
                'catalog__rating-stars'
              )}</p></div>
                
          </div>
          </li> `;
      return acc;
    },
    ''
  );
}

function renderMarkup(data) {
  refs.gallery.innerHTML = createMarkup(data);
}
function onlyYearFilter(release_date) {
  return !release_date
    ? 'Unknown Year'
    : release_date.split('').slice(0, 4).join('');
}
function getGenreName(genre_ids) {
  const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  if (genre_ids.length < 1) {
    return genre_ids.map(elem => genres[elem]).join('');
  }
  return genre_ids
    .map(elem => genres[elem])
    .slice(0, 2)
    .join(', ');
}
function onError(err) {
  console.error(err);
  clearCardList();
  Notify.failure(
    `❌ Sorry, there are no films matching your search query. Please try again.`
  );
}
function clearCardList() {
  refs.gallery.innerHTML = '';
}
