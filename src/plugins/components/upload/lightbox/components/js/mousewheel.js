const toBind = ('onwheel' in document || document.documentMode >= 9) ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
const bindMouseWheel = (bindObj, fn) => {
  for (let i = toBind.length; i;) {
    bindObj.addEventListener(toBind[--i], fn, false);
  }
};
const unbindMouseWheel = (bindObj, fn) => {
  for (let i = toBind.length; i;) {
    bindObj.removeEventListener(toBind[--i], fn, false);
  }
};
export {bindMouseWheel, unbindMouseWheel};
