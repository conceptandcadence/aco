let hpCollections = document.querySelector('.hp-collections__features.carousel');
let hpCollectionsDesktopCount = hpCollections.dataset.cellCount;
let hpCollectionsCarousel;

$(document).ready(function(){
  hpCollectionsCarousel = new Flickity( hpCollections, {
      cellSelector: '.hp-collections__feature',
      wrapAround: true,
      imagesLoaded: true,
      pageDots: false,
      groupCells: true,
      prevNextButtons: false,
      autoplay: 3000,
      cellAlign: 'center',
      arrowShape: { 
          x0: 10,
          x1: 60, y1: 50,
          x2: 65, y2: 45,
          x3: 20
      }
  });
});