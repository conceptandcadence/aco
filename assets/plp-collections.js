if ( $('.plp-item__collection-products.carousel-enabled').length > 0 ) {
    $(window).load(function(){
        $('.plp-item__collection-products.carousel-enabled').flickity({
            cellSelector: '.plp-item__collection-products.carousel-enabled .plp-item',
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
}