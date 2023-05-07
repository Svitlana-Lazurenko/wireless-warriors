import * as tmdbApi from './tmdb-api';
import * as pagination from './pagination';

import * as filmInfo from './fetching and rendering/film-info';
import * as filmOfTheDay from './fetching and rendering/film-of-the-day';
import * as filmOfTheMonth from './fetching and rendering/film-of-the-month';
import * as filmTrailer from './fetching and rendering/film-trailer';
import * as filmsBySearch from './fetching and rendering/films-by-search';
import * as filmsOfTheWeek from './fetching and rendering/films-of-the-week';
import * as savedFilms from './fetching and rendering/saved-films';
import * as filmCounties from './fetching and rendering/film-countries';
import * as filmsOfTheWeek from './fetching and rendering/upcoming-this-month';
import * as savedFilms from './fetching and rendering/weekly-trends';

import * as hero from './components/hero';

import * as loader from './components/loader';
import * as loadmoreBtn from './components/loadmore-btn';
import * as mobileMenu from './components/mobile-menu-open-close';
import * as modals from './components/modals-open-close';
import * as saveRemoveFilmsBtn from './components/save-remove-films-btn';
import * as scrollUp from './components/scroll-up';
import * as slider from './components/slider';
import * as switcherBtn from './components/switcher-btn';
import * as animateBtnChahgeTheme from './components/change-theme';
import * as yearsSelect from './components/years-select';

// ========= USING LIBRARIES=================================

// ========AXIOS=================
// import axios from "axios";
// axios.get('/users')
//   .then(res => {
//     console.log(res.data);
//   });
// const axios = require('axios/dist/node/axios.cjs');

// ========LODASH DEBOUNCE============
// var debounce = require('lodash.debounce');

// ==========NOTIFLIX===============
// https://github.com/notiflix/Notiflix#readme

// =========LAZYSIZES===============
// https://www.npmjs.com/package/lazysizes

// =========SWIPER===============
// https://swiperjs.com/get-started

// =========TUI PAGINATION========
// https://www.npmjs.com/package/tui-pagination

// =========AXIOS MOCK ADAPTER=============
// https://github.com/ctimmerm/axios-mock-adapter#readme
