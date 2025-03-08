$("body").on('click', function (e) {
	console.log(e.target)
	//if () {
		//.shop-filters__toggle
	//}
  e.preventDefault();
  setTimeout(() => {
    if ($('.shop-filters__container').hasClass('plp-nav-expanded')) {
      $('.shop-filters__toggle').removeClass('open');
      $('.shop-filters__container').removeClass('plp-nav-expanded');
    } else {
      $('.shop-filters__toggle').addClass('open');
      $('.shop-filters__container').addClass('plp-nav-expanded');
    }
  }, 100);
}); 


$(".shop-filters__container").height( $(".shop-filters__container").height() );
$(".shop-filters__container").removeClass('plp-nav-expanded');
$(".shop-filters__container").removeClass('init');

$("#collection-nav .collection-nav").height($("#collection-nav .collection-nav").height());
$("#collection-nav .collection-nav").removeClass('plp-nav-expanded');
$("#collection-nav .collection-nav").removeClass('init');

$(window).resize(function () {

  $(".shop-filters__container").height('');
  $(".shop-filters__container").addClass('plp-nav-expanded');
  $(".shop-filters__container").addClass('init');
  $(".shop-filters__container").height($(".shop-filters__container").height());
  $(".shop-filters__container").removeClass('plp-nav-expanded');
  $(".shop-filters__container").removeClass('init');

  $("#collection-nav .collection-nav").height('');
  $("#collection-nav .collection-nav").addClass('plp-nav-expanded');
  $("#collection-nav .collection-nav").addClass('init');
  $("#collection-nav .collection-nav").height($("#collection-nav .collection-nav").height());
  $("#collection-nav .collection-nav").removeClass('plp-nav-expanded');
  $("#collection-nav .collection-nav").removeClass('init');

});


$(".collection-nav-mobile__item.shop").on('click', function (e) {
    e.preventDefault();
   
    if ($('#collection-nav .collection-nav').hasClass('plp-nav-expanded')) {
      // Close
      $(".collection-nav-mobile__item.shop").removeClass('plp-nav-expanded');
      $(".collection-nav-mobile__item.shop").removeClass('disabled');

      $(".collection-nav-mobile__item.filter").removeClass('disabled');
      $(".collection-nav-mobile__item.filter").removeClass('plp-nav-expanded');

      $('#collection-nav .collection-nav').removeClass('plp-nav-expanded');
      $('.shop-filters__container').removeClass('plp-nav-expanded');
      console.log('shop close');
    } else {
      // Open
      $(".collection-nav-mobile__item.shop").addClass('plp-nav-expanded');
      $(".collection-nav-mobile__item.shop").removeClass('disabled');

      $(".collection-nav-mobile__item.filter").addClass('disabled');
      $(".collection-nav-mobile__item.filter").removeClass('plp-nav-expanded');

      $('#collection-nav .collection-nav').addClass('plp-nav-expanded');
      $('.shop-filters__container').removeClass('plp-nav-expanded');
      console.log('shop open');
    }
});

$(".collection-nav-mobile__item.filter").on('click', function (e) {
  e.preventDefault();
  setTimeout(() => {
    
    if ($('.shop-filters__container').hasClass('plp-nav-expanded')) {
      // Close
      $(".collection-nav-mobile__item.shop").removeClass('plp-nav-expanded');
      $(".collection-nav-mobile__item.shop").removeClass('disabled');

      $(".collection-nav-mobile__item.filter").removeClass('disabled');
      $(".collection-nav-mobile__item.filter").removeClass('plp-nav-expanded');

      $('#collection-nav .collection-nav').removeClass('plp-nav-expanded');
      $('.shop-filters__container').removeClass('plp-nav-expanded');
      console.log('filter close');
    } else { 
      // Open
      $(".collection-nav-mobile__item.shop").addClass('disabled');
      $(".collection-nav-mobile__item.shop").removeClass('plp-nav-expanded');

      $(".collection-nav-mobile__item.filter").addClass('plp-nav-expanded');
      $(".collection-nav-mobile__item.filter").removeClass('disabled');

      $('#collection-nav .collection-nav').removeClass('plp-nav-expanded');
      $('.shop-filters__container').addClass('plp-nav-expanded');
      console.log('filter open');
    }
  }, 100);
});

/*
$(".collection-nav-mobile__item.filter").on('click', function (e) {
    e.preventDefault();
    if ($('.shop-filters').hasClass('plp-nav-expanded')) {
        $('#collection-nav').removeClass('plp-nav-expanded');
        $('.shop-filters').removeClass('plp-nav-expanded');
        $('.shop-filter-group').removeClass('plp-nav-expanded');
        $('#collection-nav .collection-nav').removeClass('plp-nav-expanded');
        $('.collection-nav-mobile__item').removeClass('plp-nav-expanded');
        $(".collection-nav-mobile__item").removeClass('disabled');
        $(".collection-nav-mobile__item.filter").removeClass('disabled');
        console.log('Filter A');
    } else {
        $('.collection-nav-mobile__item').removeClass('plp-nav-expanded');
        $('#collection-nav .collection-nav').removeClass('plp-nav-expanded');
        $(".collection-nav-mobile__item").removeClass('disabled');
        $(".collection-nav-mobile__item.shop").addClass('disabled');
        $('.shop-filter-group').addClass('plp-nav-expanded');
        $(this).closest('.collection-nav-mobile__item').addClass('plp-nav-expanded');
        $('.shop-filters').addClass('plp-nav-expanded');
        $('#collection-nav').addClass('plp-nav-expanded');
        console.log('Filter B');
    }
});

$(".shop-filter-toggle").on('click', function (e) {
    e.preventDefault();
    let filter = $(this).data('filter').replace(']','').replace('#','').replace("'",'').replace('[data-material-','material=').replace('[data-size-','size=').replace('[data-colorway-','color='); //data-filter="[data-material='european-linen']"
    let activeFIlters = window.location.search;
    let newURL = window.location.pathname + '?' + filter;
    alert(filter);
    window.location.href = newURL;
});
*/

