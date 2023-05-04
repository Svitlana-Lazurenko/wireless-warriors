import { BASE_THEMOVIEDB_URL, apiKey } from "../tmdb-api";
import axios from "axios";

async function fetchThemoviedbSearch(keyWord, page) {
    const response = await axios(`${BASE_THEMOVIEDB_URL}/search/movie?&query=${keyWord}&api_key=${apiKey}&page=${page}`)
    const newCollection = await response.data;

    return newCollection;
}

export { fetchThemoviedbSearch };

function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.round(rand);
}

// async function markup() { 
//     try {
//         const collection = await fetchThemoviedbSearch('simpson', 1);

//         console.log(collection.results[randomInteger(0, 20)]);
//     } catch (error){
//         console.error(error);
//     }
// }

// markup();