import { BASE_THEMOVIEDB_URL, apiKey } from '../tmdb-api';
import { ItcCustomSelect } from '../components/castom-select';
import axios from 'axios';

async function fetchThemoviedbGenres() {
  const response = await axios(
    `${BASE_THEMOVIEDB_URL}/genre/movie/list?api_key=${apiKey}&language=en-US`
  );
  const newCollection = await response.data;

  return newCollection;
}

export { fetchThemoviedbGenres };

async function selectGenresAndMarkup() {
  try {
    const promis = await fetchThemoviedbGenres();
    const data = promis.genres
      .map((data, index) => {
        return `<li class="itc-select__option" data-select="option" data-value="${data.name}" data-index="${index}">${data.name}</li>`;
      })
      .join('');

    document.querySelector('.itc-select__genres').insertAdjacentHTML('beforeend', data);
    new ItcCustomSelect('#select-2');
    document.querySelector('.itc-select__toggle').disabled = false;
  } catch (error) {
    console.error(error);
  }
}

selectGenresAndMarkup();
