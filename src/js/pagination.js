import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import axios from 'axios';

const form = document.querySelector('.catalog__form');
const pagination = document.querySelector('#pagination');
form.addEventListener('submit', onSearchDefault);
// form.addEventListener('submit', onSearchExtensions);
let page = 1;
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

function renderThemoviedbWeek(page) {
  console.log(fetchThemoviedbWeek(page));
}

function renderThemoviedbName(page, name) {
  console.log(fetchThemoviedbName(page, name));
}

renderThemoviedbWeek(1);

function onSearchDefault(event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  name = searchQuery.value.trim();
  renderThemoviedbName(1, name);
  // form.reset();
}

const instance = new Pagination(pagination, {
  totalItems: 80,
  itemsPerPage: 4,
  visiblePages: 3,
  page: 1,
});

instance.getCurrentPage();

instance.on('beforeMove', function (eventData) {
  if (name === '') {
    renderThemoviedbWeek(eventData.page);
    return confirm('Go to page ' + eventData.page + '? week');
  }
});

instance.on('beforeMove', function (eventData) {
  if (name !== '') {
    renderThemoviedbName(eventData.page, name);
    return confirm('Go to page ' + eventData.page + '? name');
  }
});

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

// instance.on('beforeMove', function (eventData) {
//   console.log(fetchThemoviedbParams(eventData.page));
//   return confirm('Go to page ' + eventData.page + '?');
// });
// ------------------------------
// function renderMarkup(markup) {
//   if (markup !== undefined)
//     refs.gallery.insertAdjacentHTML('beforeend', markup);
// }
// трай-кетч
