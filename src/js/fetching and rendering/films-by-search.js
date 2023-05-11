import axios from 'axios';

import { BASE_THEMOVIEDB_URL, apiKey } from '../tmdb-api';
import { makeStarsMarkup } from '../components/star-markup';
import { fetchThemoviedbGenres } from '../fetching and rendering/film-genres';
// import { pagination } from '../pagination';
console.log(document.location);
if (document.location.href.includes('catalog.html')) {
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
      const { data } = await axios.get(
        `${BASE_THEMOVIEDB_URL}/search/movie?${OPTIONS.toString()}`
      );
      this.incrementPage();
      return data;
    }
    get query() {
      return this.searchQuery;
    }
    set query(newQuery) {
      this.searchQuery = newQuery;
    }
    // get pageCurrent() {
    //   return this.page;
    // }
    // set pageCurrent(newPageCurrent) {
    //   this.page = newPageCurrent;
    // }
    incrementPage() {
      this.page += 1;
    }
    // decrementPage() {
    //   this.page -= 1;
    // }

    resetPage() {
      this.page = 1;
    }
  }

  const refs = {
    form: document.getElementById('search-form'),
    pagination: document.getElementById('pagination'),
    gallery: document.querySelector('.gallery__films'),
  };
  const postApiService = new PostApiService();

  refs.form.addEventListener('submit', onSearch);

  function onSearch(e) {
    e.preventDefault();
    postApiService.query = e.target.searchQuery.value.trim();
    postApiService.resetPage();
    clearCardList();
    fetchResultsFilms();
    refs.form.reset();
  }

  function createMarkup(
    { id, poster_path, title, genre_ids, release_date, vote_average },
    genresList
  ) {
    const genreNames = getGenresName(genre_ids, genresList);
    return `<li class="movie__card">
        <div class='movie__link' data-id=${id}">
              <img src='https://image.tmdb.org/t/p/original${poster_path}' alt='${title}' loading='lazy' class='movie__image' width='395' height='574'/>
        </div>
            <div class="info overlay">
              <div class="info-thumb__text"><h2 class="info__title">${title}</h2>
                <p class="info__genre">${genreNames}<span> | </span>${onlyYearFilter(
      release_date
    )}</p></div>
                <div class="info-thumb__vote"><p class="info__vote">${makeStarsMarkup(
                  vote_average,
                  'catalog__rating-stars'
                )}</p></div>
            </div>
            </li>`;
  }
  function renderMarkup(markup) {
    if (markup !== undefined)
      refs.gallery.insertAdjacentHTML('beforeend', markup);
  }
  async function getGalleryMarkup() {
    try {
      const { results } = await postApiService.fetchPost();
      const { genres } = await fetchThemoviedbGenres();
      let genresList = {};
      genres
        .map(({ id, name }) => {
          genresList[id] = name;
        })
        .join('');
      if (results.length === 0) throw new Error('No Data!');
      return results.reduce(
        (markup, result) => markup + createMarkup(result, genresList),
        ''
      );
    } catch (err) {
      onError(err);
    }
  }
  async function fetchResultsFilms() {
    try {
      const markup = await getGalleryMarkup();
      renderMarkup(markup);
      // pagination(markup.page, markup.total_pages, markup.total_results);
    } catch (err) {
      onError(err);
    }
  }
  function onlyYearFilter(release_date) {
    return !release_date
      ? 'Unknown Year'
      : release_date.split('').slice(0, 4).join('');
  }
  function getGenresName(genre_ids, genresList) {
    try {
      const genreIds = genre_ids
        .slice(0, 2)
        .map(id => genresList[id])
        .join(', ');
      return genreIds;
    } catch (error) {
      console.error(error);
    }
  }
  function onError(err) {
    console.error(err);
    clearCardList();
    renderMarkup(
      '<h2 class="title-error">OOPS...<br> We are very sorry!<br> We don’t have any results due to your search.</h2>'
    );
  }
  function clearCardList() {
    refs.gallery.innerHTML = '';
  }
}
