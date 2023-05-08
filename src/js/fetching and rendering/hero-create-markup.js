import { makeStarsMarkup } from '../components/star-markup';

class HeroMarkUp {
  static createStaticHero() {
    return `<div class="hero-static">
              <div class="hero-static__content">
                <div class="hero-static__frame"></div>
                <h1 class="hero-static__title">Let’s Make Your Own Cinema</h1>
                <p class="hero-static__description">
                Is a guide to creating a personalized movie theater experience. You'll
                need a projector, screen, and speakers.
                </p>
                <button class="hero-btn">Get Started</button>
              </div>
            </div>`;
  }
  static createBaseSlider() {
    return `<div class="swiper hero__slider">
              <div class="swiper-wrapper hero__wrap"></div>
            </div>
            <div class="slider-control">
              <div class="swiper-button-prev"></div>
              <div class="swiper-pagination"></div>
              <div class="swiper-button-next"></div>
            </div>`;
  }
  static createSlides(data) {
    return data.reduce(
      (acc, { title, vote_average, overview, backdrop_path, id }) => {
        const slideBg = `background-image: url(https://image.tmdb.org/t/p/original/${backdrop_path})`;
        return (acc += `<div class="swiper-slide hero__slide" data-id="${id}">
                          <div class="hero__bg" style="${slideBg}"></div>
                          <div class="hero__frame"></div>
                          <div class="hero__content">
                            <h1 class="hero__title">${title}</h1>
                            ${makeStarsMarkup(
                              vote_average,
                              'hero__rating-stars'
                            )}  
                            <p class="hero__description">${overview}</p>
                          </div>
                          <button class="hero-btn hero__btn-trailer" type="button">Watch trailer</button>
                        </div>`);
      },
      ''
    );
  }
}

export { HeroMarkUp };

//  <p class="hero__description">${overview}</p>;
