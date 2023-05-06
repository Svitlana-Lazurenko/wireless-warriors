import { BASE_THEMOVIEDB_URL, apiKey } from '../tmdb-api';
import axios from 'axios';
// import { fetchThemoviedbGenres } from './film-genres';

// async function fetchThemoviedbSearch(keyWord, page) {
//   const response = await axios(
//     `${BASE_THEMOVIEDB_URL}/search/movie?&query=${keyWord}&api_key=${apiKey}&page=${page}`
//   );
//   const newCollection = await response.data;

//   return newCollection;
// }
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
      this.incrementPage();
      return response.data;
    } catch (error) {
      console.error(error.toJSON());
    }
  }

  // async fetchTrendingPost() {
  //   const OPTIONS = new URLSearchParams({
  //     api_key: apiKey,
  //     page: this.page,
  //   });
  //   try {
  //     const response = await axios.get(
  //       `${BASE_THEMOVIEDB_URL}/trending/movie/week?${OPTIONS.toString()}`
  //     );
  //     this.incrementPage();
  //     return response.data;
  //   } catch (error) {
  //     console.error(error.toJSON());
  //   }
  // }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  get result() {
    return this.totalResult;
  }
  set result(newTotalResult) {
    this.totalResult = newTotalResult;
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
  gallery: document.querySelector('.gallery-films'),
  // pagination: document.querySelector('.paginations'),
};
const postApiService = new PostApiService();

refs.form.addEventListener('submit', onSearch);
// refs.pagination.addEventListener('click', onBtnPagination);

function onSearch(e) {
  e.preventDefault();
  // if (e.target.searchQuery.value.trim()) {
  //   postApiService.resetPage();
  //   clearCardList();
  //   fetchTrendingPost();
  // }
  postApiService.query = e.target.searchQuery.value.trim();
  postApiService.resetPage();
  clearCardList();
  fetchPost();
  refs.form.reset();
}

// function onBtnPagination(e) {
//   const { target, currentTarget } = e;

//   if (target === currentTarget || target.textContent === '...') {
//     return;
//   }

//   if (target.textContent === '🡺') {
//     postApiService.incrementPage();
//     fetchTrendingPost();
//     return;
//   }

//   if (target.textContent === '🡸') {
//     postApiService.decrementPage();
//     fetchTrendingPost();
//     return;
//   }

