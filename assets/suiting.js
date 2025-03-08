let suitingPhotos = new Flickity( '.suiting-photos', {
  cellSelector: '.suiting-photo',
  wrapAround: true,
  imagesLoaded: true,
  pageDots: true,
  prevNextButtons: false,
  autoPlay: 3000, 
  cellAlign: 'center',
  draggable: false,
  fade: true,
});

suitingPhotos.on('staticClick', function (event, pointer, cellElement, cellIndex) {
  suitingPhotos.next();
});

let suitingCollection = new Flickity('.hp-features__features', {
  cellSelector: '.hp-features__feature',
  wrapAround: true,
  imagesLoaded: true,
  pageDots: false,
  prevNextButtons: true,
  autoPlay: false,
  cellAlign: 'center',
  draggable: false,
  watchCSS: true,
});
