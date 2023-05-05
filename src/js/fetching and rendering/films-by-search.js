import { BASE_THEMOVIEDB_URL, apiKey } from "../tmdb-api";
import axios from "axios";

async function fetchThemoviedbSearch(keyWord, page) {
    const response = await axios(`${BASE_THEMOVIEDB_URL}/search/movie?&query=${keyWord}&api_key=${apiKey}&page=${page}`)
    const newCollection = await response.data;

    return newCollection;
}

export { fetchThemoviedbSearch };

// async function markup() { 
//     try {
//         const collection = await fetchThemoviedbSearch('simpson', 1);

//         console.log(collection.results);
//     } catch (error){
//         console.error(error);
//     }
// }

// markup();