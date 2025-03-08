// VWO -- IC: Collection page - Filters- All devices -- 07/19/2022 

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (timeOutFn) {
    return setTimeout(timeOutFn, 1000 / 60);
}; 
window['v2_c4854_j4234'] = function () {
    if (typeof jQuery == 'function' && typeof Isotope == 'function' && document.querySelectorAll('.shop-filters__toggle').length) {
        document.body.classList.add('v2_c4854_j4234');
        jQuery(document).ready(function () {
            //applychanges4854v2();
        });
        console.log('Main Function Running. (v2_c4854_j4234)');
    } else if (!document.getElementsByClassName('v2_c4854_j4234').length) {
        window.requestAnimationFrame(v2_c4854_j4234);
    }
};
v2_c4854_j4234();

function applychanges4854v2() {
    var setInter = setInterval(function () {
        if (!document.querySelectorAll('.vwoSidebar').length && document.querySelectorAll('.shop-filters__toggle').length) {
            var html = `
<div class="vwoSidebar">
</div>
`;
            var mobhtml = `
<div class="vwoSidebar">
</div>
`;
            jQuery('.collection-wrapper #shop-container').wrap('<div class="vwoContainer"></div>');
            jQuery('.collection-wrapper #shop-container').before(html);
            jQuery('.shop-filters').clone(true).appendTo('.vwoSidebar');

            jQuery(window).on("scroll resize", function () {
                if (jQuery(window).width() > 699) {
                    makeFiltersSticky4854v2();
                } else {
                    jQuery('.sidebar-main').find('> .block').removeAttr("style");
                }
            });
            jQuery(window).scroll();


            /*Ammends to make Tags as filter*/
            jQuery('.product-list .product').each(function () {
                if (jQuery(this).find('.product-list--title:contains(Sweater)').length) {
                    jQuery(this).attr('data-style', 'Sweater');
                } else if (jQuery(this).find('.product-list--title:contains(Shorts)').length) {
                    jQuery(this).attr('data-style', 'Shorts');
                } else if (jQuery(this).find('.product-list--title:contains(Pants)').length) {
                    jQuery(this).attr('data-style', 'Pants')
                } else if (jQuery(this).find('.product-list--title:contains(Shirt)').length) {
                    jQuery(this).attr('data-style', 'Shirt');
                } else if (jQuery(this).find('.product-list--title:contains(Jacket)').length) {
                    jQuery(this).attr('data-style', 'Jacket');
                } else if (jQuery(this).find('.product-list--title:contains(Tee)').length) {
                    jQuery(this).attr('data-style', 'Tees');
                } else if (jQuery(this).find('.product-list--title:contains(Sandals)').length || jQuery(this).find('.product-list--title:contains(Belt)').length || jQuery(this).find('.product-list--title:contains(Cap)').length) {
                    jQuery(this).attr('data-style', 'Accessories');
                }
            })




            if (window.location.pathname.indexOf('/collections/shop') > -1 || window.location.pathname.indexOf('/collections/new') > -1 || window.location.pathname.indexOf('/collections/bestsellers') > -1 || window.location.pathname.indexOf('/collections/gifting') > -1 || window.location.pathname.indexOf('/collections/women') > -1 || window.location.pathname.indexOf('/collections/kids') > -1 || window.location.pathname.indexOf('/collections/sale') > -1) {
                /*For Desktop*/
                jQuery('#collection-nav .site-subnav-categories.primary .site-subnav__item').each(function () {
                    if (jQuery(this).find('a[href*="collections/sweater"]').length) {
                        //jQuery(this).find('a').attr('href','javascript:void(0)');
                        jQuery(this).find('a').attr("data-filter", "[data-style='Sweater']");
                        jQuery(this).find('a').attr('class', 'vwoPrimaryLink');
                    } else if (jQuery(this).find('a[href*="collections/bo-shorts"]').length) {
                        //jQuery(this).find('a').attr('href','javascript:void(0)'); 
                        jQuery(this).find('a').attr("data-filter", "[data-style='Shorts']");
                        jQuery(this).find('a').attr('class', 'vwoPrimaryLink');
                    } else if (jQuery(this).find('a[href*="collections/pants"]').length) {
                        //jQuery(this).find('a').attr('href','javascript:void(0)');
                        jQuery(this).find('a').attr("data-filter", "[data-style='Pants']");
                        jQuery(this).find('a').attr('class', 'vwoPrimaryLink');
                    } else if (jQuery(this).find('a[href*="collections/shirts"]').length) {
                        //jQuery(this).find('a').attr('href','javascript:void(0)');
                        jQuery(this).find('a').attr("data-filter", "[data-style='Shirt']");
                        jQuery(this).find('a').attr('class', 'vwoPrimaryLink');
                    } else if (jQuery(this).find('a[href*="collections/jackets"]').length) {
                        //jQuery(this).find('a').attr('href','javascript:void(0)');
                        jQuery(this).find('a').attr("data-filter", "[data-style='Jacket']");
                        jQuery(this).find('a').attr('class', 'vwoPrimaryLink');
                    } else if (jQuery(this).find('a[href*="collections/tees"]').length) {
                        //jQuery(this).find('a').attr('href','javascript:void(0)');
                        jQuery(this).find('a').attr("data-filter", "[data-style='Tees']");
                        jQuery(this).find('a').attr('class', 'vwoPrimaryLink');
                    } else if (jQuery(this).find('a[href*="collections/accessories"]').length) {
                        //jQuery(this).find('a').attr('href','javascript:void(0)');
                        jQuery(this).find('a').attr("data-filter", "[data-style='Accessories']");
                        jQuery(this).find('a').attr('class', 'vwoPrimaryLink');
                    }
                });

                jQuery('.vwoSidebar  .shop-filters__wrapper .shop-filter-title.fabrics').eq(0).clone(true).addClass('styles').removeClass('fabrics').prependTo(jQuery('.vwoSidebar  .shop-filters__wrapper .shop-filter-title.fabrics').parent());
                jQuery('.vwoSidebar  .shop-filters__wrapper .shop-filter-group.fabrics').eq(0).clone(true).addClass('styles').removeClass('fabrics').insertAfter(jQuery('.vwoSidebar  .shop-filters__wrapper .shop-filter-title.styles').eq(0));
                jQuery('.vwoSidebar   .shop-filters__wrapper .shop-filter-title.styles').html(jQuery('.vwoSidebar .shop-filters__wrapper .shop-filter-title.styles').html().replace('Fabric', 'Styles'))
                jQuery('.vwoSidebar .shop-filters__wrapper .shop-filter-group.styles li').eq(4).clone(true).insertAfter(jQuery('.vwoSidebar  .shop-filters__wrapper .shop-filter-group.styles li').eq(4));
                jQuery('.vwoSidebar  .shop-filters__wrapper .shop-filter-group.styles li').eq(5).clone(true).insertAfter(jQuery('.vwoSidebar  .shop-filters__wrapper .shop-filter-group.styles li').eq(5));
                jQuery('.vwoSidebar  .shop-filters__wrapper .shop-filter-group.styles li').eq(6).clone(true).insertAfter(jQuery('.vwoSidebar  .shop-filters__wrapper .shop-filter-group.styles li').eq(6));
                jQuery('.vwoSidebar  .shop-filters__wrapper .shop-filter-group.styles li').eq(0).hide();

                jQuery('.vwoSidebar  .shop-filters__wrapper .shop-filter-group.styles li').eq(0).find('a').attr({
                    'href': '/collections/shop'
                }).text('All');
                jQuery('.vwoSidebar  .shop-filters__wrapper .shop-filter-group.styles li').eq(1).find('a').attr({
                    'href': 'https://alexcrane.co/collections/sweaters',
                    'data-filter': '[data-style=\'Sweater\']'
                }).text('Sweaters');
                jQuery('.vwoSidebar  .shop-filters__wrapper .shop-filter-group.styles li').eq(2).find('a').attr({
                    'href': '/collections/bo-shorts',
                    'data-filter': '[data-style=\'Shorts\']'
                }).text('Shorts');
                jQuery('.vwoSidebar  .shop-filters__wrapper .shop-filter-group.styles li').eq(3).find('a').attr({
                    'href': '/collections/pants',
                    'data-filter': '[data-style=\'Pants\']'
                }).text('Pants');
                jQuery('.vwoSidebar  .shop-filters__wrapper .shop-filter-group.styles li').eq(4).find('a').attr({
                    'href': '/collections/shirts',
                    'data-filter': '[data-style=\'Shirt\']'
                }).text('Shirts');
                jQuery('.vwoSidebar  .shop-filters__wrapper .shop-filter-group.styles li').eq(5).find('a').attr({
                    'href': '/collections/jackets',
                    'data-filter': '[data-style=\'Jacket\']'
                }).text('Jackets');
                jQuery('.vwoSidebar  .shop-filters__wrapper .shop-filter-group.styles li').eq(6).find('a').attr({
                    'href': '/collections/tees',
                    'data-filter': '[data-style=\'Tees\']'
                }).text('Tees');
                jQuery('.vwoSidebar .shop-filters__wrapper .shop-filter-group.styles li').eq(7).find('a').attr({
                    'href': '/collections/accessories',
                    'data-filter': '[data-style=\'Accessories\']'
                }).text('Accessories');

                //jQuery('.vwoSidebar .shop-filter-group.fabrics.styles > li').appendTo('.vwoSidebar .shop-filter-group.fabrics');

                jQuery(".shop-filter-toggle").off('click');
                jQuery(".vwoSidebar .shop-filter-toggle, .vwoSticky .shop-filter-toggle").on('click', function (e) {
                    e.preventDefault();
                    if (jQuery(this).closest('.shop-filter-item').hasClass('active')) {
                        // Clicked already selected option
                        jQuery(this).closest('.shop-filter-item').removeClass('active');
                        if (jQuery('.shop-filter-item.active').length > 0) {
                            jQuery('.shop-filters__clear').addClass('filter-active');
                        } else {
                            jQuery('.shop-filters__clear').removeClass('filter-active');
                        }
                    } else {
                        // Clicked unselected option
                        //$('.shop-filter-item').removeClass('active');
                        jQuery(this).closest('.shop-filter-item').addClass('active');
                        if (jQuery('.shop-filter-item.active').length > 0) {
                            jQuery('.shop-filters__clear').addClass('filter-active');
                        } else {
                            jQuery('.shop-filters__clear').removeClass('filter-active');
                        }
                    }
                    filters = {};
                    filters.styles = [];
                    filters.fabrics = [];
                    filters.sizes = [];
                    filters.colors = [];
                    combinedFilterOptions = [];
                    if (jQuery('.shop-filter-group.styles .shop-filter-item.active .shop-filter-toggle').length > 0) {
                        jQuery('.shop-filter-group.styles .shop-filter-item.active .shop-filter-toggle').each(function () {
                            filters.styles.push(jQuery(this).data('filter'));
                        });
                    } else {
                        filters.styles.push('.product');
                    }

                    if (jQuery('.shop-filter-group.fabrics .shop-filter-item.active .shop-filter-toggle').length > 0) {
                        jQuery('.shop-filter-group.fabrics .shop-filter-item.active .shop-filter-toggle').each(function () {
                            filters.fabrics.push(jQuery(this).data('filter'));
                        });
                    } else {
                        filters.fabrics.push('.product');
                    }
                    if (jQuery('.shop-filter-group.sizes .shop-filter-item.active .shop-filter-toggle').length > 0) {
                        jQuery('.shop-filter-group.sizes .shop-filter-item.active .shop-filter-toggle').each(function () {
                            filters.sizes.push(jQuery(this).data('filter'));
                        });
                    } else {
                        filters.sizes.push('.product');
                    }
                    if (jQuery('.shop-filter-group.colors .shop-filter-item.active .shop-filter-toggle').length > 0) {
                        jQuery('.shop-filter-group.colors .shop-filter-item.active .shop-filter-toggle').each(function () {
                            filters.colors.push(jQuery(this).data('filter'));
                        });
                    } else {
                        filters.colors.push('.product');
                    }
                    console.log("combineArraysRecursively(array1, array2, array3, array4) = ", combineArraysRecursively([filters.styles, filters.fabrics, filters.sizes, filters.colors]));
                    filterString = combineArraysRecursively([filters.styles, filters.fabrics, filters.sizes, filters.colors]);
                    filterString = filterString.toString();
                    $isotopeContainer.isotope({
                        filter: filterString
                    });
                    console.log(filterString);
                });


                /*
                jQuery(".vwoPrimaryLink").on("click", function (e) {
                    e.preventDefault();
                    
                    var thisData = jQuery(this).attr('data-filter');
                    console.log('thisData: ' + thisData);
                    if (jQuery(this).closest('.site-subnav__item').hasClass('active')) {
                        // Clicked already selected option
                        jQuery(this).closest('.site-subnav__item').removeClass('active');
                        console.log('vwoPrimaryLink: ' + thisData + 'is already selected' );
                    } else {
                        // Clicked unselected option
                        //$('.shop-filter-item').removeClass('active');
                        jQuery(this).closest('.site-subnav__item').addClass('active');
                        console.log('vwoPrimaryLink: ' + thisData + 'is now selected' );
                    }
                    console.log('filter: .shop-filter-toggle[data-filter="' + thisData + '"]' );
                    jQuery('.shop-filter-toggle[data-filter="' + thisData + '"]').click();

                });
                */





                /*For Mobile*/
                /*
                jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-title.fabrics').eq(0).clone(true).addClass('styles').removeClass('fabrics').prependTo(jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-title.fabrics').parent());

                jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-group.fabrics').eq(0).clone(true).addClass('styles').removeClass('fabrics').insertAfter(jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-title.styles').eq(0))

                jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-title.styles').html(jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-title.styles').html().replace('Fabric', 'Styles'))
                jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-group.styles li').eq(4).clone(true).insertAfter(jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-group.styles li').eq(4));
                jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-group.styles li').eq(5).clone(true).insertAfter(jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-group.styles li').eq(5));
                jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-group.styles li').eq(6).clone(true).insertAfter(jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-group.styles li').eq(6));
                jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-group.styles li').eq(0).find('a').attr({
                    'href': '/collections/shop'
                }).text('All');
                jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-group.styles li').eq(1).find('a').attr({
                    'href': 'https://alexcrane.co/collections/sweaters',
                    'data-filter': '[data-style=\'Sweater\']'
                }).text('Sweaters');
                jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-group.styles li').eq(2).find('a').attr({
                    'href': '/collections/bo-shorts',
                    'data-filter': '[data-style=\'Shorts\']'
                }).text('Shorts');
                jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-group.styles li').eq(3).find('a').attr({
                    'href': '/collections/pants',
                    'data-filter': '[data-style=\'Pants\']'
                }).text('Pants');
                jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-group.styles li').eq(4).find('a').attr({
                    'href': '/collections/shirts',
                    'data-filter': '[data-style=\'Shirt\']'
                }).text('Shirts');
                jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-group.styles li').eq(5).find('a').attr({
                    'href': '/collections/jackets',
                    'data-filter': '[data-style=\'Jacket\']'
                }).text('Jackets');
                jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-group.styles li').eq(6).find('a').attr({
                    'href': '/collections/tees',
                    'data-filter': '[data-style=\'Tees\']'
                }).text('Tees');
                jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-group.styles li').eq(7).find('a').attr({
                    'href': '/collections/accessories',
                    'data-filter': '[data-style=\'Accessories\']'
                }).text('Accessories');
                jQuery('.vwoSticky #shopify-section-shop-filters .shop-filters__wrapper .shop-filter-group.styles li:not(:first-child)').addClass('vwoMobileLink');
                jQuery('.vwoSticky #collection-nav .collection-nav .site-subnav-categories.primary').hide();
                */
            }




            var windowWidth = jQuery(window).width();
            jQuery(window).on("resize", function () {
                if (jQuery(this).width() != windowWidth) {
                    console.log('resized');
                    jQuery("section.product-list").isotope({
                        filter: "*"
                    })
                    jQuery('.shop-filter-item.active').removeClass('active');
                    jQuery('.vwoPrimaryLink').parent('.active').removeClass('active');
                    jQuery('.shop-filters__clear').click();

                    windowWidth = jQuery(window).width();
                }
            });
            clearInterval(setInter);
        } else {
            setTimeout(function () {
                clearInterval(setInter);
            }, 5000);
        }
    }, 10); 
}

