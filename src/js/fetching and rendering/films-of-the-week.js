import { BASE_THEMOVIEDB_URL, apiKey } from "../tmdb-api";
import axios from "axios";

async function fetchThemoviedbWeek() {
    const response = await axios(`${BASE_THEMOVIEDB_URL}/trending/movie/week?api_key=${apiKey}`)
    const newCollection = await response.data;

    return newCollection;
}

export { fetchThemoviedbWeek };

// async function markup() { 
//     try {
//         const collection = await fetchThemoviedbDay();

//         console.log(collection.results);
//     } catch (error){
//         console.error(error);
//     }
// }

// markup();