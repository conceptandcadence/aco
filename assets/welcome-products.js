
function pdpItem__SetInStockOptions(plpItem) {
  let selectedVariantAvailable = false;
  let plpItemData = window.plpProducts[plpItem?.dataset?.handle];

  console.log('plpItemData')
  console.log(plpItemData)
  
  if (plpItem && plpItemData) {
    let variantTitle;
    let variantId;
    let selectedSize = plpItem.querySelector('.variant-size.selected') ? plpItem.querySelector('.variant-size.selected input').value : null;
    let selectedLength = plpItem.querySelector('.variant-length.selected') ? plpItem.querySelector('.variant-length.selected input').value : null;
    let sizeOptions = plpItem.querySelectorAll('.variant-size');
    let lengthOptions = plpItem.querySelectorAll('.variant-length');

    /*
    plpItem.querySelectorAll('.variant-length').forEach(lengthOption => {
      lengthOption.classList.add('soldout');
    });
    */

    if (selectedSize) {
      plpItem.querySelector('.plp-item__button').classList.add('disabled');
    } else {
      plpItem.querySelector('.plp-item__button').classList.add('initial-multiple');
    }
    plpItem.querySelector('.plp-item__button').dataset.variant = '';

    plpItemData?.variants.forEach((variant) => {
      let variantSize = variant.option1 ? variant.option1 : null 
      let variantLength = variant.option2 ? variant.option2 : null

      console.log(variant);
      
      if (variantSize && variantLength) {
        variantTitle = variant.title;
        variantId = variant.id;

        // Size Options
        plpItem.querySelectorAll('.variant-size').forEach(sizeOption => {
          let sizeOptionTitle = sizeOption.querySelector('input').value;
          if (variantSize === sizeOptionTitle && variant.available) {
            sizeOption.classList.remove('soldout');
          }
        });

        // Length Options
        plpItem.querySelectorAll('.variant-length').forEach(lengthOption => {
          let lengthOptionTitle = lengthOption.querySelector('input').value;
          console.log(lengthOptionTitle)
          if (variantSize === selectedSize && variantLength === lengthOptionTitle && variant.available) {
            //console.log(`${selectedSize} / ${lengthOptionTitle}`);
            lengthOption.classList.remove('soldout');

            // Validate Selected Option
            if (variantSize === selectedSize && variantLength === selectedLength && variant.available) {
              console.log(`${selectedSize} / ${lengthOptionTitle}`);
              plpItem.querySelector('.plp-item__button').dataset.variant = variant.id;
              plpItem.querySelector('.plp-item__button').classList.remove('disabled');
            }

          }
        });
      }
    });

    window.product?.variants.forEach((variant) => {
      if (variant.id === selectedVariantId && variant.available) {
        selectedVariantAvailable = true;
      }
    });
  }
}

$('body').on('click', '.plp-item:not(.no-variants) .plp-item__button', function (e) {

  
  if ($(this).closest('.plp-item').attr('data-state') === 'display-variants') {
    $(this).closest('.plp-item').attr('data-state', 'default');
  } else {
    
    $('.plp-item').attr('data-state', 'default');

    if ($(this).closest('.plp-item').find('.variant-length').length > 0) {
      console.log(e.target.closest('.plp-item'));
      pdpItem__SetInStockOptions(e.target.closest('.plp-item'));
      $(this).closest('.plp-item').attr('data-state', 'add');
    } else {
      $(this).closest('.plp-item').attr('data-state', 'display-variants');
    }
  }
});

$('body').on('click', '.plp-item[data-state="add"] .plp-item__button', function (e) {
  let cartCounter = $('span.cart-count');
  let itemTile = e.target.closest('.plp-item');
  let button = itemTile.querySelector('.plp-item__button');
  let variant = button.dataset?.variant ? button.dataset?.variant : null;

  console.log(button, variant); 

  if (variant) {

    itemTile.dataset.state = 'adding'

    CartJS.addItem(variant, 1, {}, {
      'success': function (data, textStatus, jqXHR) {

        itemTile.dataset.state = 'success'
        cartCounter.show();
        cartCounter.html(CartJS.cart.item_count + 1);
        setTimeout(function () {
          itemTile.dataset.state = 'default'
        }, 2000);

      },
      'error': function (jqXHR, textStatus, errorThrown) {
        var error = parseInt(jqXHR.status);
        if (error === 404 || error === 400) {
          itemTile.dataset.state = 'error'
          setTimeout(function () {
            itemTile.dataset.state = 'default'
          }, 1500);
        }
      }
    });
  } else {
    console.error('No valid variant selected');
  }

});

// Single Option
$('body').on('click', '.plp-item .variant', function (e) {
  e.stopPropagation(); 
  console.log('ONE');
  let variant = $(this).data('variant-id');
  let cartCounter = $('span.cart-count');
  let itemTile = $(this).closest('.plp-item');

  itemTile.attr('data-state', 'adding');

  CartJS.addItem(variant, 1, {}, {
    'success': function (data, textStatus, jqXHR) {

      itemTile.attr('data-state', 'success');
      cartCounter.show();
      cartCounter.html(CartJS.cart.item_count + 1);
      setTimeout(function () {
        itemTile.attr('data-state', 'default');
      }, 2000);

    },
    'error': function (jqXHR, textStatus, errorThrown) {
      var error = parseInt(jqXHR.status);
      if (error === 404 || error === 400) {
        itemTile.attr('data-state', 'error');
        setTimeout(function () {
          itemTile.attr('data-state', 'default');
        }, 1500);
      }
    }
  });
});


