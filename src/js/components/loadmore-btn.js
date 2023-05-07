export default class LoadMoreBtn {
  constructor({ selector, isHidden = true }) {
    this.button = this.getButton(selector);
  }

  getButton(selector) {
    return document.querySelector(selector);
  }

  disable() {
    this.button.disabled = true;
    this.button.textContent = 'Loading...';
  }

  enable() {
    this.button.disabled = false;
    this.button.textContent = 'Load more';
  }

  hide() {
    this.button.classList.add('hidden');
  }

  show() {
    this.button.classList.remove('hidden');
  }
}

// треба прописати імпорт і додати цей код до бібіліотеки і прописати клас hidden в html до кнопки

// const loadMoreBtn = new LoadMoreBtn({
//   selector: '.load-more',
//   isHidden: true,
// });

// loadMoreBtn.button.addEventListener('click', fetchMovies);

// async function fetchMovies() {
//   try {
//     тут треба зробити апі запит і рендер розмітки
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }
