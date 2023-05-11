import { Spinner } from 'spin.js';

const opts = {
  lines: 11,
  length: 54,
  width: 12,
  radius: 69,
  scale: 0.55,
  corners: 1,
  speed: 1,
  rotate: 0,
  animation: 'spinner-line-shrink',
  direction: 1,
  color: 'orange',
  fadeColor: 'transparent',
  top: '51%',
  left: '50%',
  shadow: '0 0 2px transparent',
  zIndex: 2000000000,
  className: 'spinner',
  position: 'absolute',
};

const targetList = document.querySelectorAll('#spinner');
const spinner = new Spinner(opts);

targetList.forEach(target => {
  spinner.spin(target);
});

//* Потрібно внести наш url, коли буде кістяк, щоб протестувати!
// const API_URL = "https://api.themoviedb.org/3/movie";
// const apiKey = 'df4f25ddce476816dc7867d9ac4bd1ea';
// function makeRequest(API_URL) {
//     spinner.spin(document.body);
//     axios.get(API_URL)
//       .then(response => {
//         spinner.stop();
//         console.log(response.data);
//       })
//       .catch(error => {
//         spinner.stop();
//         console.log(error);
//       });
//   }
