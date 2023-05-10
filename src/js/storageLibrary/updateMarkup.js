import { arrayMyFilms } from './upadateStorage';
import { makeStarsMarkup } from '../components/star-markup';

if (document.location.href.includes('my-library.html')) {
    const filmList = document.querySelector('.libraryFilms');
const baseUrl = 'https://image.tmdb.org/t/p/w500/';

let genresList = {};

const markup = arrayMyFilms.reduce(
    (markup, arrayMyFilms) => markup + createMarkup(arrayMyFilms, genresList),
    ''
);

updateMoviesList(markup);

function createMarkup(
    { ID, img, data, nameFilm, rating, genres }
    
  ) {
    // const genreNames = getGenresName(genres, genresList);
    return `
     <li class='movie__card'>
     <div class='movie__link' data-id=${ID}>
      <img src='${baseUrl}${img}' alt='${nameFilm}' loading='lazy' class='movie__image' width='395' height='574'/>
        <h2 class='info-title'>${nameFilm}</h2>
        <p class='info-genre'>${'заглушка'}<span> | </span>${onlyYearFilter(
            data
    )}</p>
        <p class='info-vote'>${makeStarsMarkup(
            rating,
          'hero__rating-stars'
        )}</p>
      </div>
    </li>`;
}

function getGenresName(genre_ids, genresList) {
    try {
      const genreId = genre_ids.map(id => genresList[id]).join(' , ');
      return genreId;
    } catch (error) {
      console.error(error);
    }
}

function onlyYearFilter(release_date) {
    return !release_date
      ? 'Unknown Year'
      : release_date.split('').slice(0, 4).join('');
}

function updateMoviesList(markup = '') {
    if (markup !== undefined) {
        filmList.innerHTML = markup;
    }
}
}