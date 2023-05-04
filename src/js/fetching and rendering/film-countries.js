import { BASE_THEMOVIEDB_URL, apiKey } from "../tmdb-api";
import axios from "axios";

async function fetchThemoviedCountries() {
    const response = await axios(`${BASE_THEMOVIEDB_URL}/configuration/countries?api_key=${apiKey}`);
    const newCollection = await response.data;

    return newCollection;
}

export { fetchThemoviedCountries };

//////// ПОСЛЕ ВЫПОЛНЕНИЯ УДАЛИТЬ КОММЕНТЫ /////

// async function markup() { 
//     try {
//         const collection = await fetchThemoviedCountries();

//         console.log(collection);
//     } catch (error){
//         console.error(error);
//     }
// }

// markup();