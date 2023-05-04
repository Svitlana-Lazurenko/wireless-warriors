import { BASE_THEMOVIEDB_URL, apiKey } from "../tmdb-api";
import axios from "axios";

async function fetchThemoviedbTralier(id) {
    const response = await axios(`${BASE_THEMOVIEDB_URL}/movie/${id}/videos?api_key=${apiKey}`)
    const newCollection = await response.data;

    return newCollection;
}

export { fetchThemoviedbTralier };

//////// ПОСЛЕ ВЫПОЛНЕНИЯ УДАЛИТЬ КОММЕНТЫ /////

// async function markup() { 
//     try {
//         const collection = await fetchThemoviedbTralier(20);

//         console.log(collection.results);
//     } catch (error){
//         console.error(error);
//     }
// }

// markup();