import { ApiThemoviedb } from '../fetching and rendering/film-of-the-day';
import { createMarkup } from '../fetching and rendering/hero-create-markup';
import { initSwiper } from './slider';

const apiThemoviedb = new ApiThemoviedb();

const sliderWrapRef = document.querySelector('.hero__wrap');

getApiData();

async function getApiData() {
  try {
    const response = await apiThemoviedb.getRequestData();
    addMarkup(response.data.results);
  } catch (error) {
    console.log(error);
  }
}

function addMarkup(data) {
  const markup = createMarkup(data.slice(0, 5));
  sliderWrapRef.insertAdjacentHTML('beforeend', markup);
  initSwiper();
}

// async function test() {
//   const value = await api.getRequestData();
//   console.log(value.data.results[2]);
//   const id = value.data.results[2].id;
//   console.log(id);
//   const value2 = await api.getRequestVideos(id);

//   const keyVideo = value2.data.results.find(
//     result => result.type === 'Trailer' && result.name === 'Official Trailer'
//   ).key;

//   console.log(keyVideo);
//   linkRef.href = `https://www.youtube.com/watch?v=${keyVideo}`;
// }

// test();
