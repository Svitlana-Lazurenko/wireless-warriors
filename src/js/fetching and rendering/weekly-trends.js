import axios from 'axios';
import { makeStarsMarkup } from '../components/star-markup';

const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = '61a74e45dda65dc7d6d2b2ec92323e86';

const trendingUrl = `${BASE_URL}/trending/movie/week?api_key=${KEY}`;

const createCard = async (movie, mediaQuery) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');

  const card = document.createElement('li');
  card.classList.add('card');
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');

  card.addEventListener('click', async () => {
    try {
      const infoUrl = `${BASE_URL}/movie/${movie.id}?api_key=${KEY}&language=en-US`;
      const response = await axios.get(infoUrl);
      const movieData = response.data;

      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');
      modalContent.innerHTML = `
     <div class="backdrop-movie openModalFilm">   <div class="modal-movie"><button
  class="btn-close js-btn-close-modal"
  data-modal-close
  arial-label="Close"
>     <svg class="btn-close__icon" width="14" height="14">
    <use href="icons.adfc4680.svg#icon-close"></use>
  </svg>    </button>
<div class="modal-card js-modal-card">
  <div class="modal-card__thumb-left">
        <img class="modal-card__img" src="https://image.tmdb.org/t/p/w500${
          movieData.poster_path
        }" alt="${movieData.title}" />
      </div>
      <div class="modal-card__thumb-right">
        <p class="thumb-right__title">${movieData.title}</p>
        <div class="thumb-right__details">
          <ul class="thumb-right__name-details">
            <li class="thumb-right__name-item">Vote / Votes</li>
            <li class="thumb-right__name-item">Popularity</li>
            <li class="thumb-right__name-item">Genre</li>
          </ul>
          <ul class="thumb-right__value-details">
            <li class="thumb-right__value-item">
              <span class="thumb-right__vote">${movieData.vote_average}</span>
              <span class="thumb-right__delimiter"><span>&nbsp</span>/<span>&nbsp</span></span>
              <span class="thumb-right__votes">${movieData.vote_count}</span>
            </li>
            <li class="thumb-right__value-item">${movieData.popularity}</li>
            <li class="thumb-right__value-item">${movieData.genres
              .map(genre => genre.name)
              .join(', ')}</li>
          </ul>
        </div>
        <p class="thumb-right__about">About</p>
        <p class="thumb-right__overview">${movieData.overview}</p>
        <div class="modal-card__btn-wrap">
          <button class="modal-card__library-btn js-add-library-btn" data-id="${
            movieData.id
          }" data-name="library">Add to library</button>
        </div>
      </div>
</div>
</div>   </div>
    `;

      const modal = createModal(modalContent);
      document.body.appendChild(modal);

      document.addEventListener('keyup', event => {
        if (event.key === 'Escape') {
          modal.remove();
        }
      });
    } catch (error) {
      console.error(error);
    }
  });

  document.addEventListener('click', event => {
    const closeButton = event.target.closest('.js-btn-close-modal');
    if (closeButton) {
      const modal = closeButton.closest('.modal');
      modal.remove();
    }
  });

  function createModal(content) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.appendChild(content);
    return modal;
  }

  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = movie.title;

  const title = document.createElement('h2');
  title.textContent = movie.title;
  title.classList.add('card__position-absolute__title');

  const infoUrl = `${BASE_URL}/movie/${movie.id}?api_key=${KEY}&language=en-US`;
  const creditsUrl = `${BASE_URL}/movie/${movie.id}/credits?api_key=${KEY}`;

  try {
    const [infoResponse] = await Promise.all([
      axios.get(infoUrl),
      axios.get(creditsUrl),
    ]);

    const info = infoResponse.data;

    const releaseYear = new Date(info.release_date).getFullYear();
    const genres = info.genres.length > 0 ? info.genres[0].name : 'N/A';
    const rating = info.vote_average;

    let genre;
    if (mediaQuery.matches) {
      genre = `${genres}`;
    } else if (info.genres[1]) {
      genre = `${genres}, ${info.genres[1].name}`;
    } else {
      genre = `${genres}`;
    }

    const subtitle = document.createElement('p');
    const spanRating = document.createElement('span');
    spanRating.innerHTML = makeStarsMarkup(rating, 'upcoming-soon__star');
    spanRating.classList.add('card-position-absolute__rating');
    subtitle.textContent = ` ${genre} | ${releaseYear} `;
    subtitle.appendChild(spanRating);

    const subtitleWrapper = document.createElement('div');
    subtitleWrapper.classList.add('card__position-absolute');
    subtitleWrapper.appendChild(title);
    subtitleWrapper.appendChild(subtitle);

    card.appendChild(image);
    card.appendChild(subtitleWrapper);

    return card;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const renderCards = async (movies, container, mediaQuery) => {
  const numCards = mediaQuery.matches ? 1 : 3;

  for (let i = 0; i < numCards; i++) {
    const movie = movies[i];
    const card = await createCard(movie, mediaQuery);
    if (card) {
      container.appendChild(card);
    }
  }
};

const init = async () => {
  try {
    const response = await axios.get(trendingUrl);
    const movies = response.data.results;

    const newDiv = document.querySelector('.weekly-trends_box');
    const container = document.createElement('ul');
    newDiv.after(container);
    container.classList.add('card-container', 'container');

    const mediaQuery = window.matchMedia('(max-width: 767px)');
    await renderCards(movies, container, mediaQuery);
    const weeklyTrendsSection = document.querySelector('.weekly-trends');
    weeklyTrendsSection.appendChild(container);

    mediaQuery.addListener(async () => {
      const cards = container.querySelectorAll('.card');
      cards.forEach(card => {
        card.remove();
      });

      await renderCards(movies, container, mediaQuery);
    });
  } catch (error) {
    console.error(error);
  }
};

if (document.querySelector('.weekly-trends')) {
  init();
}
