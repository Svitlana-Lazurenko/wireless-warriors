import { makeStarsMarkup } from '../components/star-markup';

function createMarkup(data) {
  return data.reduce(
    (acc, { title, vote_average, overview, backdrop_path }) => {
      const slideBg = `background-image: linear-gradient(87.8deg, #0E0E0E 15.61%, rgba(14, 14, 14, 0) 60.39%), url(image.png), url(https://image.tmdb.org/t/p/w780/${backdrop_path})`;
      return (acc += `<div class="swiper-slide hero__slide">
                        <div class="hero__bg" style="${slideBg}"></div>
                        <div class="hero__content">
                          <h1 class="hero__title">${title}</h1> 
                          ${makeStarsMarkup(vote_average, 'hero__rating-stars')}
                          <p class="hero__description">${overview}</p>
                          <button class="btn hero__button-trailer" type="button">Watch trailer</button>
                        </div>
                      </div>`);
    },
    ''
  );
}

export { createMarkup };
