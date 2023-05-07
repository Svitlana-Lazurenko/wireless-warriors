import { makeStarsMarkup } from '../components/star-markup';

function createMarkup(data) {
  return data.reduce(
    (acc, { title, vote_average, overview, backdrop_path, id }) => {
      const slideBg = `background-image: url(https://image.tmdb.org/t/p/original/${backdrop_path})`;
      return (acc += `<div class="swiper-slide hero__slide" data-id="${id}">
                        <div class="hero__bg" style="${slideBg}"></div>
                        <div class="hero__frame"></div>
                        <div class="hero__content">
                          <h1 class="hero__title">${title}</h1> 
                          ${makeStarsMarkup(vote_average, 'hero__rating-stars')}
                          <p class="hero__description">${overview}</p>
                        </div>
                        <button class="btn hero__button-trailer" type="button">Watch trailer</button>
                      </div>`);
    },
    ''
  );
}

export { createMarkup };