function makeFiltersSticky4854v2() {
    if (jQuery('.vwoSidebar').length) {
        var sidebarWrap = jQuery('.vwoSidebar'),
            sideBar = sidebarWrap.find('> .shop-filters'),
            wrapper = jQuery('.vwoContainer'),
            contentBlock = jQuery('.vwoContainer .product-list'),
            sidebarContentGap = sidebarWrap.offset().top - wrapper.offset().top,
            headerSpace = jQuery('#shopify-section-header').height(),
            spacing = 10;
        if (contentBlock.innerHeight() > (sideBar.innerHeight() + 50)) {
            if (jQuery(window).scrollTop() > (sidebarWrap.offset().top - headerSpace - spacing)) {
                if (jQuery(window).scrollTop() < ((wrapper.offset().top + wrapper.innerHeight()) - sideBar.innerHeight() - headerSpace - spacing)) {
                    sideBar.addClass('sidebarStickyActive').css({
                        position: 'fixed',
                        left: sidebarWrap.offset().left,
                        top: headerSpace + spacing + 'px',
                        width: sidebarWrap.innerWidth()
                    });
                } else {
                    sideBar.removeClass('sidebarStickyActive').css({
                        position: 'absolute',
                        left: 'auto',
                        top: wrapper.innerHeight() - sidebarContentGap - sideBar.innerHeight()
                    });
                }
            } else {
                sideBar.removeClass('sidebarStickyActive').css({
                    position: 'relative',
                    left: 'auto',
                    top: '0',
                    width: sidebarWrap.innerWidth()
                });
            }
        } else {
            sideBar.css({
                position: 'relative',
                left: 'auto',
                top: '0'
            });
        }
    }
}