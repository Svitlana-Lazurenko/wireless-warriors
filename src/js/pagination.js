import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { makeStarsMarkup } from './components/star-markup';
// import { fetchThemoviedbGenres } from './fetching and rendering/film-genres';

const listOfCards = document.querySelector('.js-cards');
const form = document.querySelector('.catalog__form');
const pagination = document.querySelector('#pagination');
form.addEventListener('submit', onSearchDefault);
// form.addEventListener('submit', onSearchExtensions);
let totalItemsTest = 80;
const genresTest = [{ id: 1, name: 'Comedy' }];
let name = '';
// let genre = '';
// let country = '';
// let year = '';

// ===============================FETCH===============================================

const fetchGenres = async () => {
  const response = await fetch(
    'https://api.themoviedb.org/3//genre/movie/list?api_key=df4f25ddce476816dc7867d9ac4bd1ea&language=en-US'
  );
  const genres = await response.json();
  return genres;
};

const fetchMovies = async page => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=df4f25ddce476816dc7867d9ac4bd1ea&page=${page}&language=en-US`
  );
  const movies = await response.json();
  return movies;
};

const fetchMoviesByName = async (page, name) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=df4f25ddce476816dc7867d9ac4bd1ea&page=${page}&query=${name}&language=en-US`
  );
  const moviesByName = await response.json();
  return moviesByName;
};

// ---------------взнати назви параметрів для розширеого пошуку з документації АПІ та передати їх сюди-------------------
// const fetchMoviesByNameAdvanced = async (page, name, genre, country, year) => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/search/movie?api_key=df4f25ddce476816dc7867d9ac4bd1ea&page=${page}&query=${name}&language=en-US`
//   );
//   const moviesByNameAvanced = await response.json();
//   return moviesByNameAdvanced;
// };

// ===============================ON PAGE LOAD AND ON SEARCH================================

// renderMovies(1, genresTest);
fetchGenres().then(data => console.log(data));

function onSearchDefault(event) {
  event.preventDefault();
  instance.reset();
  currentPage = 1;

  const {
    elements: { searchQuery },
  } = event.currentTarget;
  name = searchQuery.value.trim();
  renderMoviesByName(1, name, genresTest);
  form.reset();
}

// function onSearchAdvanced(event) {
//   event.preventDefault();
//   instance.reset();
//   currentPage = 1;

//   const {
// ---------------взнати значення name кожного селекту форми та передати їх сюди-------------------
//     elements: { searchQuery },
//   } = event.currentTarget;
//   name = searchQuery.value.trim();
//   genre = ;
//   country = ;
//   year = ;
//   console.log(fetchMoviesByNameAdvanced(1, name, genre, country, year));
//   renderMoviesByNameAdvanced(1, name, genre, country, year, genres);
//   form.reset();
// }

const instance = new Pagination(pagination, {
  totalItems: totalItemsTest,
  itemsPerPage: 20,
  visiblePages: 3,
  page: 1,
});

// ==================================RENDERING==============================================

function renderMovies(pageOfFilms, genresOfFilms) {
  const films = fetchMovies(pageOfFilms);
  const markup = createMarkup(films, genresOfFilms);
  console.log(fetchMovies(pageOfFilms));
  listOfCards.insertAdjacentHTML('beforeend', markup);
}

function renderMoviesByName(pageOfFilms, nameOfFilms, genresOfFilms) {
  const films = fetchMoviesByName(pageOfFilms, nameOfFilms);
  const markup = createMarkup(films, genresOfFilms);
  console.log(fetchMoviesByName(pageOfFilms, nameOfFilms));
  listOfCards.insertAdjacentHTML('beforeend', markup);
}

// function renderMoviesByNameAdvanced(page, name, genre, country, year, genresOfFilms) {
//   totalItemsFilms = 80;
//   console.log(fetchMoviesbyNameAdvanced(page, name, genre, country, year));
// }

// ================================TUI PAGINATION============================================

instance.on('beforeMove', function (eventData) {
  if (name === '') {
    renderMovies(eventData.page, genresTest);
    return confirm('Go to page ' + eventData.page + '? movies');
  }
});

instance.on('beforeMove', function (eventData) {
  if (name !== '') {
    renderMoviesByName(eventData.page, name, genresTest);
    return confirm('Go to page ' + eventData.page + '? by name');
  }
});

// instance.on('beforeMove', function (eventData) {
// --------------Написати розширену перевірку-------------------
//   if (name !== '') {
//     console.log(instance.getCurrentPage());
//     renderMoviesByNameAdvanced(eventData.page, name, genre, country, year, genres);
//     return confirm('Go to page ' + eventData.page + '? by name advanced');
//   }
// });

// =========================================FOR RENDERING========================================

function createMarkup(
  { id, poster_path, release_date, title, vote_average, genre_ids },
  genresListOfFilms
) {
  const genresNames = getGenresName(genresListOfFilms, genre_ids);
  return `
   <li class='movie__card'>
   <div class='movie__link' data-id=${id}>
    <img src='https://image.tmdb.org/t/p/w500/${poster_path}' alt='${title}' loading='lazy' class='movie__image' width='395' height='574'/>
      <h2 class='info-title'>${title}</h2>
      <p class='info-genre'>${genresNames}<span> | </span>${onlyYearFilter(
    release_date
  )}</p>
      <p class='info-vote'>${makeStarsMarkup(
        vote_average,
        'hero__rating-stars'
      )}</p>
    </div>
  </li>`;
}

function getGenresName(genresList, ids) {
  try {
    let arrayOfGenres = [];
    for (const object of genresList) {
      if (ids.includes(object['id'])) {
        arrayOfGenres.push(object.name);
      }
    }

    const commonArrayOfGenres = arrayOfGenres.concat(ids);
    const uniqueGenres = commonArrayOfGenres.filter(
      (genre, index, array) => array.indexOf(genre) === index
    );
    const genresString = uniqueGenres.join(', ');
    return genresString;
  } catch (error) {
    console.error(error);
  }
}

function onlyYearFilter(release_date) {
  return !release_date
    ? 'Unknown Year'
    : release_date.split('').slice(0, 4).join('');
}