// Two Options - Size
$('body').on('click', '.plp-item .variant-size', function (e) {
  e.preventDefault();
  e.stopPropagation();

  let sizeOptions = e.target.closest('.plp-item').querySelectorAll('.variant-size');
  let lengthOptions = e.target.closest('.plp-item').querySelectorAll('.variant-length');
  let itemTile = e.target.closest('.plp-item');

  sizeOptions.forEach((size) => {
    size.classList.remove('selected');
  });
  e.target.closest('.variant-size').classList.add('selected');
  pdpItem__SetInStockOptions(itemTile)
});

// Two Options - Length
$('body').on('click', '.plp-item .variant-length', function (e) {
  e.preventDefault();
  e.stopPropagation();
  alert
  let itemTile = e.target.closest('.plp-item');
  let lengthOptions = e.target.closest('.plp-item').querySelectorAll('.variant-length');
  lengthOptions.forEach((length) => {
    length.classList.remove('selected');
  });
  e.target.closest('.variant-length').classList.add('selected');
  pdpItem__SetInStockOptions(itemTile)
});

// No Options
$('body').on('click', '.plp-item.no-variants .plp-item__button', function (e) {
  e.stopPropagation();
  let itemTile = $(this).closest('.plp-item');
  let variant = $(this).closest('.plp-item').data('default-variant');
  let cartCounter = $('span.cart-count');
  itemTile.attr('data-state', 'adding');

  CartJS.addItem(variant, 1, {}, {
    'success': function (data, textStatus, jqXHR) {

      itemTile.attr('data-state', 'success');
      cartCounter.show();
      cartCounter.html(CartJS.cart.item_count + 1);
      setTimeout(function () {
        itemTile.attr('data-state', 'default');
      }, 2000);

    },
    'error': function (jqXHR, textStatus, errorThrown) {
      var error = parseInt(jqXHR.status);
      if (error === 404 || error === 400) {
        itemTile.attr('data-state', 'error');
        setTimeout(function () {
          itemTile.attr('data-state', 'default');
        }, 1500);
      }
    }
  });

});

let filterableSizes = [];

function updateSizes() {
  document.querySelectorAll('.plp-products .plp-item').forEach((product) => {
    let data = $(product).data();
    data = Object.keys(data)
    data.forEach((size) => {
      if (size.includes("size")) {
        let formattedSize = size.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
        formattedSize = size.replace('_', '-');
        if (filterableSizes.indexOf(formattedSize) === -1) {
          filterableSizes.push(formattedSize);
        }
      }
    });
  });
  updateSizeFilters();
}
updateSizes();

function updateSizeFilters() {

  document.querySelectorAll('.shop-filter-toggle.size').forEach((filter) => {
    let size = filter.dataset?.filter;
    let active = false;

    filterableSizes.forEach((filterableSize) => {
      let formattedFilterableSize = `[data-${filterableSize}]`;
      if (formattedFilterableSize === size) {
        active = true;
      }
    });

    if (active) {
      filter.parentElement.classList.remove('disabled');
    } else {
      filter.parentElement.classList.add('disabled');
    }

  });
}

$(".active-filter.size").on('click', function (e) {
  e.preventDefault();
  $(this).remove();
  updateDisplayedSizes();
});

$(".shop-filter-toggle.size").on('click', function (e) {
  e.preventDefault();
  let $filters = $('.active-filters');
  let activeFilterLabel = $(this).data('filter');
  activeFilterLabel = activeFilterLabel.substring(1, activeFilterLabel.length - 1);
  let activeFilterId = activeFilterLabel.replace('data-', '');
  activeFilterLabel = activeFilterId.replace('size-', '').toUpperCase();
  let activeFilterButton = `<a class="active-filter size" data-id="${activeFilterId}" href="${window.location.href}">Size: ${activeFilterLabel}<span class="close">×</span></a>`;
  $('.active-filters .active-filter.size').remove();
  $filters.append(activeFilterButton);
  updateDisplayedSizes(activeFilterId);
});


function updateDisplayedSizes(id) {
  if (!id) {
    $('.plp-products .plp-item').removeClass('filtered-out');
    $('.plp-products .shoppable-look').removeClass('filtered-out');
    return;
  }
  window.activeSizeFilter = id;

  document.querySelectorAll('.plp-products .plp-item').forEach((product) => {
    let data = $(product).data();
    let filter = `${id}`;
    let active = false;
    data = Object.keys(data);
    let formattedFilter = filter.replace('-', '_');
    data.forEach((size) => {
      if (size === formattedFilter) {
        active = true;
      }
    });

    if (active) {
      product.classList.remove('filtered-out');
      $('.plp-products .shoppable-look').addClass('filtered-out');
    } else {
      product.classList.add('filtered-out');
    }
  });

  $infiniteScroll.infiniteScroll('loadNextPage');

}

window.displayedProducts = []
console.log('Initial Products');
console.log(window.displayedProducts);
$infiniteScrollContainer = $('.welcome-products')
$infiniteScroll = $('.welcome-products').infiniteScroll({
  path: ".plp-products__pagination .next a",
  append: false,
  history: false,
});

$infiniteScroll.on( 'load.infiniteScroll', function( event, data ) {
  console.log('load.infiniteScroll')
  let productData = data.querySelectorAll('.welcome-products > .plp-item');
  productData.forEach((product) => {
    if (!window.displayedProducts.includes(product?.dataset?.handle)) {
      window.displayedProducts.push(product?.dataset?.handle);
      $infiniteScrollContainer.append(product);
    }
  }); 
});