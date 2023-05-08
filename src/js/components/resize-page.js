import { changingSizeElement } from './dynamic-resizing';

class ResizePage {
  constructor(screenWidth) {
    this.previousScreenWidth = screenWidth;
    this.currentMode = this.getMode(screenWidth);
    console.log(this.previousScreenWidth, this.currentMode);
  }
  getMode(screenWidth) {
    // if (screenWidth < 768) {
    //   return 'mobile';
    // } else if (screenWidth < 1280) {
    //   return 'tablet';
    // } else {
    //   return 'desktop';
    // }

    if (screenWidth < 400) {
      return 'small-mobile';
    } else if (screenWidth < 768) {
      return 'mobile';
    } else if (screenWidth < 1280) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }
  handleResize() {
    const screenWidth = window.innerWidth;
    const newMode = this.getMode(screenWidth);

    if (this.currentMode === newMode) return;

    changingSizeElement();

    this.previousScreenWidth = screenWidth;
    this.currentMode = newMode;
  }
}

export { ResizePage };
