import { BASE_THEMOVIEDB_URL, apiKey } from "../tmdb-api";
import axios from "axios";

async function fetchThemoviedSearch(keyWord, page) {
    const response = await axios(`${BASE_THEMOVIEDB_URL}/search/movie?&query=${keyWord}&api_key=${apiKey}&page=${page}`)
    const newCollection = await response.data;

    return newCollection;
}

export { fetchThemoviedSearch };

// async function markup() { 
//     try {
//         const collection = await fetchThemoviedbDay('simpson', 1);

//         console.log(collection.results);
//     } catch (error){
//         console.error(error);
//     }
// }

// markup();