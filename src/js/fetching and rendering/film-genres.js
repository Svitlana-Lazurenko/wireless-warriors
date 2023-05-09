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

