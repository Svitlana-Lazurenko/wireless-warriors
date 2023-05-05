import { BASE_THEMOVIEDB_URL, apiKey } from "../tmdb-api";
import axios from "axios";

async function fetchThemoviedbGenres() {
    const response = await axios(`${BASE_THEMOVIEDB_URL}/genre/movie/list?api_key=${apiKey}`)
    const newCollection = await response.data;

    return newCollection;
}

export { fetchThemoviedbGenres };

//////// ПОСЛЕ ВЫПОЛНЕНИЯ УДАЛИТЬ КОММЕНТЫ /////

// async function markup() { 
//     try {
//         const collection = await fetchThemoviedbGenres();

//         console.log(collection.genres);
//     } catch (error){
//         console.error(error);
//     }
// }

// markup();