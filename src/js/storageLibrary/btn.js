import axios from 'axios';
import { BASE_THEMOVIEDB_URL, apiKey } from '../tmdb-api';
import { load } from './storage';

function fetchThemoviedID(filmID) {
    return fetch(
      `${BASE_THEMOVIEDB_URL}/movie/${filmID}?api_key=${apiKey}&language=en-US`
    ).then(response => response.json()).then(data => data);
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

const filmList = document.querySelector('.gallery__films');
const MY_LIBRARY_KEY = 'myLibrary:)';

let btn = null;
let filmID = null;

filmList.addEventListener('click', getFilmID);

function getFilmID () {
    if(filmList.nodeName === 'LI' || 'DIV') {
        setTimeout(() => {
            btn = document.querySelector('.modal-card__library-btn');
            filmID = btn.dataset.id;

            fetchThemoviedID(filmID).then((data) => {
                const arrayMyFilms = load(MY_LIBRARY_KEY);
                if(arrayMyFilms.some(({ID}) => ID == createObj(data).ID)) {
                    btn.textContent = 'Remove to library';
                }
                
            });
          }, 100);
    }
}