import { BASE_THEMOVIEDB_URL, apiKey } from '../tmdb-api';
import axios from 'axios';

async function fetchThemoviedbGenres() {
  const response = await axios(
    `${BASE_THEMOVIEDB_URL}/genre/movie/list?api_key=${apiKey}&language=en-US`
  );
  const newCollection = await response.data;

  return newCollection;
}

// async function getGenres() {
//   try {
//     const { genres } = await fetchThemoviedbGenres();
//     const genresList = {};
//     genres.forEach(({ id, name }) => {
//       genresList[id] = name;
//     });
//     return;
//   } catch (error) {
//     console.error(error);
//   }
// }

export { fetchThemoviedbGenres };

// export const genresList = [
//   {
//     id: 28,
//     name: 'Action',
//   },
//   {
//     id: 12,
//     name: 'Adventure',
//   },
//   {
//     id: 16,
//     name: 'Animation',
//   },
//   {
//     id: 35,
//     name: 'Comedy',
//   },
//   {
//     id: 80,
//     name: 'Crime',
//   },
//   {
//     id: 99,
//     name: 'Documentary',
//   },
//   {
//     id: 18,
//     name: 'Drama',
//   },
//   {
//     id: 10751,
//     name: 'Family',
//   },
//   {
//     id: 14,
//     name: 'Fantasy',
//   },
//   {
//     id: 36,
//     name: 'History',
//   },
//   {
//     id: 27,
//     name: 'Horror',
//   },
//   {
//     id: 10402,
//     name: 'Music',
//   },
//   {
//     id: 9648,
//     name: 'Mystery',
//   },
//   {
//     id: 10749,
//     name: 'Romance',
//   },
//   {
//     id: 878,
//     name: 'Science Fiction',
//   },
//   {
//     id: 10770,
//     name: 'TV Movie',
//   },
//   {
//     id: 53,
//     name: 'Thriller',
//   },
//   {
//     id: 10752,
//     name: 'War',
//   },
//   {
//     id: 37,
//     name: 'Western',
//   },
// ];
