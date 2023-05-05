import { BASE_THEMOVIEDB_URL, apiKey } from "../tmdb-api";
import axios from "axios";

async function fetchThemoviedbFilmInfo(id) {
    const response = await axios(`${BASE_THEMOVIEDB_URL}/movie/${id}?api_key=${apiKey}`)
    const newCollection = await response.data;

    return newCollection;
}

export { fetchThemoviedbFilmInfo };

// async function markup() { 
//     try {
//         const collection = await fetchThemoviedbFilmInfo(758323);

//         console.log(collection);
//     } catch (error){
//         console.error(error);
//     }
// }

// markup();