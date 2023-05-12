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
let filmID = null;

filmList.addEventListener('click', getFilmID);

function getFilmID () {
    if(filmList.nodeName === 'LI' || 'DIV') {
        setTimeout(() => {
            btn = document.querySelector('.modal-card__library-btn');
            btn.addEventListener('click', LocalStorageLibrary);
          }, 300);
    }
}

async function LocalStorageLibrary () {
    filmID = btn.dataset.id;

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
        if(currentState.some(({ID}) => ID == createObj(film).ID)) {
          btn.textContent = 'Remove to library';
          const updateArrayMyLibrary = load(MY_LIBRARY_KEY).filter(({ID}) => ID != createObj(film).ID);
          localStorage.clear();
          save(MY_LIBRARY_KEY, updateArrayMyLibrary);
          btn.textContent = 'Add to library';
          if(document.location.href.includes('my-library')) {
            location.reload();
          }
        } else {
          btn.textContent = 'Add to library';
          currentState.push(createObj(film));
          save(MY_LIBRARY_KEY, currentState);
          btn.textContent = 'Remove to library';
        }
      }
    }
    

function createObj ({ id, poster_path, release_date, title, vote_average, genres}) {
    return {
        ID : id,
        img : poster_path,
        data : release_date,
        nameFilm : title,
        rating : vote_average,
        genresFilms : genres,
    }
}

export { arrayMyFilms, createObj, fetchThemoviedID, MY_LIBRARY_KEY };