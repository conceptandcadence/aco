if ( $('.sustainable-materials__featuredin-collections').length > 0 ) {
    $(window).load(function(){
        $('.sustainable-materials__featuredin-collections.carousel-enabled').flickity({
            cellSelector: '.sustainable-materials__featuredin-collection',
            wrapAround: true,
            imagesLoaded: true,
            pageDots: false,
            //lazyLoad: true,
            groupCells: false, 
            prevNextButtons: true,
            cellAlign: 'left',
            arrowShape: { 
                x0: 10,
                x1: 60, y1: 50,
                x2: 65, y2: 45,
                x3: 20
            }
        });
    });
}