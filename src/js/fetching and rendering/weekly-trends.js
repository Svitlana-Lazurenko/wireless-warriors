import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = '61a74e45dda65dc7d6d2b2ec92323e86';

const trendingUrl = `${BASE_URL}/trending/movie/week?api_key=${KEY}`;

axios
  .get(trendingUrl)
  .then(response => {
    const movies = response.data.results;

    const newDiv = document.querySelector('.weekly-trends_box');
    const container = document.createElement('div');
    newDiv.after(container);
    container.classList.add('card-container', 'container');

    // Determine the number of cards to show based on the screen width
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const numCards = mediaQuery.matches ? 1 : 3;

    for (let i = 0; i < numCards; i++) {
      const movie = movies[i];
      const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');

      const card = document.createElement('div');
      card.classList.add('card');

      const image = document.createElement('img');
      image.src = imageUrl;
      image.alt = movie.title;

      const title = document.createElement('h2');
      title.textContent = movie.title;
      title.classList.add('card__position-absolute__title');

      const infoUrl = `${BASE_URL}/movie/${movie.id}?api_key=${KEY}&language=en-US`;
      const creditsUrl = `${BASE_URL}/movie/${movie.id}/credits?api_key=${KEY}`;

      Promise.all([axios.get(infoUrl), axios.get(creditsUrl)])
        .then(results => {
          const info = results[0].data;
          const credits = results[1].data;

          const releaseYear = new Date(info.release_date).getFullYear();
          const genres = info.genres.length > 0 ? info.genres[0].name : 'N/A';
          const rating = info.vote_average;

          let genre;
          if (mediaQuery.matches) {
            genre = `${genres}`;
          } else {
            genre = `${genres}, ${info.genres[1].name}`;
          }

          const stars = ['\u2606', '\u2605']; // Array of star symbols (empty and filled)

          // Function to convert rating to stars
          function getStars(rating) {
            const filledStars = Math.round(rating / 2); // Get number of filled stars
            const emptyStars = 5 - filledStars; // Get number of empty stars
            return stars[1].repeat(filledStars) + stars[0].repeat(emptyStars); // Combine filled and empty stars
          }

          const subtitle = document.createElement('p');
          const spanRating = document.createElement('span');
          spanRating.textContent = getStars(rating);
          spanRating.classList.add('card-position-absolute__rating');
          subtitle.textContent = ` ${genre} ${releaseYear} `;
          subtitle.appendChild(spanRating);

          const subtitleWrapper = document.createElement('div');
          subtitleWrapper.classList.add('card__position-absolute');
          subtitleWrapper.appendChild(title);
          subtitleWrapper.appendChild(subtitle);

          card.appendChild(image);
          card.appendChild(subtitleWrapper);

          container.appendChild(card);
        })
        .catch(error => {
          console.error(error);
        });
    }

    // Append container to the weekly-trends section
    const weeklyTrendsSection = document.querySelector('.weekly-trends');
    weeklyTrendsSection.appendChild(container);
  })
  .catch(error => {
    console.error(error);
  });
const mediaQuery = window.matchMedia('(max-width: 767px)');
mediaQuery.addListener(() => {
  const container = document.querySelector('.card-container');
  const numCards = mediaQuery.matches ? 1 : 3;

  // Remove existing cards
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  // Add new cards
  axios
    .get(trendingUrl)
    .then(response => {
      const movies = response.data.results;

      for (let i = 0; i < numCards; i++) {
        const movie = movies[i];
        const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = movie.title;

        const title = document.createElement('h2');
        title.textContent = movie.title;
        title.classList.add('card__position-absolute__title');

        const infoUrl = `${BASE_URL}/movie/${movie.id}?api_key=${KEY}&language=en-US`;
        const creditsUrl = `${BASE_URL}/movie/${movie.id}/credits?api_key=${KEY}`;

        Promise.all([axios.get(infoUrl), axios.get(creditsUrl)])
          .then(results => {
            const info = results[0].data;
            const credits = results[1].data;

            const releaseYear = new Date(info.release_date).getFullYear();
            const genres = info.genres.length > 0 ? info.genres[0].name : 'N/A';
            const rating = info.vote_average;

            let genre;
            if (mediaQuery.matches) {
              genre = `${genres}`;
            } else {
              genre = `${genres}, ${info.genres[1].name}`;
            }

            const stars = ['\u2606', '\u2605']; // Array of star symbols (empty and filled)

            // Function to convert rating to stars
            function getStars(rating) {
              const filledStars = Math.round(rating / 2); // Get number of filled stars
              const emptyStars = 5 - filledStars; // Get number of empty stars
              return stars[1].repeat(filledStars) + stars[0].repeat(emptyStars); // Combine filled and empty stars
            }

            const subtitle = document.createElement('p');
            const spanRating = document.createElement('span');
            spanRating.textContent = getStars(rating);
            spanRating.classList.add('card-position-absolute__rating');
            subtitle.textContent = ` ${genre} | ${releaseYear} | Rating:`;
            subtitle.appendChild(spanRating);

            const subtitleWrapper = document.createElement('div');
            subtitleWrapper.classList.add('card__position-absolute');
            subtitleWrapper.appendChild(title);
            subtitleWrapper.appendChild(subtitle);

            card.appendChild(image);
            card.appendChild(subtitleWrapper);

            container.appendChild(card);
          })
          .catch(error => {
            console.error(error);
          });
      }
    })
    .catch(error => {
      console.error(error);
    });
});
