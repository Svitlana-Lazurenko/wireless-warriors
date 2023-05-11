function trailerModalNoData() {
  return `<p class="trailer-text">
  OOPS...<br />
  We are very sorry! <br />But we couldn’t find the trailer.
</p>
<img
  class="trailer-img"
  src="./images/trailer-modal/cinema.png"
  srcset="
    ./images/trailer-modal/cinema.png    1x,
    ./images/trailer-modal/cinema@2x.png 2x
  "
  alt="cinema simbols"
/>
`;
}
function trailModalVideo(key) {
  return `
<iframe 
    class="trailerFrame"
    width="100px"
    height="80px"
    src = "https://www.youtube.com/embed/${key}"
    frameborder="0"
  ></iframe>`;
}

export { trailerModalNoData, trailModalVideo };
