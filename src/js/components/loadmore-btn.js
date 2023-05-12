
// const liEls = document.querySelectorAll('.movie__card');

// export default class LoadMoreBtn {
//   constructor({ selector, isHidden = true }) {
//     this.button = this.getButton(selector);
//   }

//   getButton(selector) {
//     return document.querySelector('.load-more');
//   }

//   disable() {
//     this.button.disabled = true;
//     this.button.textContent = 'Loading...';
//   }

//   enable() {
//     this.button.disabled = false;
//     this.button.textContent = 'Load more';
//   }

//   hide() {
//     this.button.classList.add('hidden');
//   }

//   show() {
//     this.button.classList.remove('hidden');
//   }

//   checkVisibility(liEls) {
//     if (liEls.length >= 10) {
//       this.show();
//     } else if (liEls.length < 10) {
//       this.hide();
//     }
//   }
// }

// const loadMoreBtn = new LoadMoreBtn({
//   selector: '.load-more',
//   isHidden: true,
// });

// // Після завантаження фільмів на сторінці

// loadMoreBtn.checkVisibility(liEls);
