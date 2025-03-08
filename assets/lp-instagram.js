let $instagramCarousel;
let instagramFeedTimer;

function runInstagramFeedCheck() {
  instagramFeedTimer = setTimeout(function () {
    if ($('#insta-feed').children.length > 0) {
      clearInstagramFeedCheck();
      $('#insta-feed > a').addClass('ig_slide');
      $('#insta-feed img.js-lazy-image').each(function () {
        if ($(this).attr('src') === '//instafeed.nfcube.com/assets/img/placeholder.gif') {
          $(this).attr('src', $(this).data('src'));
          console.log($(this).attr( 'src') + 'Swapped Out');
        } else {
          console.log($(this).attr( 'src') + 'Already Loaded');
        }
      });
      $('#insta-feed > a').clone().appendTo('#insta-feed');
      $instagramCarousel = $('.instagram-group').flickity({
        "wrapAround": true,
        "imagesLoaded": true,
        "pageDots": false,
        "prevNextButtons": false,
        "cellAlign": "center",
        "cellSelector": 'a',
        "autoPlay": false,
        "watchCSS": false
      });
      $('section.instagram').removeClass('init');
    } else
      runInstagramFeedCheck();
  }, 500);
}

function clearInstagramFeedCheck() {
  clearTimeout(instagramFeedTimer);
}
$(window).on('load', function () {
  runInstagramFeedCheck();
});