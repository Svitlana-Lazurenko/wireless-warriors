function changingSizeElement() {
  const contentBoxRef = document.querySelectorAll('.hero__content');

  for (const box of contentBoxRef) {
    const totalBlockHeight = box.offsetHeight;
    let count = 0;
    let dynamicElement = null;

    for (const element of box.children) {
      if (element.tagName === 'P') {
        dynamicElement = element;
        continue;
      }
      const elementMargin = parseInt(getComputedStyle(element).marginBottom);
      count += element.offsetHeight + elementMargin;
    }
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
