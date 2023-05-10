import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import axios from 'axios';
import { makeStarsMarkup } from './components/star-markup';
import { fetchThemoviedbGenres } from './fetching and rendering/film-genres';

const form = document.querySelector('.catalog__form');
const pagination = document.querySelector('#pagination');
form.addEventListener('submit', onSearchDefault);
// form.addEventListener('submit', onSearchExtensions);
const genres = fetchThemoviedbGenres();
// console.log(genres);
const instance = new Pagination(pagination, {
  totalItems: 80,
  itemsPerPage: 4,
  visiblePages: 3,
  page: 1,
});
let name = '';
// let genre = '';
// let country = '';
// let year = '';

async function fetchThemoviedbWeek(page) {
  const response = await axios(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=df4f25ddce476816dc7867d9ac4bd1ea&page=${page}&language=en-US`
  );
  const newCollection = await response.data;
  return newCollection;
}

async function fetchThemoviedbName(page, name) {
  const response = await axios(
    `https://api.themoviedb.org/3/search/movie?api_key=df4f25ddce476816dc7867d9ac4bd1ea&page=${page}&language=en-US&query=${name}`
  );
  const newCollection = await response.data;
  return newCollection;
}

// ---------------взнати назви параметрів з документації АПІ та передати їх сюди-------------------
// async function fetchThemoviedbParams(page, genre, country, year) {
//   const response = await axios(
//     `https://api.themoviedb.org/3/search/movie?api_key=df4f25ddce476816dc7867d9ac4bd1ea&page=${page}&language=en-US`
//   );
//   const newCollection = await response.data;
//   return newCollection;
// }

renderThemoviedbWeek(1, genres);

function onSearchDefault(event) {
  event.preventDefault();
  instance.reset();
  currentPage = 1;
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  name = searchQuery.value.trim();
  renderThemoviedbName(1, name);
  // form.reset();
}

function renderThemoviedbWeek(page, genresOfFilms) {
  // console.log(fetchThemoviedbWeek(page));
  // console.log(genres);
  // fetchThemoviedbWeek(page)
  //   .then(data => {
  //     createMarkup(data);
  //   })
  //   .catch(error => console.log(error));
  const films = fetchThemoviedbWeek(page);
  createMarkup(films, genresOfFilms);
}

function renderThemoviedbName(page, name) {
  console.log(fetchThemoviedbName(page, name));
}

// function onSearchExtensions(event) {
//   event.preventDefault();
//   const {
// ---------------взнати значення name кожного селекту форми та передати їх сюди-------------------
//     elements: { searchQuery },
//   } = event.currentTarget;
//   name = searchQuery.value.trim();
//   console.log(fetchThemoviedbName(1, name));
//   form.reset();
// }

instance.on('beforeMove', function (eventData) {
  if (name === '') {
    console.log(instance.getCurrentPage());
    renderThemoviedbWeek(eventData.page);
    return confirm('Go to page ' + eventData.page + '? week');
  }
});

instance.on('beforeMove', function (eventData) {
  if (name !== '') {
    console.log(instance.getCurrentPage());
    renderThemoviedbName(eventData.page, name);
    return confirm('Go to page ' + eventData.page + '? name');
  }
});

// instance.on('beforeMove', function (eventData) {
//   console.log(fetchThemoviedbParams(eventData.page));
//   return confirm('Go to page ' + eventData.page + '?');
// });

// function createMarkup {

// }

// function createMarkup(
//   { id, poster_path, release_date, title, vote_average, genre_ids },
//   genresList
// ) {
//   const genreNames = getGenresName(genre_ids, genresList);
//   return `
//    <li class='movie__card'>
//    <div class='movie__link' data-id=${id}>
//     <img src='${img}${poster_path}' alt='${title}' loading='lazy' class='movie__image' width='395' height='574'/>
//       <h2 class='info-title'>${title}</h2>
//       <p class='info-genre'>${genreNames}<span> | </span>${onlyYearFilter(
//     release_date
//   )}</p>
//       <p class='info-vote'>${makeStarsMarkup(
//         vote_average,
//         'hero__rating-stars'
//       )}</p>
//     </div>
//   </li>`;
// }

function createMarkup(
  { id, poster_path, release_date, title, vote_average, genre_ids },
  genresList
) {
  const genresNames = getGenresName(genresList, genre_ids);
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

// function getGenresName(genre_ids, genresList) {
//   try {
//     const genreIds = genre_ids.map(id => genresList[id]).join(' , ');
//     return genreIds;
//   } catch (error) {
//     console.error(error);
//   }
// }

function getGenresName(genresList, ids) {
  try {
    const namesOfGenres = Object.values(genresList);
    const commonArrayOfGenres = namesOfGenres.concat(ids);
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
