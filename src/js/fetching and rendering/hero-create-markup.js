function createMarkup(data) {
  return data.reduce(
    (acc, { title, vote_average, overview, backdrop_path }) => {
      const ratingValue = `clip-path: inset(0 ${getRemainingPercent(
        vote_average
      )}% 0 0)`;
      const slideBg = `background-image: linear-gradient(87.8deg, #0E0E0E 15.61%, rgba(14, 14, 14, 0) 60.39%), url(image.png), url(https://image.tmdb.org/t/p/w780/${backdrop_path})`;
      return (acc += `<div class="swiper-slide hero__slide">
                        <div class="hero__bg" style="${slideBg}"></div>
                        <div class="hero__content">
                          <h1 class="hero__title">${title}</h1>
                          <div class="stars hero__rating">
                            <svg class="star__icon star__icon--field" style = "${ratingValue}">
                              <use xlink:href="#star-filled"></use></svg
                            ><svg class="star__icon star__icon--empty">
                              <use xlink:href="#star-empty"></use>
                            </svg>
                          </div>
                          
                          <p class="hero__description">${overview}</p>
                          <button class="hero__button-trailer" type="button">Watch trailer</button>
                        </div>
                      </div>`);
    },
    ''
  );
}

function getRemainingPercent(value) {
  return (10 - value) * 10;
}

export { createMarkup };
