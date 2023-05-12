import axios from 'axios';
import { BASE_THEMOVIEDB_URL, apiKey } from '../tmdb-api';
import { save, load } from './storage';
import { fetchThemoviedID, createObj, MY_LIBRARY_KEY} from './upadateStorage';

if(!document.location.href.includes('catalog.html') && !document.location.href.includes('my-library')) {
    const section = document.querySelector('.remideMy');
    let btn = null;
    section.addEventListener('click', addToMyLibrary); 

    async function addToMyLibrary (e) {
        if(e.target.classList.contains('upcoming-soon_button')) {
            btn = e.target;
            const filmID = e.target.dataset.id;
            try {
                const film = await fetchThemoviedID(filmID);
                addFilmToMyStorage(film, btn);
            } catch (error) {
                console.error(error);
            }
        }
    }

    function addFilmToMyStorage(film) {
        const currentState = load(MY_LIBRARY_KEY);
        if (currentState === undefined) {
            const array = [createObj(film)];
            save(MY_LIBRARY_KEY, array);
            btn.textContent = 'Remove to library';
        } else {
            if(currentState.some(({ID}) => ID == createObj(film).ID)) {
                btn.textContent = 'Remove to library';
                const updateArrayMyLibrary = load(MY_LIBRARY_KEY).filter(({ID}) => ID != createObj(film).ID);
                localStorage.clear();
                save(MY_LIBRARY_KEY, updateArrayMyLibrary);
                btn.textContent = 'Remind my';
            if(document.location.href.includes('my-library')) {
                location.reload();
            }
            } else {
                btn.textContent = 'Remind my';
                currentState.push(createObj(film));
                save(MY_LIBRARY_KEY, currentState);
                btn.textContent = 'Remove to library';
            }
        }
    }    
}
