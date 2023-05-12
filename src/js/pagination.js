import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { name } from './fetching and rendering/films-by-search';
import { makeStarsMarkup } from './components/star-markup';

const filmList = document.querySelector('.gallery__films');

const pagination = new Pagination(document.getElementById('pagination2'), {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 5,
  centerAlign: true
});

pagination.on('afterMove', (event) => {
  const currentPage = event.page;
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=df4f25ddce476816dc7867d9ac4bd1ea&page=${currentPage}&query=${name}&language=en-US`).then(response => response.json()).then((data) => {
    let genresList = {};
    const markup = data.results.reduce(
      (markup, data) => markup + createMarkup(data, genresList),
      ''
    );
    filmList.innerHTML = markup;
  });
});

function createMarkup(
  { id, poster_path, title, genre_ids, release_date, vote_average },
  genresList
) {
  const baseUrlImg = 'https://image.tmdb.org/t/p/original';
  const plug = 'https://img2.akspic.ru/previews/9/0/7/9/4/149709/149709-mifologia-vedmak-illustracia-ciri-mificheskoe_sushhestvo-360x640.jpg';
  const genreNames = getGenresName(genre_ids, genresList);
  return `<li class="movie__card">
      <div class='movie__link' data-id=${id}">
            <img src='${poster_path == null ? '' : baseUrlImg}${poster_path == null ? plug : poster_path}' alt='${title}' loading='lazy' class='movie__image' width='395' height='574'/>
      </div>
          <div class="info overlay">
            <div class="info-thumb__text"><h2 class="info__title">${title}</h2>
              <p class="info__genre">${genreNames}<span> | </span>${onlyYearFilter(
    release_date
  )}</p></div>
              <div class="info-thumb__vote"><p class="info__vote">${makeStarsMarkup(
                vote_average,
                'catalog__rating-stars'
              )}</p></div>
          </div>
          </li>`;
}

function getGenresName(genre_ids, genresList) {
  try {
    const genreIds = genre_ids
      .slice(0, 2)
      .map(id => genresList[id])
      .join(', ');
    return genreIds;
  } catch (error) {
    console.error(error);
  }
}

function onlyYearFilter(release_date) {
  return !release_date
    ? 'Unknown Year'
    : release_date.split('').slice(0, 4).join('');
}



