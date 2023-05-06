import { BASE_THEMOVIEDB_URL, apiKey } from "../tmdb-api";
import { ItcCustomSelect } from '../components/castom-select';
import axios from "axios";

async function fetchThemoviedbCountries() {
    const response = await axios(`${BASE_THEMOVIEDB_URL}/configuration/countries?api_key=${apiKey}`);
    const newCollection = await response.data;

    return newCollection;
}

async function selectCountriesAndMarkup () {
    try {
        const promis = await fetchThemoviedbCountries();
        const data = promis.map((data, index) => {
            return `<li class="itc-select__option" data-select="option" data-value="${data.english_name}" data-index="${index}">${data.english_name}</li>`
        }).join('');

        document.querySelector('.itc-select__countries').insertAdjacentHTML('beforeend', data);
        new ItcCustomSelect('#select-3');
        document.querySelector('.itc-select__toggle').disabled = false;
    } catch (error){
        console.error(error);
    }
}

selectCountriesAndMarkup();