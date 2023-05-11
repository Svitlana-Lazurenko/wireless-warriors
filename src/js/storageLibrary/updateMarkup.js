import { arrayMyFilms } from './upadateStorage';
import { makeStarsMarkup } from '../components/star-markup';
import { fetchThemoviedbGenres } from '..//fetching and rendering/film-genres';

if (document.location.href.includes('my-library.html')) {
  const filmList = document.querySelector('.libraryFilms');
  const baseUrl = 'https://image.tmdb.org/t/p/w500/';

  async function loadMoviesWeek() {
    try {
      const { genres } = await fetchThemoviedbGenres();

      let genresList = {};

      genres
        .map(({ id, name }) => {
          genresList[id] = name;
        })
        .join('');

      console.log(genresList);

      const markup = arrayMyFilms.reduce(
        (markup, arrayMyFilms) => markup + createMarkup(arrayMyFilms, genresList),
        ''
      );
      updateMoviesList(markup);
    } catch (error) {
      onFetchError(error);
    }
  }

  function createMarkup({ ID, img, data, nameFilm, rating, genres }, genresList) {
    const genreNames = getGenresName(genres, genresList);
    console.log(genreNames);

    return `
     <li class='movie__card'>
     <div class='movie__link' data-id=${ID}>
      <img src='${baseUrl}${img}' alt='${nameFilm}' loading='lazy' class='movie__image' width='395' height='574'/>
        <h2 class='info-title'>${nameFilm}</h2>
        <p class='info-genre'>${genreNames}<span> | </span>${onlyYearFilter(data)}</p>
        <p class='info-vote'>${makeStarsMarkup(
          rating,
          'catalog__rating-stars'
          // 'hero__rating-stars'
        )}</p>
      </div>
    </li>`;
  }

  function getGenresName(genres, genresList) {
    try {
      const genreId = genres
        .slice(0, 2)
        .map(id => genresList[id])
        .join(', ');

      return genreId;
    } catch (error) {
      console.error(error);
    }
  }

  function onlyYearFilter(release_date) {
    return !release_date ? 'Unknown Year' : release_date.split('').slice(0, 4).join('');
  }

  function updateMoviesList(markup = '') {
    if (markup !== undefined) {
      filmList.innerHTML = markup;
    }
  }
}
