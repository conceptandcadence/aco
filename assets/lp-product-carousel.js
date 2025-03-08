console.log('OKOKOKOK');
let lpProducts = document.querySelector('.carousel-enabled.lp-product-carousel__products'); 
let lpProductsDesktopCount = lpProducts.dataset.cellCount;
let lpProductsCarousel;

$(document).ready(function(){
    if (lpProducts) {

        document.querySelectorAll('.lp-product-carousel__product .lp-product-carousel__colorway:first-child').forEach((product, i) => {
            product.classList.add('active');
        });

        document.querySelectorAll('.carousel-enabled.lp-product-carousel__products').forEach((carousel, i) => {
            console.log(carousel, i);
        });
        
        if (window.innerWidth >= 700) {
            lpProductsCarousel = new Flickity( lpProducts, {
                cellSelector: '.lp-product-carousel__product',
                wrapAround: $('.lp-product-carousel').hasClass('wrap-around'), 
                cellAlign: 'left',
                imagesLoaded: true,
                pageDots: false,
                groupCells: $('.lp-product-carousel').hasClass('group-cells'),
                prevNextButtons: true,
                arrowShape: { 
                    x0: 10,
                    x1: 60, y1: 50,
                    x2: 65, y2: 45,
                    x3: 20
                }
            });
        } else {
            lpProductsCarousel = new Flickity( lpProducts, {
                cellSelector: '.lp-product-carousel__product',
                wrapAround: true,
                imagesLoaded: true,
                pageDots: false,
                groupCells: false,
                prevNextButtons: true,
                arrowShape: { 
                    x0: 10,
                    x1: 60, y1: 50,
                    x2: 65, y2: 45,
                    x3: 20
                }
            });
        }
        
        lpProductsCarousel.resize();
        $('.lp-product-carousel__variant').on('click', function (evt) {
            $(this).closest('.lp-product-carousel__product').attr('data-active-handle', $(this).data('handle') );
            $(this).closest('.lp-product-carousel__colorway').removeClass('active');
            $('.lp-product-carousel__colorway[data-product="' + $(this).data('handle') + '"]').addClass('active');
        });
    }
});

$(window).load(function(){
  lpProductsCarousel.resize();
});