//   postApiService.pageCurrent = Number(target.textContent);
//   fetchTrendingPost(postApiService.pageCurrent);
// }
function clearCardList() {
  refs.gallery.innerHTML = '';
}
function fetchPost(page = 1) {
  postApiService.fetchPost().then(data => {
    renderMarkup(data.results);
    // pagination(data.page, data.total_pages);
  });
}
// Fetch Trending Film
// function fetchTrendingPost(page = 1) {
//   postApiService.fetchTrendingPost().then(data => {
//     renderMarkup(data.results);
//     pagination(data.page, data.total_pages);
//   });
// }
function createMarkup(data) {
  return data.reduce(
    (acc, { poster_path, title, genre_ids, release_date, vote_average }) => {
      acc += `<li class='movie__card'>
                <a href="" class='movie__link'>
                  <img  src='https://image.tmdb.org/t/p/original${poster_path}' alt='${title}' loading='lazy' class='movie__image' width='395' height='574'/>
              <div class='info overlay'>
                <h2 class='info-title'>${title}</h2>
                  <p class='info-genre'>${getGenreName(
                    genre_ids
                  )}<span>|</span>${onlyYearFilter(release_date)}</p>
                    <p class='info-vote'>${vote_average}</p>
              </div>
                </a>
              </li>`;
      return acc;
    },
    ''
  );
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
function renderMarkup(data) {
  refs.gallery.innerHTML = createMarkup(data);
}

// Page pagination markup
// function pagination(page, pages) {
//   let markup = '';
//   postApiService.pageCurrent = page;
//   const beforeTwoPage = page - 2;
//   const beforeOnePage = page - 1;
//   const afterTwoPage = page + 2;
//   const afterOnePage = page + 1;

//   // &#129144; <
//   // &#129146; >

//   if (page > 1) {
//     markup +=
//       '<li class="pagination__item pagination__item--arrow">&#129144</li>';
//     markup += '<li class="pagination__item">1</li>';
//   }
//   if (page > 4) {
//     markup += '<li class="pagination__item pagination__item--dots">...</li>';
//   }
//   if (page > 3) {
//     markup += `<li class="pagination__item">${beforeTwoPage}</li>`;
//   }
//   if (page > 2) {
//     markup += `<li class="pagination__item">${beforeOnePage}</li>`;
//   }
//   markup += `<li class="pagination__item pagination__item--current-page">${postApiService.pageCurrent}</li>`;
//   if (pages - 1 > postApiService.pageCurrent) {
//     markup += `<li class="pagination__item">${afterOnePage}</li>`;
//   }
//   if (pages - 2 > postApiService.pageCurrent) {
//     markup += `<li class="pagination__item">${afterTwoPage}</li>`;
//   }
//   if (pages - 3 > postApiService.pageCurrent) {
//     markup += '<li class="pagination__item pagination__item--dots">...</li>';
//   }
//   if (pages > postApiService.pageCurrent) {
//     markup += `<li class="pagination__item">${pages}</li>`;
//     markup += `<li class="pagination__item pagination__item--arrow">&#129146</li>`;
//   }

//   refs.pagination.innerHTML = markup;
// }

// function onSearch(e) {
//   e.preventDefault();
//   if (e.target.searchQuery.value.trim()) {
//     postApiService.resetPage();
//     clearGalleryList();
//     fetchTrendingPost();
//   }
//   const form = e.currentTarget;
//   postApiService.searchQuery = form.elements.searchQuery.value.trim();
//   postApiService.resetPage();
//   clearGalleryList();
//   fetchFilms().finally(() => form.reset());
// }
// function createMarkup(data) {
//   return data.reduce(
//     (acc, { poster_path, original_title, genre_ids, release_date }) => {
//       acc += `<li class="card__item">
//       <div class="card-thumb"
//         <a class="card__link" href="#">
//           <img class="card__img" src="https://image.tmdb.org/t/p/original${poster_path}" alt="${original_title}" />
//         </a>
//       </div>
//           <h2 class="card__title">
//             <span class="card__title--black">${original_title}</span>
//               ${getGenreName(genre_ids)} | ${onlyYearFilter(release_date)}
//           </h2>
//           </li> `;
//       return acc;
//     },
//     ''
//   );
// }
// function fetchFilms() {
//   return getGalleryFilmsMarkup()
//     .then(markup => {
//       updateGalleryList(markup);
//     })
//     .catch(onError);
// }
// function getGalleryFilmsMarkup() {
//   return postApiService.getImage().then(({ films }) => {
//     if (films.length === 0) throw new Error('No Data!');
//     return films.reduce((markup, film) => markup + createMarkup(film), '');
//   });
// }
// function clearGalleryList() {
//   refs.gallery.innerHTML = '';
// }
// function onlyYearFilter(release_date) {
//   return !release_date
//     ? 'Unknown Year'
//     : release_date.split('').slice(0, 4).join('');
// }
// function getGenreName(genre_ids) {
//   const genres = {
//     28: 'Action',
//     12: 'Adventure',
//     16: 'Animation',
//     35: 'Comedy',
//     80: 'Crime',
//     99: 'Documentary',
//     18: 'Drama',
//     10751: 'Family',
//     14: 'Fantasy',
//     36: 'History',
//     27: 'Horror',
//     10402: 'Music',
//     9648: 'Mystery',
//     10749: 'Romance',
//     878: 'Science Fiction',
//     10770: 'TV Movie',
//     53: 'Thriller',
//     10752: 'War',
//     37: 'Western',
//   };

//   if (genre_ids.length < 3) {
//     return genre_ids.map(elem => genres[elem]).join(', ');
//   }
//   return (
//     genre_ids
//       .map(elem => genres[elem])
//       .slice(0, 2)
//       .join(', ') + ', Others'
//   );
// }
// function updateGalleryList(markup) {
//   refs.gallery.insertAdjacentHTML('beforeend', markup);
// }

// let page = 1;

// async function markup(event) {
//   event.preventDefault();
//   updateMarkup();
//   try {
//     let searchParam = refs.form.elements.searchQuery.value.trim();
//     const collection = await fetchThemoviedbSearch(searchParam, page);
//     // const { genres } = await fetchThemoviedbGenres();
//     // let genresList = {};
//     // genres
//     //   .map(({ id, name }) => {
//     //     genresList[id] = name;
//     //   })
//     //   .join('');
//     // console.log(genresList);
//     console.log(collection.results);
//     const markup = collection.results
//       .map(({ poster_path, title, genre_ids, release_date, vote_average }) => {
//         //   const genreNames = getGenresName(genre_ids, genresList);
//         return `<li class='movie__card'>
//    <a href="" class='movie__link'>
//      <img  src='https://image.tmdb.org/t/p/original${poster_path}' alt='${title}' loading='lazy' class='movie__image' width='395' height='574'/>
//     <div class='info overlay'>
//       <h2 class='info-title'>${title}</h2>
//       <p class='info-genre'>${genre_ids}<span>|</span>${onlyYearFilter(
//           release_date
//         )}</p>
//       <p class='info-vote'>${vote_average}</p>
//     </div>
//     </a>
//   </li>`;
//       })
//       .join('');
//     updateMarkup(markup);
//     refs.form.reset();
//   } catch (error) {
//     console.error(error);
//   }
// }
// function getGenresName(genre_ids, genresList) {
//   try {
//     const genreIds = genre_ids.map(id => genresList[id]).join(' , ');
//     return genreIds;
//   } catch (error) {
//     console.error(error);
//   }
// }
// function onlyYearFilter(release_date) {
//   return !release_date
//     ? 'Unknown Year'
//     : release_date.split('').slice(0, 4).join('');
// }

// markup();

// function updateMarkup(markup = '') {
//   refs.gallery.insertAdjacentHTML('beforeend', markup);
// }
