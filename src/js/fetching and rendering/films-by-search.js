import { BASE_THEMOVIEDB_URL, apiKey } from '../tmdb-api';
import axios from 'axios';
// import { fetchThemoviedbGenres } from './film-genres';

async function fetchThemoviedbSearch(keyWord, page) {
  const response = await axios(
    `${BASE_THEMOVIEDB_URL}/search/movie?&query=${keyWord}&api_key=${apiKey}&page=${page}`
  );
  const newCollection = await response.data;

  return newCollection;
}

const refs = {
  form: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery-films'),
  //   pagination: document.querySelector('.paginations'),
};

refs.form.addEventListener('submit', markup);

let page = 1;

async function markup(event) {
  event.preventDefault();
  updateMarkup();
  try {
    let searchParam = refs.form.elements.searchQuery.value.trim();
    const collection = await fetchThemoviedbSearch(searchParam, page);
    // const { genres } = await fetchThemoviedbGenres();
    // let genresList = {};
    // genres
    //   .map(({ id, name }) => {
    //     genresList[id] = name;
    //   })
    //   .join('');
    // console.log(genresList);
    console.log(collection.results);
    const markup = collection.results
      .map(({ poster_path, title, genre_ids, release_date, vote_average }) => {
        //   const genreNames = getGenresName(genre_ids, genresList);
        return `<li class='movie__card'>
   <a href="" class='movie__link'>
     <img  src='https://image.tmdb.org/t/p/original${poster_path}' alt='${title}' loading='lazy' class='movie__image' width='395' height='574'/>
    <div class='info overlay'>
      <h2 class='info-title'>${title}</h2>
      <p class='info-genre'>${genre_ids}<span>|</span>${onlyYearFilter(
          release_date
        )}</p>
      <p class='info-vote'>${vote_average}</p>
    </div>
    </a>
  </li>`;
      })
      .join('');
    updateMarkup(markup);
    refs.form.reset();
  } catch (error) {
    console.error(error);
  }
}
// function getGenresName(genre_ids, genresList) {
//   try {
//     const genreIds = genre_ids.map(id => genresList[id]).join(' , ');
//     return genreIds;
//   } catch (error) {
//     console.error(error);
//   }
// }
function onlyYearFilter(release_date) {
  return !release_date
    ? 'Unknown Year'
    : release_date.split('').slice(0, 4).join('');
}

markup();

function updateMarkup(markup = '') {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
