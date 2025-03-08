let shoppableLooksCarousels = [];
$(document).ready(function(){
  let shoppableLooks = document.querySelectorAll('.shoppable-look');
  if (shoppableLooks.length > 0) {
    shoppableLooks.forEach(function (shoppableLook) {
      if (shoppableLook) {
        let id = `${shoppableLook.dataset.id}`;
        shoppableLooksCarousels[id] = $(`.shoppable-look[data-id="${id}"] .shoppable-look__modal-products`).flickity({
          cellSelector: '.plp-item',
          wrapAround: true,
          watchCSS: false,
          imagesLoaded: true, 
          pageDots: false, 
          prevNextButtons: true, 
          adaptiveHeight: false,
          dragThreshold: 10,
          touchVerticalScroll: true,
          cellAlign: 'left',
          arrowShape: { 
            x0: 10,
            x1: 60, y1: 50,
            x2: 65, y2: 45,
            x3: 20
          }
        });
      }
    });
  }
});

$('.shoppable-look__pin').on('click', function(){
  let $shoppableLook = $(this).closest('.shoppable-look');
  let $modal = $shoppableLook.find('.shoppable-look__modal');
  let id = `${$shoppableLook.data('id')}`;
  shoppableLooksCarousels[id].flickity( 'selectCell', $(this).data('index'), true, true );
  shoppableLooksCarousels[id].flickity('resize');
  $($modal).addClass('active');
});

$('.shoppable-look__button').on('click', function(){
  let $shoppableLook = $(this).closest('.shoppable-look');
  let $modal = $shoppableLook.find('.shoppable-look__modal');
  let id = `${$shoppableLook.data('id')}`;
  shoppableLooksCarousels[id].flickity('resize');

  if ( $($modal).hasClass('active') ) {
    $($modal).removeClass('active')
  } else {
    $($modal).addClass('active')
  }
});

$('.shoppable-look__modal-close, .shoppable-look__modal-background').on('click', function(){
  let $modal = $(this).closest('.shoppable-look__modal');
  $($modal).removeClass('active')
});

/*
$('body').on('click', '.reviews-overview__toggle', function(){
    $('.yotpo-main-widget').addClass('expanded');
    $('.yotpo-review-container').addClass('expanded');
    $('.reviews-overview').remove();
});
$('body').on('click', '.reviews-write__toggle', function(){
    $('.yotpo-main-widget').addClass('expanded');
    $('.yotpo-review-container').addClass('expanded');
    $('.reviews-overview').remove();
    $('.no-reviews-yet').remove();
    $('.write-review-button').click();
});
*/