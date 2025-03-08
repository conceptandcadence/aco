
let featuredReviews = document.querySelector('.featured-reviews');
let featuredReviewsCarousel;

if (document.querySelectorAll('.featured-review').length > 1) {
    $(window).load(function(){
        $('.featured-review').each(function () {
            $(this).width( $(this).width() );
            $(this).height( $(this).height() );
        });
        $(window).resize( function(){
            $(this).width( $(this).width() );
            $(this).height( $(this).height() );
        });
        featuredReviewsCarousel = new Flickity( featuredReviews, {
            cellSelector: '.featured-review',
            wrapAround: true,
            imagesLoaded: true,
            pageDots: false,
            lazyLoad: false,
            groupCells: false,
            prevNextButtons: true,
            cellAlign: 'center',
            autoPlay: 4000,
            arrowShape: { 
                x0: 10,
                x1: 60, y1: 50,
                x2: 70, y2: 40,
                x3: 30
            }
        });
    });
}
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