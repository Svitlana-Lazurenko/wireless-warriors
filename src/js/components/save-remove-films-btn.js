import { BASE_THEMOVIEDB_URL, apiKey } from '../tmdb-api';
import { STORAGE_KEY_LIBRARY } from '../components/storage';
import { movieInfo } from '../fetching and rendering/film-info';

// const STORAGE_KEY_LIBRARY = 'myLibrary';

function saveToLibrary() {
  const currentLocalStorageContent = JSON.parse(
    localStorage.getItem(STORAGE_KEY_LIBRARY)
  );
  const filmId = document.querySelector('.js-modal-card img').dataset.id;
  const libraryArray = [];

  if (currentLocalStorageContent) {
    const filmIncluded = currentLocalStorageContent.find(
      filmData => filmData.id === movieInfo.id
    );
    if (!filmIncluded) {
      currentLocalStorageContent.push(movieInfo);
      localStorage.setItem(
        STORAGE_KEY_LIBRARY,
        JSON.stringify(currentLocalStorageContent)
      );
    }
    {
      return;
    }
  } else {
    libraryArray.push(movieInfo);
    localStorage.setItem(STORAGE_KEY_LIBRARY, JSON.stringify(libraryArray));
  }
}

export default function addEventListenersOnButtons() {
  const libraryButton = document.querySelector('.js-add-library-btn');
  libraryButton.blur();

  if (checkInLibraryStore()) {
    libraryButton.textContent = 'Remove from library';
  } else {
    libraryButton.textContent = 'Add to library';
  }
  libraryButton.addEventListener('click', onLibraryModalButton);
}

function checkInLibraryStore() {
  const currentLocalStorageContent = JSON.parse(
    localStorage.getItem(STORAGE_KEY_LIBRARY)
  );
  const filmId = document.querySelector('.js-modal-card img').dataset.id;
  const libraryArray = [];

  if (currentLocalStorageContent) {
    const filmIncluded = currentLocalStorageContent.find(
      filmData => filmData.id === movieInfo.id
    );
    return filmIncluded;
  } else {
    return false;
  }
}

function onLibraryModalButton(event) {
  const currentButton = event.currentTarget.textContent;

  if (currentButton === 'Add to library') {
    saveToLibrary();
    event.currentTarget.textContent = 'Remove from library';
    event.currentTarget.setAttribute('class', 'js-add-library-btn');
    event.currentTarget.blur();
  } else {
    removeFromLibrary();
    event.currentTarget.textContent = 'Add to library';
    event.currentTarget.setAttribute(
      'class',
      'modal-card__library-btn js-add-library-btn'
    );
    event.currentTarget.blur();
  }
}

function removeFromLibrary() {
  const filmId = document.querySelector('.js-modal-card img').dataset.id;
  const films = localStorage.getItem('myLibrary');
  const parsedFilms = JSON.parse(films);

  const indexOfTheFilm = parsedFilms.findIndex(film => `${film.id}` === filmId);

  parsedFilms.splice(indexOfTheFilm, 1);

  localStorage.setItem('myLibrary', JSON.stringify(parsedFilms));
}
