export const STORAGE_KEY_LIBRARY = 'myLibrary';
export const STORAGE_KEY_THEME = 'whiteTheme';

export const save = (key, value) => {
  // try {
  //   const data = JSON.stringify(value);
  //   localStorage.setItem(key, data);
  // } catch (err) {
  //   console.error('Stringify error', err.message);
  // }
  try {
    const storage = load(key);
    const filmCurrent = JSON.parse(value);
    const filmIncluded = storage.find(film => film.id === filmCurrent.id);
    if (storage.length === 0 || !filmIncluded) {
      storage.push(filmCurrent);
    }

    localStorage.setItem(key, JSON.stringify(storage));
  } catch (err) {
    console.error('Set state error: ', err.message);
  }
};

export const load = key => {
  try {
    const data = localStorage.getItem(key);
    return data === null ? undefined : JSON.parse(data);
  } catch (err) {
    console.error('Parse error', err.message);
  }
};

//
export const removeStore = key => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Get state error: ', err.message);
  }
};
