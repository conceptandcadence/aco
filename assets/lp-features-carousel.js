
let lpFeatures = document.querySelector('.lp-features-carousel__features');
let lpFeaturesCarousel;

$(window).load(function(){
  lpFeaturesCarousel = new Flickity( lpFeatures, {
      cellSelector: '.lp-features-carousel__feature',
      wrapAround: true,
      imagesLoaded: true,
      pageDots: false,
      lazyLoad: true,
      groupCells: true,
      prevNextButtons: true,
      cellAlign: 'center',
      arrowShape: { 
          x0: 10,
          x1: 60, y1: 50,
          x2: 65, y2: 45,
          x3: 20
      }
  });
});