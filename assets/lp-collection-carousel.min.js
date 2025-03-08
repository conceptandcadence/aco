
window.lpProducts = window.lpProducts || [];
window.lpProductsCarousel = window.lpProductsCarousel || [];

$(document).ready(function(){
    if ( $('.carousel-enabled.lp-product-carousel__products').length > 0 ) {

        document.querySelectorAll('.lp-product-carousel__product .lp-product-carousel__colorway:first-child').forEach((product, i) => {
            product.classList.add('active');
        });

        document.querySelectorAll('.carousel-enabled.lp-product-carousel__products').forEach((carousel, i) => {
            window.lpProducts[carousel.id] = carousel;
            if (window.innerWidth >= 700) {
                window.lpProductsCarousel[carousel.id] = new Flickity( window.lpProducts[carousel.id], {
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
                window.lpProductsCarousel[carousel.id] = new Flickity( window.lpProducts[carousel.id], {
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
        });
    }
});

window.addToCartActive = window.addToCartActive | true;
$(".lp-product-carousel__button_addtocart").click(function(e) {
    e.stopPropagation();
    e.preventDefault();

    if (window.addToCartActive) {

        // Prevent multiple clicks
        window.addToCartActive = false;
        setTimeout(() => {
            window.addToCartActive = true;
        }, "500");

        $(".lp-product-carousel__product .selector-wrapper").removeClass("active");

        var productContainer = $(this).parent().parent();
        var selectWrapper = productContainer.find(".selector-wrapper").addClass("active");
        var cancel = selectWrapper.find("button.cancel-add");
        var submit = selectWrapper.find("button.submit-add");

        cancel.click(function() {
            selectWrapper.removeClass("active");
            cancel.off('click');
            submit.off('click');
            return false;
        });

        submit.click(function(e) {
            var variant = selectWrapper.find("select.size").val();
            if (! variant) {
            variant = selectWrapper.find('.product-id').val();
            }

            CartJS.addItem(variant, 1, {}, {
            "success": function(data, textStatus, jqXHR) {
                var cartCounter = $("span.cart-count");
                var msgContainer = selectWrapper.find(".msg");

                //cartCounter.show();
                //cartCounter.html(CartJS.cart.item_count + 1);

                selectWrapper.find("select.size").hide();
                selectWrapper.find("label").hide();
                submit.hide();
                cancel.hide();

                msgContainer.addClass("active");
                msgContainer.html("Item Added to Cart!");

                setTimeout(function() {
                selectWrapper.removeClass("active");;

                selectWrapper.find("select.size").show();
                selectWrapper.find("label").show();
                submit.show();
                cancel.show();

                msgContainer.removeClass("active");
                msgContainer.html("");

                submit.off('click');
                cancel.off('click');

                }, 1500);

            },
            "error": function(jqXHR, textStatus, errorThrown) {
                var error = parseInt(jqXHR.status);
                if (error === 404 || error === 400) {
                selectWrapper.addClass("error");
                setTimeout(function() {
                    selectWrapper.removeClass("error");
                }, 1500);
                }
            }
            });
            return false;
        });
        return false;
    }
    return false;
});