import { arrayMyFilms } from './upadateStorage';
import { makeStarsMarkup } from '../components/star-markup';

if (document.location.href.includes('my-library.html')) {
  const filmList = document.querySelector('.libraryFilms');
  const baseUrl = 'https://image.tmdb.org/t/p/w500/';
  const library = document.querySelector('.library__message');
  const searchButton = document.querySelector('.library__search-button');
  let markup = null;
  let genresList = {};

  if(arrayMyFilms !== undefined) {
  markup = arrayMyFilms.reduce(
      (markup, arrayMyFilms) => markup + createMarkup(arrayMyFilms, genresList),
      ''
  );
  }

  if(arrayMyFilms === undefined) {
    library.innerHTML = `<h2 class="title-error ">
      OOPS...<br />
      We are very sorry!<br />
      You don’t have any movies at your library.</h2>`;
    
    return;
  }
  
  if (arrayMyFilms.length > 0 ) {
    library.remove();
    searchButton.remove();
    updateMoviesList(markup);
  } else {
    library.innerHTML = `<h2 class="title-error ">
      OOPS...<br />
      We are very sorry!<br />
      You don’t have any movies at your library.</h2>`;
    
    return;
  }
  

  updateMoviesList(markup);

  function createMarkup(
      { ID, img, data, nameFilm, rating, genresFilms }
      
    ) {
      // const genreNames = getGenresName(genres, genresList);
      return `
      <li class="movie__card">
           <div class='movie__link' data-id=${ID}">
                 <img src='https://image.tmdb.org/t/p/original${img}' alt='${nameFilm}' loading='lazy' class='movie__image' width='395' height='574'/>
           </div>
               <div class="info overlay">
                 <div class="info-thumb__text"><h2 class="info__title">${nameFilm}</h2>
                   <p class="info__genre ">${getGenresName(genresFilms)}<span> | </span>${onlyYearFilter(
       data
     )}</p></div>
                   <div class="info-thumb__vote"><p class="info__vote">${makeStarsMarkup(
                     rating,
                     'catalog__rating-stars'
                   )}</p></div>
               </div>
               </li>`; 
    }
 
  function getGenresName(genresFilm) {
    let genresMovie = [];
    genresFilm.forEach(({name}) => {
      genresMovie.push(name);
    });
    return genresMovie
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
