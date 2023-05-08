function changingSizeElement() {
  const contentBoxRef = document.querySelectorAll('.hero__content');

  for (const box of contentBoxRef) {
    console.log(box);
    const totalBlockHeight = box.offsetHeight;
    let count = 0;
    let dynamicElement = null;
    console.log(`totalBlockHeight ${totalBlockHeight}`);

    for (const element of box.children) {
      console.log(box.children);
      if (element.tagName === 'P') {
        dynamicElement = element;
        continue;
      }
      const elementMargin = parseInt(getComputedStyle(element).marginBottom);
      count += element.offsetHeight + elementMargin;
      console.log(`elementMargin ${elementMargin}`);
      console.log(`element.offsetHeight ${element.offsetHeight}`);
    }
    console.log(` count ${count}`);
    const elementHeight = totalBlockHeight - count;
    if (elementHeight <= 0) {
      dynamicElement.style.display = 'none';
      continue;
    }
    dynamicElement.style.display = 'block';
    dynamicElement.style.height = `${elementHeight}px`;
  }
}

export { changingSizeElement };
