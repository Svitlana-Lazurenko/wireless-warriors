import axios from 'axios';
import { BASE_THEMOVIEDB_URL, apiKey } from '../tmdb-api';
import { save, load } from './storage';

async function fetchThemoviedID(filmID) {
    const response = await axios(
      `${BASE_THEMOVIEDB_URL}/movie/${filmID}?api_key=${apiKey}&language=en-US`
    );
    const newFilm = await response;
    return newFilm.data;
}

const filmList = document.querySelector('.gallery__films');
const MY_LIBRARY_KEY = 'myLibrary:)';
const arrayMyFilms = load(MY_LIBRARY_KEY);
let btn = null;
console.log(document.querySelector('.modal-card__library-btn'));
filmList.addEventListener('click', getFilmID);

function getFilmID () {
    if(filmList.nodeName === 'LI' || 'DIV') {
        setTimeout(() => {
            btn = document.querySelector('.modal-card__library-btn');
            btn.addEventListener('click', LocalStorageLibrary);
          }, 1000);
    }
}

async function LocalStorageLibrary () {
    let filmID = btn.dataset.id;

    try {
        const film = await fetchThemoviedID(filmID);
        addFilmToMyStorage(film);
    } catch (error) {
        console.error(error);
    }
}

function addFilmToMyStorage(film) {
    const currentState = load(MY_LIBRARY_KEY);
    if (currentState === undefined) {
      const array = [createObj(film)];
      save(MY_LIBRARY_KEY, array);
    } else {
      currentState.push(createObj(film));
      save(MY_LIBRARY_KEY, currentState);
    }
  }

function createObj ({ id, poster_path, release_date, title, vote_average, genre_ids }) {
    return {
        ID : id,
        img : poster_path,
        data : release_date,
        nameFilm : title,
        rating : vote_average,
        genres : genre_ids,
    }
}

export { arrayMyFilms };