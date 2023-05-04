import { BASE_THEMOVIEDB_URL, apiKey } from "../tmdb-api";
import axios from "axios";

async function fetchThemoviedbMonth() {
    const response = await axios(`${BASE_THEMOVIEDB_URL}/movie/upcoming?api_key=${apiKey}`)
    const newCollection = await response.data;

    return newCollection;
}

export { fetchThemoviedbMonth };


//////// ВЫБРАТЬ ЛЮБОЙ ЭЛЕМЕНТ МАССИВА И ОТРИСОВАТЬ ФИЛЬМ МЕСЯЦА ////

//////// ПОСЛЕ ВЫПОЛНЕНИЯ УДАЛИТЬ КОММЕНТЫ /////

// async function markup() { 
//     try {
//         const collection = await fetchThemoviedbMonth();

//         console.log(collection.results);
//     } catch (error){
//         console.error(error);
//     }
// }

// markup();