
let lpPress = document.querySelector('.lp-press-carousel__quotes');
let lpPressDesktopCount = lpPress.dataset.cellCount;
let lpPressCarousel;

$(document).ready(function(){
  lpPressCarousel = new Flickity( lpPress, {
      cellSelector: '.lp-press-carousel__quote',
      wrapAround: true,
      imagesLoaded: true,
      pageDots: false,
      groupCells: true,
      prevNextButtons: true,
      cellAlign: 'center',
      autoPlay: 4000,
      arrowShape: { 
          x0: 10,
          x1: 60, y1: 50,
          x2: 65, y2: 45,
          x3: 20
      }
  });
});