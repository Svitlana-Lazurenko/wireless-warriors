function makeStarsMarkup(rating, newClass) {
  const ratingValue = `clip-path: inset(0 ${getRemainingPercent(rating)}% 0 0)`;

  return `<div class="stars ${newClass}">
  <svg class="stars__icon--field" style = "${ratingValue}">
    <use xlink:href="#star-filled"></use></svg
  ><svg class=" stars__icon--empty">
    <use xlink:href="#star-empty"></use>
  </svg>
</div>`;
}

function getRemainingPercent(value) {
  return (10 - value) * 10;
}

export { makeStarsMarkup };
