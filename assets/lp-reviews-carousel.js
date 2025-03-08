
let lpReviews = document.querySelector('.lp-reviews-carousel__reviews');
let lpReviewsDesktopCount = lpReviews.dataset.cellCount;
let lpReviewsCarousel;

$(document).ready(function(){
  lpReviewsCarousel = new Flickity( lpReviews, {
      cellSelector: '.lp-reviews-carousel__review',
      wrapAround: true,
      imagesLoaded: true,
      pageDots: false,
      groupCells: false,
      prevNextButtons: true,
      cellAlign: 'center',
      arrowShape: { 
          x0: 10,
          x1: 60, y1: 50,
          x2: 65, y2: 45,
          x3: 20
      }
  });
  lpReviewsCarousel.resize();
});

$(window).load(function(){
  lpReviewsCarousel.resize();
});