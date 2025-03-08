
let hpPress = document.querySelector('.hp-press-carousel__quotes');
let hpPressCarousel;

$(document).ready(function(){
  hpPressCarousel = new Flickity( hpPress, {
      cellSelector: '.hp-press-carousel__quote',
			wrapAround: true,
      imagesLoaded: true,
      pageDots: false,
      groupCells: false,
      prevNextButtons: true,
      autoplay: false,
      cellAlign: 'center',
			
      arrowShape: { 
          x0: 10,
          x1: 60, y1: 50,
          x2: 65, y2: 45,
          x3: 20
      }
  }); 
});

$(window).load(function(){
  hpPressCarousel.resize();
});