import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = '61a74e45dda65dc7d6d2b2ec92323e86';

const upcomongSoon = `${BASE_URL}/movie/upcoming?api_key=${KEY}`;
const upcomingSoonDiv = document.querySelector('.upcoming-soon');
if (upcomingSoonDiv) {
  axios
    .get(upcomongSoon)
    .then(response => {
      const movie =
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ];
      const imageUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

      const newDiv = document.querySelector('.upcoming-soon_title');
      const card = document.createElement('div');
      card.classList.add('upcoming-soon_box');

      const image = document.createElement('img');
      image.src = imageUrl;
      image.alt = movie.title;

      const textContainer = document.createElement('div');
      textContainer.classList.add('upcoming-soon_film');

      const title = document.createElement('h2');
      title.textContent = movie.title;
      title.classList.add('upcoming-soon_film__title');

      const infoUrl = `${BASE_URL}/movie/${movie.id}?api_key=${KEY}&language=en-US`;
      const creditsUrl = `${BASE_URL}/movie/${movie.id}/credits?api_key=${KEY}`;

      Promise.all([axios.get(infoUrl), axios.get(creditsUrl)])
        .then(results => {
          const info = results[0].data;
          const releaseDate = new Date(info.release_date).toLocaleDateString();
          const votes = Math.round(info.vote_average * 10) / 10;
          const voteCount = info.vote_count;
          const popularity = Math.round(info.popularity);
          const genres = info.genres
            .slice(0, 2)
            .map(genre => genre.name)
            .join(', ');
          const about = info.overview;

          const subtitle = document.createElement('div');
          subtitle.classList.add('upcoming-soon_text');

          // Create release date and votes container
          const rvContainer = document.createElement('div');
          rvContainer.classList.add('release-data__container');

          // Create release date
          const releaseDateElement = document.createElement('p');
          releaseDateElement.textContent = `Release Date: `;
          releaseDateElement.className = 'upcoming-soon_release';

          const dateElement = document.createElement('span');
          dateElement.textContent = releaseDate;
          dateElement.className = 'upcoming-soon_date';

          releaseDateElement.appendChild(dateElement);

          // Create votes
          const votesElement = document.createElement('p');
          const dataElement1 = document.createElement('span');
          const dataElement2 = document.createElement('span');

          votesElement.textContent = `Vote/Votes`;
          votesElement.classList.add('upcoming-soon_votes');
          dataElement1.textContent = voteCount;
          dataElement2.textContent = votes;
          dataElement1.classList.add('upcoming-soon__votes');
          dataElement2.classList.add('upcoming-soon__vote');
          votesElement.appendChild(dataElement2);
          votesElement.appendChild(document.createTextNode(' / '));
          votesElement.appendChild(dataElement1);

          rvContainer.appendChild(releaseDateElement);
          rvContainer.appendChild(votesElement);

          // Create popularity and genre container
          const pgContainer = document.createElement('div');
          pgContainer.classList.add('popularity-data_container');

          // Create popularity
          const popularityElement = document.createElement('p');
          const dataElement3 = document.createElement('span');
          dataElement3.textContent = popularity;
          dataElement3.classList.add('upcoming-soon_popularity');
          popularityElement.textContent = `Popularity`;
          popularityElement.classList.add('upcoming-soon_popularity2');
          pgContainer.appendChild(popularityElement);
          popularityElement.appendChild(dataElement3);

          // Create genres
          const genresElement = document.createElement('p');
          const dataElement4 = document.createElement('span');
          dataElement4.textContent = genres;
          dataElement4.classList.add('upcoming-soon__genr');
          genresElement.textContent = `Genre`;
          genresElement.classList.add('upcoming-soon_genres');
          pgContainer.appendChild(genresElement);
          genresElement.appendChild(dataElement4);

          subtitle.appendChild(rvContainer);
          subtitle.appendChild(pgContainer);

          // Create About
          const bgContainer = document.createElement('div');
          bgContainer.classList.add('about-data_container');

          const aboutElement = document.createElement('p');
          const aboutTitle = document.createElement('span');
          const aboutText = document.createElement('span');
          aboutTitle.textContent = 'About';
          aboutTitle.classList.add('upcoming-soon_about');
          aboutText.textContent = about;
          aboutText.classList.add('upcoming-soon_about__text');

          subtitle.appendChild(aboutElement);

          textContainer.appendChild(subtitle);
          textContainer.appendChild(title);
          textContainer.appendChild(subtitle);
          textContainer.appendChild(bgContainer);
          bgContainer.appendChild(aboutTitle);
          bgContainer.appendChild(aboutText);

          const button = document.createElement('button');
          button.type = 'button';
          button.textContent = 'Remind Me';
          button.classList.add('upcoming-soon_button');
          bgContainer.appendChild(button);

          card.appendChild(image);
          card.appendChild(textContainer);

          newDiv.after(card);
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
}
