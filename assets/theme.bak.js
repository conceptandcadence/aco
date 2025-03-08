window.slate = window.slate || {};
window.theme = window.theme || {};

/*================ Slate ================*/
/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 * to users with visual impairments.
 *
 *
 * @namespace a11y
 */

slate.a11y = {

    /**
     * For use when focus shifts to a container rather than a link
     * eg for In-page links, after scroll, focus shifts to content area so that
     * next `tab` is where user expects if focusing a link, just $link.focus();
     *
     * @param {JQuery} $element - The element to be acted upon
     */
    pageLinkFocus: function ($element) {
        var focusClass = 'js-focus-hidden';

        $element.first()
            .attr('tabIndex', '-1')
            .focus()
            .addClass(focusClass)
            .one('blur', callback);

        function callback() {
            $element.first()
                .removeClass(focusClass)
                .removeAttr('tabindex');
        }
    },

    /**
     * If there's a hash in the url, focus the appropriate element
     */
    focusHash: function () {
        var hash = window.location.hash;

        // is there a hash in the url? is it an element on the page?
        if (hash && document.getElementById(hash.slice(1))) {
            this.pageLinkFocus($(hash));
        }
    },

    /**
     * When an in-page (url w/hash) link is clicked, focus the appropriate element
     */
    bindInPageLinks: function () {
        $('a[href*=#]').on('click', function (evt) {
            this.pageLinkFocus($(evt.currentTarget.hash));
        }.bind(this));
    },

    /**
     * Traps the focus in a particular container
     *
     * @param {object} options - Options to be used
     * @param {$} options.$container - Container to trap focus within
     * @param {$} options.$elementToFocus - Element to be focused when focus leaves container
     * @param {string} options.namespace - Namespace used for new focus event handler
     */
    trapFocus: function (options) {
        var eventName = options.eventNamespace ?
            'focusin.' + options.eventNamespace :
            'focusin';

        if (!options.$elementToFocus) {
            options.$elementToFocus = options.$container;
        }

        options.$container.attr('tabindex', '-1');
        options.$elementToFocus.focus();

        $(document).on(eventName, function (evt) {
            if (options.$container[0] !== evt.target && !options.$container.has(evt.target).length) {
                options.$container.focus();
            }
        });
    },

    /**
     * Removes the trap of focus in a particular container
     *
     * @param {object} options - Options to be used
     * @param {$} options.$container - Container to trap focus within
     * @param {string} options.namespace - Namespace used for new focus event handler
     */
    removeTrapFocus: function (options) {
        var eventName = options.namespace ?
            'focusin.' + options.namespace :
            'focusin';

        if (options.$container && options.$container.length) {
            options.$container.removeAttr('tabindex');
        }

        $(document).off(eventName);
    }
};

/**
 * Utility helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions for dealing with arrays and objects
 *
 * @namespace utils
 */

slate.utils = {

    /**
     * Return an object from an array of objects that matches the provided key and value
     *
     * @param {array} array - Array of objects
     * @param {string} key - Key to match the value against
     * @param {string} value - Value to get match of
     */
    findInstance: function (array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return array[i];
            }
        }
    },

    /**
     * Remove an object from an array of objects by matching the provided key and value
     *
     * @param {array} array - Array of objects
     * @param {string} key - Key to match the value against
     * @param {string} value - Value to get match of
     */
    removeInstance: function (array, key, value) {
        var i = array.length;
        while (i--) {
            if (array[i][key] === value) {
                array.splice(i, 1);
                break;
            }
        }

        return array;
    },

    /**
     * _.compact from lodash
     * Remove empty/false items from array
     * Source: https://github.com/lodash/lodash/blob/master/compact.js
     *
     * @param {array} array
     */
    compact: function (array) {
        var index = -1;
        var length = array == null ? 0 : array.length;
        var resIndex = 0;
        var result = [];

        while (++index < length) {
            var value = array[index];
            if (value) {
                result[resIndex++] = value;
            }
        }
        return result;
    },

    /**
     * _.defaultTo from lodash
     * Checks `value` to determine whether a default value should be returned in
     * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
     * or `undefined`.
     * Source: https://github.com/lodash/lodash/blob/master/defaultTo.js
     *
     * @param {*} value - Value to check
     * @param {*} defaultValue - Default value
     * @returns {*} - Returns the resolved value
     */
    defaultTo: function (value, defaultValue) {
        return (value == null || value !== value) ? defaultValue : value
    }
};

/**
 * Rich Text Editor
 * -----------------------------------------------------------------------------
 * Wrap videos in div to force responsive layout.
 *
 * @namespace rte
 */

slate.rte = {

    wrapTable: function () {
        $('.rte table').wrap('<div class="rte__table-wrapper"></div>');
    },

    iframeReset: function () {
        var $iframeVideo = $('.rte iframe[src*="youtube.com/embed"], .rte iframe[src*="player.vimeo"]');
        var $iframeReset = $iframeVideo.add('.rte iframe#admin_bar_iframe');

        $iframeVideo.each(function () {
            // Add wrapper to make video responsive
            $(this).wrap('<div class="rte__video-wrapper"></div>');
        });

        $iframeReset.each(function () {
            // Re-set the src attribute on each iframe after page load
            // for Chrome's "incorrect iFrame content on 'back'" bug.
            // https://code.google.com/p/chromium/issues/detail?id=395791
            // Need to specifically target video and admin bar
            this.src = this.src;
        });
    }
};

slate.Sections = function Sections() {
    this.constructors = {};
    this.instances = [];

    $(document)
        .on('shopify:section:load', this._onSectionLoad.bind(this))
        .on('shopify:section:unload', this._onSectionUnload.bind(this))
        .on('shopify:section:select', this._onSelect.bind(this))
        .on('shopify:section:deselect', this._onDeselect.bind(this))
        .on('shopify:block:select', this._onBlockSelect.bind(this))
        .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

slate.Sections.prototype = $.extend({}, slate.Sections.prototype, {
    _createInstance: function (container, constructor) {
        var $container = $(container);
        var id = $container.attr('data-section-id');
        var type = $container.attr('data-section-type');

        constructor = constructor || this.constructors[type];

        if (typeof constructor === 'undefined') {
            return;
        }

        var instance = $.extend(new constructor(container), {
            id: id,
            type: type,
            container: container
        });

        this.instances.push(instance);
    },

    _onSectionLoad: function (evt) {
        var container = $('[data-section-id]', evt.target)[0];
        if (container) {
            this._createInstance(container);
        }
    },

    _onSectionUnload: function (evt) {
        var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

        if (!instance) {
            return;
        }

        if (typeof instance.onUnload === 'function') {
            instance.onUnload(evt);
        }

        this.instances = slate.utils.removeInstance(this.instances, 'id', evt.detail.sectionId);
    },

    _onSelect: function (evt) {
        var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

        if (instance && typeof instance.onSelect === 'function') {
            instance.onSelect(evt);
        }
    },

    _onDeselect: function (evt) {
        var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

        if (instance && typeof instance.onDeselect === 'function') {
            instance.onDeselect(evt);
        }
    },

    _onBlockSelect: function (evt) {
        var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

        if (instance && typeof instance.onBlockSelect === 'function') {
            instance.onBlockSelect(evt);
        }
    },

    _onBlockDeselect: function (evt) {
        var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

        if (instance && typeof instance.onBlockDeselect === 'function') {
            instance.onBlockDeselect(evt);
        }
    },

    register: function (type, constructor) {
        this.constructors[type] = constructor;

        $('[data-section-type=' + type + ']').each(function (index, container) {
            this._createInstance(container, constructor);
        }.bind(this));
    }
});

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 */

slate.Currency = (function () {
    var moneyFormat = '$';

    /**
     * Format money values based on your shop currency settings
     * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents
     * or 3.00 dollars
     * @param  {String} format - shop money_format setting
     * @return {String} value - formatted value
     */
    function formatMoney(cents, format) {
        if (typeof cents === 'string') {
            cents = cents.replace('.', '');
        }
        var value = '';
        var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
        var formatString = (format || moneyFormat);

        function formatWithDelimiters(number, precision, thousands, decimal) {
            precision = slate.utils.defaultTo(precision, 2);
            thousands = slate.utils.defaultTo(thousands, ',');
            decimal = slate.utils.defaultTo(decimal, '.');

            if (isNaN(number) || number == null) {
                return 0;
            }

            number = (number / 100.0).toFixed(precision);

            var parts = number.split('.');
            var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
            var centsAmount = parts[1] ? (decimal + parts[1]) : '';

            return dollarsAmount + centsAmount;
        }

        switch (formatString.match(placeholderRegex)[1]) {
            case 'amount':
                value = formatWithDelimiters(cents, 2);
                break;
            case 'amount_no_decimals':
                value = formatWithDelimiters(cents, 0);
                break;
            case 'amount_with_comma_separator':
                value = formatWithDelimiters(cents, 2, '.', ',');
                break;
            case 'amount_no_decimals_with_comma_separator':
                value = formatWithDelimiters(cents, 0, '.', ',');
                break;
            case 'amount_no_decimals_with_space_separator':
                value = formatWithDelimiters(cents, 0, ' ');
                break;
        }

        return formatString.replace(placeholderRegex, value);
    }

    return {
        formatMoney: formatMoney
    };
})();

/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * A collection of functions that help with basic image operations.
 *
 */

slate.Image = (function () {

    /**
     * Preloads an image in memory and uses the browsers cache to store it until needed.
     *
     * @param {Array} images - A list of image urls
     * @param {String} size - A shopify image size attribute
     */

    function preload(images, size) {
        if (typeof images === 'string') {
            images = [images];
        }

        for (var i = 0; i < images.length; i++) {
            var image = images[i];
            this.loadImage(this.getSizedImageUrl(image, size));
        }
    }

    /**
     * Loads and caches an image in the browsers cache.
     * @param {string} path - An image url
     */
    function loadImage(path) {
        new Image().src = path;
    }

    /**
     * Find the Shopify image attribute size
     *
     * @param {string} src
     * @returns {null}
     */
    function imageSize(src) {
        var match = src.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);

        if (match) {
            return match[1];
        } else {
            return null;
        }
    }

    /**
     * Adds a Shopify size attribute to a URL
     *
     * @param src
     * @param size
     * @returns {*}
     */
    function getSizedImageUrl(src, size) {
        if (size === null) {
            return src;
        }

        if (size === 'master') {
            return this.removeProtocol(src);
        }

        var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

        if (match) {
            var prefix = src.split(match[0]);
            var suffix = match[0];

            return this.removeProtocol(prefix[0] + '_' + size + suffix);
        } else {
            return null;
        }
    }

    function removeProtocol(path) {
        return path.replace(/http(s)?:/, '');
    }

    return {
        preload: preload,
        loadImage: loadImage,
        imageSize: imageSize,
        getSizedImageUrl: getSizedImageUrl,
        removeProtocol: removeProtocol
    };
})();

/**
 * Variant Selection scripts
 * ------------------------------------------------------------------------------
 *
 * Handles change events from the variant inputs in any `cart/add` forms that may
 * exist. Also updates the master select and triggers updates when the variants
 * price or image changes.
 *
 * @namespace variants
 */

slate.Variants = (function () {

    /**
     * Variant constructor
     *
     * @param {object} options - Settings from `product.js`
     */
    function Variants(options) {
        this.$container = options.$container;
        this.product = options.product;
        this.singleOptionSelector = options.singleOptionSelector;
        this.originalSelectorId = options.originalSelectorId;
        this.enableHistoryState = options.enableHistoryState;
        this.currentVariant = this._getVariantFromOptions();

        $(this.singleOptionSelector, this.$container).on('change', this._onSelectChange.bind(this));
    }

    Variants.prototype = $.extend({}, Variants.prototype, {

        /**
         * Get the currently selected options from add-to-cart form. Works with all
         * form input elements.
         *
         * @return {array} options - Values of currently selected variants
         */
        _getCurrentOptions: function () {
            var currentOptions = $.map($(this.singleOptionSelector, this.$container), function (element) {
                var $element = $(element);
                var type = $element.attr('type');
                var currentOption = {};

                if (type === 'radio' || type === 'checkbox') {
                    if ($element[0].checked) {
                        currentOption.value = $element.val();
                        currentOption.index = $element.data('index');

                        return currentOption;
                    } else {
                        return false;
                    }
                } else {
                    currentOption.value = $element.val();
                    currentOption.index = $element.data('index');

                    return currentOption;
                }
            });

            // remove any unchecked input values if using radio buttons or checkboxes
            currentOptions = slate.utils.compact(currentOptions);

            return currentOptions;
        },

        /**
         * Find variant based on selected values.
         *
         * @param  {array} selectedValues - Values of variant inputs
         * @return {object || undefined} found - Variant object from product.variants
         */
        _getVariantFromOptions: function () {
            var selectedValues = this._getCurrentOptions();
            var variants = this.product.variants;
            var found = false;

            variants.forEach(function (variant) {
                var satisfied = true;
                var options = variant.options;

                selectedValues.forEach(function (option) {
                    if (satisfied) {
                        satisfied = (option.value === variant[option.index]);
                    }
                });

                if (satisfied) {
                    found = variant;
                }
            });

            return found || null;
        },

        /**
         * Event handler for when a variant input changes.
         */
        _onSelectChange: function () {
            var variant = this._getVariantFromOptions();

            this.$container.trigger({
                type: 'variantChange',
                variant: variant
            });

            if (!variant) {
                return;
            }

            this._updateMasterSelect(variant);
            this._updateImages(variant);
            this._updatePrice(variant);
            this.currentVariant = variant;

            if (this.enableHistoryState) {
                this._updateHistoryState(variant);
            }
        },

        /**
         * Trigger event when variant image changes
         *
         * @param  {object} variant - Currently selected variant
         * @return {event}  variantImageChange
         */
        _updateImages: function (variant) {
            var variantImage = variant.featured_image || {};
            var currentVariantImage = this.currentVariant.featured_image || {};

            if (!variant.featured_image || variantImage.src === currentVariantImage.src) {
                return;
            }

            this.$container.trigger({
                type: 'variantImageChange',
                variant: variant
            });
        },

        /**
         * Trigger event when variant price changes.
         *
         * @param  {object} variant - Currently selected variant
         * @return {event} variantPriceChange
         */
        _updatePrice: function (variant) {
            if (variant.price === this.currentVariant.price && variant.compare_at_price === this.currentVariant.compare_at_price) {
                return;
            }

            this.$container.trigger({
                type: 'variantPriceChange',
                variant: variant
            });
        },

        /**
         * Update history state for product deeplinking
         *
         * @param  {variant} variant - Currently selected variant
         * @return {k}         [description]
         */
        _updateHistoryState: function (variant) {
            if (!history.replaceState || !variant) {
                return;
            }

            var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
            window.history.replaceState({
                path: newurl
            }, '', newurl);
        },

        /**
         * Update hidden master select of variant change
         *
         * @param  {variant} variant - Currently selected variant
         */
        _updateMasterSelect: function (variant) {
            $(this.originalSelectorId, this.$container)[0].value = variant.id;
        }
    });

    return Variants;
})();


/*================ Sections ================*/
/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 */

theme.Product = (function () {

    var selectors = {
        addToCart: '[data-add-to-cart]',
        addToCartText: '[data-add-to-cart-text]',
        comparePrice: '[data-compare-price]',
        comparePriceText: '[data-compare-text]',
        originalSelectorId: '[data-product-select]',
        priceWrapper: '[data-price-wrapper]',
        productFeaturedImage: '[data-product-featured-image]',
        productJson: '[data-product-json]',
        productPrice: '[data-product-price]',
        productThumbs: '[data-product-single-thumbnail]',
        singleOptionSelector: '[data-single-option-selector]'
    };

    /**
     * Product section constructor. Runs on page load as well as Theme Editor
     * `section:load` events.
     * @param {string} container - selector for the section container DOM element
     */
    function Product(container) {
        this.$container = $(container);
        var sectionId = this.$container.attr('data-section-id');

        this.settings = {};
        this.namespace = '.product';

        // Stop parsing if we don't have the product json script tag when loading
        // section in the Theme Editor
        if (!$(selectors.productJson, this.$container).html()) {
            return;
        }

        this.productSingleObject = JSON.parse($(selectors.productJson, this.$container).html());
        this.imageSize = slate.Image.imageSize($(selectors.productFeaturedImage, this.$container).attr('src'));

        slate.Image.preload(this.productSingleObject.images, this.imageSize);

        this.initVariants();
    }

    Product.prototype = $.extend({}, Product.prototype, {

        /**
         * Handles change events from the variant inputs
         */
        initVariants: function () {
            var options = {
                $container: this.$container,
                enableHistoryState: this.$container.data('enable-history-state') || false,
                singleOptionSelector: selectors.singleOptionSelector,
                originalSelectorId: selectors.originalSelectorId,
                product: this.productSingleObject
            };

            this.variants = new slate.Variants(options);

            this.$container.on('variantChange' + this.namespace, this.updateAddToCartState.bind(this));
            this.$container.on('variantImageChange' + this.namespace, this.updateProductImage.bind(this));
            this.$container.on('variantPriceChange' + this.namespace, this.updateProductPrices.bind(this));
        },

        /**
         * Updates the DOM state of the add to cart button
         *
         * @param {boolean} enabeled - Decides whether cart is enabled or disabled
         * @param {string} text - Updates the text notification content of the cart
         */
        updateAddToCartState: function (evt) {
            var variant = evt.variant;

            if (variant) {
                $(selectors.priceWrapper, this.$container).removeClass('hide');
            } else {
                $(selectors.addToCart, this.$container).prop('disabled', true);
                $(selectors.addToCartText, this.$container).html(theme.strings.unavailable);
                $(selectors.priceWrapper, this.$container).addClass('hide');
                return;
            }

            if (variant.available) {
                $(selectors.addToCart, this.$container).prop('disabled', false);
                $(selectors.addToCartText, this.$container).html(theme.strings.addToCart);
            } else {
                $(selectors.addToCart, this.$container).prop('disabled', true);
                $(selectors.addToCartText, this.$container).html(theme.strings.soldOut);
            }
        },

        /**
         * Updates the DOM with specified prices
         *
         * @param {string} productPrice - The current price of the product
         * @param {string} comparePrice - The original price of the product
         */
        updateProductPrices: function (evt) {
            var variant = evt.variant;
            var $comparePrice = $(selectors.comparePrice, this.$container);
            var $compareEls = $comparePrice.add(selectors.comparePriceText, this.$container);

            $(selectors.productPrice, this.$container)
                .html(slate.Currency.formatMoney(variant.price, theme.moneyFormat));

            if (variant.compare_at_price > variant.price) {
                $comparePrice.html(slate.Currency.formatMoney(variant.compare_at_price, theme.moneyFormat));
                $compareEls.removeClass('hide');
            } else {
                $comparePrice.html('');
                $compareEls.addClass('hide');
            }
        },

        /**
         * Updates the DOM with the specified image URL
         *
         * @param {string} src - Image src URL
         */
        updateProductImage: function (evt) {
            var variant = evt.variant;
            var sizedImgUrl = slate.Image.getSizedImageUrl(variant.featured_image.src, this.imageSize);

            $(selectors.productFeaturedImage, this.$container).attr('src', sizedImgUrl);
        },

        /**
         * Event callback for Theme Editor `section:unload` event
         */
        onUnload: function () {
            this.$container.off(this.namespace);
        }
    });

    return Product;
})();


/*================ Templates ================*/
/**
 * Customer Addresses Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Customer Addresses
 * template.
 *
 * @namespace customerAddresses
 */

theme.customerAddresses = (function () {
    var $newAddressForm = $('#AddressNewForm');

    if (!$newAddressForm.length) {
        return;
    }

    // Initialize observers on address selectors, defined in shopify_common.js
    if (Shopify) {
        new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
            hideElement: 'AddressProvinceContainerNew'
        });
    }

    // Initialize each edit form's country/province selector
    $('.address-country-option').each(function () {
        var formId = $(this).data('form-id');
        var countrySelector = 'AddressCountry_' + formId;
        var provinceSelector = 'AddressProvince_' + formId;
        var containerSelector = 'AddressProvinceContainer_' + formId;

        new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
            hideElement: containerSelector
        });
    });

    // Toggle new/edit address forms
    $('.address-new-toggle').on('click', function () {
        $newAddressForm.toggleClass('hide');
    });

    $('.address-edit-toggle').on('click', function () {
        var formId = $(this).data('form-id');
        $('#EditAddress_' + formId).toggleClass('hide');
    });

    $('.address-delete').on('click', function () {
        var $el = $(this);
        var formId = $el.data('form-id');
        var confirmMessage = $el.data('confirm-message');
        if (confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
            Shopify.postLink('/account/addresses/' + formId, {
                parameters: {
                    _method: 'delete'
                }
            });
        }
    });
})();

/**
 * Password Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Password template.
 *
 * @namespace password
 */

theme.customerLogin = (function () {
    var config = {
        recoverPasswordForm: '#RecoverPassword',
        hideRecoverPasswordLink: '#HideRecoverPasswordLink'
    };

    if (!$(config.recoverPasswordForm).length) {
        return;
    }

    checkUrlHash();
    resetPasswordSuccess();

    $(config.recoverPasswordForm).on('click', onShowHidePasswordForm);
    $(config.hideRecoverPasswordLink).on('click', onShowHidePasswordForm);

    function onShowHidePasswordForm(evt) {
        evt.preventDefault();
        toggleRecoverPasswordForm();
    }

    function checkUrlHash() {
        var hash = window.location.hash;

        // Allow deep linking to recover password form
        if (hash === '#recover') {
            toggleRecoverPasswordForm();
        }
    }

    /**
     *  Show/Hide recover password form
     */
    function toggleRecoverPasswordForm() {
        $('#RecoverPasswordForm').toggleClass('hide');
        $('#CustomerLoginForm').toggleClass('hide');
    }

    /**
     *  Show reset password success message
     */
    function resetPasswordSuccess() {
        var $formState = $('.reset-password-success');

        // check if reset password form was successfully submited.
        if (!$formState.length) {
            return;
        }

        // show success message
        $('#ResetSuccess').removeClass('hide');
    }
})();


$(document).ready(function () {
    var sections = new slate.Sections();
    sections.register('product', theme.Product);

    // Common a11y fixes
    slate.a11y.pageLinkFocus($(window.location.hash));

    $('.in-page-link').on('click', function (evt) {
        slate.a11y.pageLinkFocus($(evt.currentTarget.hash));
    });

    // Wrap videos in div to force responsive layout.
    slate.rte.wrapTable();
    slate.rte.iframeReset();
});

$(document).ready(function () {
    if ($('section.quote .quote-main').length > 0) {
        var $quoteCarousel = $('section.quote .quote-main').flickity({
            "wrapAround": true,
            "watchCSS": false,
            "autoPlay": 4000,
            "prevNextButtons": false,
            "pageDots": false,
            "draggable": false,
            "cellSelector": '.slide'
        });
    }
});

$(document).ready(function () {
    if ($('.press-wrapper').length > 0) {
        var $pressCarousel = $('.press-wrapper').flickity({
            "wrapAround": true,
            "watchCSS": false,
            "autoPlay": 4000,
            "prevNextButtons": false,
            "pageDots": false,
            "draggable": true,
            "cellSelector": "a"
        }); 
    }
});


// /////////////////////////////////////////////////////////////////////////////////
// Helper Functions
// /////////////////////////////////////////////////////////////////////////////////

function combineArraysRecursively( array_of_arrays ){

    // First, handle some degenerate cases...

    if( ! array_of_arrays ){
        // Or maybe we should toss an exception...?
        return [];
    }

    if( ! Array.isArray( array_of_arrays ) ){
        // Or maybe we should toss an exception...?
        return [];
    }

    if( array_of_arrays.length == 0 ){
        return [];
    }

    for( let i = 0 ; i < array_of_arrays.length; i++ ){
        if( ! Array.isArray(array_of_arrays[i]) || array_of_arrays[i].length == 0 ){
            // If any of the arrays in array_of_arrays are not arrays or are zero-length array, return an empty array...
            return [];
        }
    }

    // Done with degenerate cases...
    let outputs = [];

    function permute(arrayOfArrays, whichArray=0, output=""){

        arrayOfArrays[whichArray].forEach((array_element)=>{
            if( whichArray == array_of_arrays.length - 1 ){            
                // Base case...
                outputs.push( output + array_element );
            }
            else{
                // Recursive case...
                permute(arrayOfArrays, whichArray+1, output + array_element );
            }
        });/*  forEach() */
    }

    permute(array_of_arrays);

    return outputs;
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

// /////////////////////////////////////////////////////////////////////////////////
// Gift Card
// /////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    $('.gift-cart-select').change(function () {
        if ($('button[data-add-to-cart]').hasClass('must-select-size')) {
            $('button[data-add-to-cart]').removeClass('must-select-size');
        }
        $('.product-price').text($(this).find('option:selected').text());
    });
});

// /////////////////////////////////////////////////////////////////////////////////
// Navigation
// /////////////////////////////////////////////////////////////////////////////////

$(".site-nav__link[data-subnav]").on('click', function (e) {
    console.log(e);
    if ($(window).width() >= 700) {
        e.preventDefault();
        if ($(this).closest('.site-nav__item').hasClass('subnav-active')) {
            $('.site-nav__item').removeClass('subnav-active');
            $('header[section-id="header"]').removeClass('megamenu-subnav-active');
        } else {
            $('.site-nav__item').removeClass('subnav-active');
            $(this).closest('.site-nav__item').addClass('subnav-active');
            $('header[section-id="header"]').addClass('megamenu-subnav-active');
        }
    } else {
        e.preventDefault();
        if ($(this).closest('.site-nav__item').hasClass('expanded')) {
            $('.site-nav__item').removeClass('expanded');
        } else {
            $('.site-nav__item').removeClass('expanded');
            $(this).closest('.site-nav__item').addClass('expanded');
        }
    }
});

$(document).ready(function () {
    if ($('body').hasClass('tabs')) {
        if (window.location.hash) {
            var anchor = window.location.hash;
            anchor = anchor.replace('#', '')
            $('[data-section="' + anchor + '"]').click();
        }
        $('.site-subnav__link[data-anchor]').on('click', function () {
            console.log($(this).data('anchor'));
            $('li[data-section="' + $(this).data('anchor') + '"]').click();
        });
    }
});

$(".site-nav.mobile .site-nav__toggle").on('click', function (e) {
    e.preventDefault();
    
    if ($(this).closest('.site-nav__link').hasClass('expanded')) {
        $('.site-nav__link').removeClass('expanded');
    } else {
        $('.site-nav__link').removeClass('expanded');
        $(this).closest('.site-nav__link').addClass('expanded');
    }
});

// Rebuy Engine

$('.cart-link').on('click', function (e) {
    e.preventDefault();
});

$(window).on('load', function () {
    $('.sustainability-page-carousel').flickity({ 
        cellSelector: 'li',
        wrapAround: true,
        watchCSS: false,
        imagesLoaded: true,
        pageDots: true,
        prevNextButtons: false,
        adaptiveHeight: true,
        dragThreshold: 10,
        touchVerticalScroll: true,
        autoPlay: 3000
    });
});

$(document).on('ready', function () {
    if ( $('body').hasClass('template-collection') ) {
        $('.material-symbol').each(function(){
            var $materialIcon = $(this);
            var materialHandle = $(this).data('handle');
            materialHandle = materialHandle.replace('material--','');
            $('.product').each(function(){
                if ( $(this).data('material') === materialHandle) {
                    //$(this).append($($materialIcon).clone());
                    $(this).find('.product-list--material').append($($materialIcon).clone());
                }
            });
        });
    }
});


// /////////////////////////////////////////////////////////////////////////////////
// VWO Updates - Menu Updates 062822
// /////////////////////////////////////////////////////////////////////////////////

// Mobile Navigation

$('.mobNavULWrap ul li > span').click(function(){
    var unID = $(this).parent().attr('data-unid');
    if(unID != undefined){
      $(this).parents('.mobNavULWrap').addClass('subUlParent');
      $('#' + unID).addClass('subUlActive');
    }
});
$('.mobNavBackBtn').click(function(){
    var parentID = $(this).parents('.mobNavULWrap');
    parentID.removeClass('subUlActive');
    $('#' + parentID.attr('data-parent-id')).removeClass('subUlParent');
});
$('.mobMenuOverlay').click(function(){
    $('#mobile-hamburger a').click();
});

// Desktop Navigation

$(document).on('click', '#shopify-section-header .site-nav.desktop .site-nav__link[data-subnav]', function(e){
  if($(this).parent().hasClass('subnav-active')){
    $('body').addClass('showMenuOverlay');
  }else{
    $('body').removeClass('showMenuOverlay');
  }
});
$('.menuOverlayDesktop').on('click', function(e){
      e.preventDefault();
      $('body').removeClass('showMenuOverlay');
      $('header').removeClass('megamenu-subnav-active');
      $('.site-nav__item').removeClass('subnav-active');
  });

$(document).on('keydown', function(e){
  if (e.which === 27 && e.type === "keydown") {
    e.preventDefault();
    $('body').removeClass('showMenuOverlay');
    $('.site-nav__item').removeClass('subnav-active');
    $('header').removeClass('megamenu-subnav-active');
    $('#mobile-hamburger').removeClass('active');
    $('.newMobNav').removeClass('active');
    $('.search-bar').removeClass('active');
  }
});


// Show Search
$('.search-toggle.desktop').on('click', function(e){
    e.preventDefault();
    if ( $('.search-bar').hasClass('active') ) {
        $('.search-bar').removeClass('active');
        $('.search-bar .search__input').blur(); 
    } else { 
        $('.search-bar').addClass('active');
        $('.search-bar .search__input').focus();
    } 
}); 
$('.search-toggle.mobile').on('click', function(e){
    e.preventDefault();
      window.scrollTo(0, 10);
      $('html').addClass('nav-scrolled');
			$('.search-bar .search__input').focus();
      $('.cloud-search-mobile__input input').focus(); 
}); 

$(window).on('load', function(){
    $('.cloud-search-mobile__input input').attr('placeholder', 'Search');     
});

setTimeout(() => {
  $('.cloud-search-mobile__input input').attr('placeholder', 'Search');
}, "1000");

setTimeout(() => {
  if ( $('.cloud-search-mobile__input input').attr('placeholder') !== 'Search' ) {
    $('.cloud-search-mobile__input input').attr('placeholder', 'Search');
  }
}, "5000");

 
// /////////////////////////////////////////////////////////////////////////////////////////
// Shipping Motivator
// /////////////////////////////////////////////////////////////////////////////////////////

let ShippingMotivatorTimeThreshold = 500; 
let ShippingMotivatorLastUpdate = Date.now();
let ShippingMotivatorTimeNow = Date.now();
let ShippingMotivatorText = '';
let root = document.querySelector(':root');
let rootStyles = getComputedStyle(root);
$(document).on('ready', function () {
    $('.site-banner').css('transform', 'translateY(0)');
    document.addEventListener('rebuy.productsChange', function(event){ 
        ShippingMotivatorTimeNow = Date.now();
        if (Shopify.country == 'US') {
            if ($('.rebuy-cart__flyout-shipping-bar-message').length > 0 && ((ShippingMotivatorTimeNow - ShippingMotivatorLastUpdate) > ShippingMotivatorTimeThreshold || (ShippingMotivatorTimeNow - ShippingMotivatorLastUpdate) == 0) ) {
                ShippingMotivatorText = $('.rebuy-cart__flyout-shipping-bar-message').text();
								ShippingMotivatorText = ShippingMotivatorText.replace('.00','');
                $('.site-banner p').fadeOut(250, function(){
                    $('.site-banner p').text(ShippingMotivatorText);
                    $('.site-banner p').fadeIn(250);
                    if (!ShippingMotivatorText.includes('$200')) {
                        root.style.setProperty('--announcement-color', rootStyles.getPropertyValue('--announcement-color') );
                        root.style.setProperty('--announcement-background', rootStyles.getPropertyValue('--announcement-background') );
                    }
                    if (!ShippingMotivatorText.includes('Congrats')) {
                        setTimeout(function () {
                        root.style.setProperty('--announcement-color', rootStyles.getPropertyValue('--announcement-color-highlight') );
                        root.style.setProperty('--announcement-background', rootStyles.getPropertyValue('--announcement-background-highlight') );
                        }, 1500); 
                    }
                    ShippingMotivatorLastUpdate = Date.now();
                });
            }
        }
    }); 
});



// /////////////////////////////////////////////////////////////////////////////////////////
// BFCM Motivator
// /////////////////////////////////////////////////////////////////////////////////////////

let cartMotivatorSettings = {
    "frequency": 500,
    "lastDisplayed": Date.now(),
    "currentTime": Date.now(),
}
let cartMotivatorCampaigns = {
    "bfcm-shorts": {
        "priority": 0,
        "status": "active",
        "threshold": 3,
        "tag": "category--shorts", 
        "color": "#000",
        "background": "#006AFF",
        "message": {
            "progress": "<p>Add [count] more Bo Shorts to your Cart to get 10% off!</p>",
            "complete": "<p>Nice job! You get 10% off Bo Shorts!</p>"
        }
    },
    "bfcm-tees": {
        "priority": 0,
        "status": "active",
        "threshold": 3,
        "tag": "category--tees",
        "color": "#FFF",
        "background": "#006AFF",
        "message": {
            "progress": "<p>Add [count] more Sun Tees to your Cart to get 10% off!</p>",
            "complete": "<p>Nice job! You get 10% off Sun Tees!</p>"
        }
    },
    "bfcm-alex": {
        "priority": 0,
        "status": "active",
        "threshold": 2,
        "tag": "alexs-picks",
        "color": "#FFF",
        "background": "#006AFF",
        "message": {
            "progress": "<p>Add [count] more item from Alex’s Picks for 10% off.</p>",
            "complete": "<p>Nice job! You get 10% off Alex’s Picks!</p>"
        }
    },
    "bfcm-tiers": {
        "priority": 1,
        "status": "active",
        "tiers": {
            "0": {
                "threshold": 0,
                "message": "<p>Spend [difference] more to save 15%!</p>",
                "status": "progress",
                "background": "#d8e3ef",
                "color": "#000"
            },
            "1": {
                "threshold": 10000,
                "message": "<p><span>You've unlocked 15% off your order!</span> <span>Spend [difference] more to unlock 20%</span></p>",
                "status": "complete",
                "background": "#7087a9",
                "color": "#fff"
            },
            "2": {
                "threshold": 20000,
                "message": "<p><span>You've unlocked 20% off your order!</span> <span>Spend [difference] more to unlock 25%</span></p>",
                "status": "complete",
                "background": "#14467d",
                "color": "#fff"
            },
            "3": {
                "threshold": 30000,
                "message": "<p>Nice job! You get 25% off your entire order.</p>",
                "status": "complete",
                "background": "#cf4955",
                "color": "#fff"
            }
        }
    }
}

class CartMotivator {
    constructor(campaigns) {
        this.campaigns = campaigns;
    }
    getCurrentCampaign() {
        let priority = 0;
        let currentCampaign = false;
        let campaignProductsInCart = {};
        let campaignProductsBestMatch = {
            "campaign": "",
            "count": 0
        };

        // If the cart has items that pertain to a specific campaign, then set that campaign to active
        if (Rebuy?.Cart?.cart?.items.length > 0) {
            for (const campaign in this.campaigns) {
                if (this.campaigns[campaign]?.tag && this.campaigns[campaign]['status'] == "active") {
                    const campaignTag = this.campaigns[campaign].tag;
                    for (const item in Rebuy.Cart.cart.items) {
                        if (Rebuy.Cart.cart.items[item].product.tags.includes(campaignTag)) {
                            campaignProductsInCart[campaign] = campaignProductsInCart[campaign] + Rebuy.Cart.cart.items[item].quantity || Rebuy.Cart.cart.items[item].quantity;
                        }
                    }
                }
            }
            for (const matchCampaign in campaignProductsInCart) {
                if (campaignProductsInCart[matchCampaign] > campaignProductsBestMatch.count) {
                    if (campaignProductsInCart[matchCampaign] < this.campaigns[matchCampaign]?.threshold) {
                        campaignProductsBestMatch.campaign = matchCampaign;
                        campaignProductsBestMatch.count = campaignProductsInCart[matchCampaign];
                    }
                }
            }
            if (!currentCampaign) {
                for (const matchCampaign in campaignProductsInCart) {
                    if (campaignProductsInCart[matchCampaign] > campaignProductsBestMatch.count) {
                        campaignProductsBestMatch.campaign = matchCampaign;
                        campaignProductsBestMatch.count = campaignProductsInCart[matchCampaign];
                    }
                }
            }
            if (campaignProductsBestMatch.count > 0) {
                currentCampaign = this.campaigns[campaignProductsBestMatch.campaign]
            }
        }

        // Override product matches based on campaign priority
        for (const campaign in this.campaigns) {
            if (this.campaigns[campaign]['priority'] > priority && this.campaigns[campaign]['status'] == "active") {
                currentCampaign = this.campaigns[campaign];
            }
        }
        return currentCampaign;
    }
    getCurrentTier(campaign) {
        let currentTier = false;
        if (campaign?.tiers) {
            for (const tier in campaign.tiers) {
                if (Rebuy.Cart.cart.total_price === 0) {
                    currentTier = 0;
                }
                if (Rebuy.Cart.cart.total_price > campaign.tiers[tier].threshold) {
                    currentTier = tier;
                }
            }
        }
        //console.log('getCurrentTier: ' + currentTier );
        return currentTier;
    }
    getNextTier(campaign, tier) {
        let currentTierKey = parseInt(tier).toString();
        let nextTierKey = (parseInt(tier) + 1).toString();
        let nextTier = false;
        if (campaign?.tiers) {
            if (undefined !== campaign?.tiers[currentTierKey] && undefined !== campaign?.tiers[nextTierKey]) {
                nextTier = campaign.tiers[nextTierKey];
            }
        }
        return nextTier;
    }
    getDifferenceToNextTier(campaign, tier) {
        let difference = false;
        let nextTier = (parseInt(tier) + 1).toString();
        if (campaign?.tiers) {
            if (undefined !== campaign?.tiers[tier] && undefined === campaign?.tiers[nextTier]) {
                difference = 0;
            }
            if (undefined !== campaign?.tiers[nextTier] && (campaign?.tiers[nextTier].threshold > Rebuy.Cart.cart.total_price )) {
                difference = campaign?.tiers[nextTier].threshold - Rebuy.Cart.cart.total_price;
            }
        }
        //console.log('getDifferenceToNextTier: ' + difference );
        return difference;
    }
    getProductCountNeeded(campaign) {
        let count = 0;
        if (Rebuy?.Cart?.cart?.items.length > 0) {
            if (campaign?.tag && campaign.status == "active") {
                for (const item in Rebuy.Cart.cart.items) {
                    if (Rebuy.Cart.cart.items[item].product.tags.includes(campaign.tag)) {
                        count = count + Rebuy.Cart.cart.items[item].quantity || Rebuy.Cart.cart.items[item].quantity;
                    }
                }
            }
        }
        if ((campaign.threshold - count) > 0) {
            count = campaign.threshold - count;
        } else {
            count = 0;
        }
        //console.log('getProductCountNeeded: ' + count );
        return count; 
    }
    getMessage(campaign) {
        let message = {
            "text": "",
            "type": "",
            "background": "",
            "color": "",
            "progress": ""
        };
        if (campaign) {
            if (undefined !== campaign?.tiers && false !== this.getCurrentTier(campaign)) {
                let tier = this.getCurrentTier(campaign);

                message.text = campaign.tiers[tier].message;
                message.text = message.text.replace('[difference]', slate.Currency.formatMoney(this.getDifferenceToNextTier(campaign, tier), theme.moneyFormat));
                if (Rebuy.Cart.cart.total_price === 0) {
                    message.text = message.text.replace('more ', '');
                }
                if (undefined !== campaign.tiers[tier]?.color) {
                    message.color = campaign.tiers[tier].color;
                }
                if (undefined !== campaign.tiers[tier]?.background) {
                    message.background = campaign.tiers[tier].background;
                }

                let nextTier = this.getNextTier(campaign, tier);
                if (nextTier) {
                    message.progress = 1 - this.getDifferenceToNextTier(campaign, tier) / (nextTier.threshold - campaign.tiers[tier].threshold);
                }
                
               message.type = "complete";
            } else {
                let count = this.getProductCountNeeded(campaign);
                if (count == 0 && undefined !== campaign.message.complete) {
                    message.text = campaign.message.complete;
                    message.type = "complete";
                    message.progress = 1;
                }
                if (count > 0 && undefined !== campaign.message.complete) {
                    message.text = campaign.message.progress;
                    message.text = message.text.replace('[count]', count);
                    message.progress = count / this.getProductCountNeeded(campaign);
                    if (count == 1) {
                        message.text = message.text.replace('Shorts', 'Short');
                        message.text = message.text.replace('Tees', 'Tee');
                    }
                    message.type = "progress";
                }
                if (undefined !== campaign?.color) {
                    message.color = campaign.color;
                }
                if (undefined !== campaign?.background) {
                    message.background = campaign.background;
                }
            }
        } else {
            message = false;
        }
        if ( (message === false && $('.site-banner').length > 0) || (Rebuy.Cart.cart.total_price === 0 && $('.site-banner').length > 0) ) {
            message.text = $('.site-banner').data('default-message');
            message.type = 'default';
        }

        //Remove cents if there are no cents
        message.text = message.text.replace('.00','');
        return message;
    }
    displayMessage(location, message) {
        if (message) {
            const defaultColor = '#1b3448';
            const defaultHighlightColor = '#006AFF';
            const defaultBackground = '#006AFF';
            let color = defaultColor;
            let background = defaultBackground;
            let progress = 0;
            if (message?.color) {
                color = message.color;
            }
            if (message?.background) {
                background = message.background;
            }
            if (message?.progress) {
                progress = (message.progress * 100).toString() + '%';
            }
            if (location === 'announcement') {
                $('.site-banner p').fadeOut(250, function(){
                    if (message.type == "default") {
                        if ($('.site-banner').html() !== message.text) {
                            $('.site-banner').css('backgroundColor','');
                            $('.site-banner').html(message.text);
                            $('.site-banner p').css('color','');  
                            $('.site-banner p').fadeIn(250);
                        }
                    }
                    if (message.type == "progress") {
                        $('.site-banner').css('backgroundColor', background);
                        $('.site-banner').html(message.text);
                        $('.site-banner p').css('color',color);     
                        $('.site-banner p').fadeIn(250);
                        setTimeout(function () {
                            $('.site-banner').css('backgroundColor', '');
                        }, 5000); 
                    }
                    if (message.type == "complete") {
                        $('.site-banner').css('backgroundColor', background);
                        $('.site-banner').html(message.text);
                        $('.site-banner p').css('color',color);      
                        $('.site-banner p').fadeIn(250);
                    }
                });
            }
            if (location === 'smartcart') {
                if ($('.rebuy-cart__flyout-promo-bar').length === 0) {
                    $('.rebuy-cart__flyout-body').prepend('<div class="rebuy-cart__flyout-promo-bar"><div class="rebuy-cart__flyout-promo-bar-message"></div><div class="rebuy-cart__flyout-promo-bar-meter"><div class="rebuy-cart__flyout-promo-bar-meter-fill"></div></div></div>');
                }                
                $('.rebuy-cart__flyout-promo-bar-message').fadeOut(250, function(){
                    if (message.type == "default") {
                        if ($('.rebuy-cart__flyout-shipping-promo-message').html() !== message.text) {
                            $('.rebuy-cart__flyout-promo-bar').css('backgroundColor','');
                            $('.rebuy-cart__flyout-promo-bar-message').html(message.text).css('color', '');
                            $('.rebuy-cart__flyout-promo-bar-message').fadeIn(250);
                            $('.rebuy-cart__flyout-promo-bar-meter-fill').css('backgroundColor', '').css('width', '');
                        }
                    }
                    if (message.type == "progress") {
                            $('.rebuy-cart__flyout-promo-bar').css('backgroundColor', background);
                            $('.rebuy-cart__flyout-promo-bar-message').html(message.text);
                            $('.rebuy-cart__flyout-promo-bar-message').css('color', color);
                            $('.rebuy-cart__flyout-promo-bar-message').fadeIn(250);

                            if (progress) {
                                $('.rebuy-cart__flyout-promo-bar-meter-fill').css('backgroundColor', color);
                                $('.rebuy-cart__flyout-promo-bar-meter-fill').css('width', progress );
                            }

                        setTimeout(function () {
                            $('.rebuy-cart__flyout-promo-bar').css('backgroundColor', '');
                            $('.rebuy-cart__flyout-promo-bar-message').css('color', '');
                            $('.rebuy-cart__flyout-promo-bar-meter-fill').css('backgroundColor', '');
                        }, 5000); 
                    }
                    if (message.type == "complete") {
                        $('.rebuy-cart__flyout-promo-bar').css('backgroundColor', background);
                        $('.rebuy-cart__flyout-promo-bar-meter-fill').css('backgroundColor', '#fff');
                        $('.rebuy-cart__flyout-promo-bar-message').html(message.text);
                        $('.rebuy-cart__flyout-promo-bar-message').css('color', color);
                        $('.rebuy-cart__flyout-promo-bar-message').fadeIn(250);

                        if (progress) {
                            $('.rebuy-cart__flyout-promo-bar-meter-fill').css('backgroundColor', color);
                            $('.rebuy-cart__flyout-promo-bar-meter-fill').css('width', progress );
                        }
                    }

                    if (progress == 0) {
                        $('.rebuy-cart__flyout-promo-bar-meter').hide();
                    } else {
                        $('.rebuy-cart__flyout-promo-bar-meter').show();
                    }
                });
                this.lastDisplayed = Date.now(); 
            }
        }
    }
}

// Cart Motivator
/*
$(window).on('load', function () {
    let motivator = new CartMotivator(cartMotivatorCampaigns);
    let awaitRebuy__Motivator = setInterval(function () {
      if (undefined !== Rebuy) {
        motivator.displayMessage('announcement', motivator.getMessage(motivator.getCurrentCampaign()));
        motivator.displayMessage('smartcart', motivator.getMessage(motivator.getCurrentCampaign()));
        clearInterval(awaitRebuy__Motivator);
      } else {
        setTimeout(function () {
          clearInterval(awaitRebuy__Motivator);
        }, 10000);
      }
    }, 10);    
    document.addEventListener('rebuy.productsChange', function(settings){
        cartMotivatorSettings.currentTime = Date.now();
        if (((cartMotivatorSettings.currentTime - cartMotivatorSettings.lastDisplayed) > cartMotivatorSettings.frequency || (cartMotivatorSettings.currentTime - cartMotivatorSettings.lastDisplayed) == 0) ) {
            motivator.displayMessage('announcement', motivator.getMessage(motivator.getCurrentCampaign()));
            motivator.displayMessage('smartcart', motivator.getMessage(motivator.getCurrentCampaign()));
        }
    });
});

// BFCM Cart Gift Wrapping
function toggleCartGiftwrapping() {
    let hideGiftwrap = false;
    for (const item in Rebuy.Cart.cart.items) {
        if (Rebuy.Cart.cart.items[item].variant_id == 32267377016921) {
            hideGiftwrap = true;
        }
    }
    if (hideGiftwrap) {
        $('.rebuy-cart__flyout-giftwrapping').removeClass('active');
    } else {
        $('.rebuy-cart__flyout-giftwrapping').addClass('active');
    }
}


$(window).on('load', function () {
    let awaitRebuy__Giftwrapping = setInterval(function () {
      if ( $('.rebuy-cart__flyout-giftwrapping').length > 0 && undefined !== Rebuy?.Cart?.cart) {
          toggleCartGiftwrapping();
        clearInterval(awaitRebuy__Giftwrapping);
      } else {
        setTimeout(function () {
          clearInterval(awaitRebuy__Giftwrapping);
        }, 10000);
      }
    }, 10);    
});

document.addEventListener('rebuy.productsChange', function(){
    toggleCartGiftwrapping();
});
*/

$(window).on('load', function () {
    $('.lp-product-carousel__image-secondary').css('opacity','');
});
/*
function when(namespace, test, callback) {
        let awaitRebuy__Motivator = setInterval(function () {
      if ( $('.rebuy-cart__flyout-giftwrapping').length > 0 && undefined !== Rebuy?.Cart?.cart) {

        callback();

        clearInterval(awaitRebuy__Motivator);
      } else {
        setTimeout(function () {
          clearInterval(awaitRebuy__Motivator);
        }, 10000);
      }
    }, 10);  
}
*/

window.app = window.app || {};
window.app.utils = window.app.utils || {};
window.app.utils.fetchLocalizedPrice = function(url, priceElement) {
  let jsonURL;
  let product; 
  let variant = false;

  if (url.includes('?')) {
    url.split('?');
    jsonURL = url[0];
    variant = url[1];
  } else {
    jsonURL = url;
  }
  jsonURL = `${url}.json`;
  fetch(jsonURL).then(
    (response) => {
    if (response.ok) {
      response.json().then(function (content) {
        let localizedPrice = content.product.variants[0].price;
        let formattedLocalizedPrice = `${window.theme.currency_symbol}${localizedPrice}`;
        formattedLocalizedPrice = formattedLocalizedPrice.replace('.00', '');
        if (priceElement) {
          priceElement.innerHTML = formattedLocalizedPrice;
        } else {
        return formattedLocalizedPrice;
        }
      });
    } else {
      console.error(`There was an error trying to fetchLocalizedPrice on ${jsonURL}. This URL may not be valid`);
    }
  });
}

var setRebuyLocalizationInterval = setInterval(function() {
  if (document.querySelectorAll('.localize-price').length > 0) {
    let rebuyPrices = document.querySelectorAll('.localize-price');
    rebuyPrices.forEach((priceElement) => {
      let localizedPrice = window.app.utils.fetchLocalizedPrice(priceElement.dataset.url, priceElement);
    });
    clearInterval(setRebuyLocalizationInterval);
  } else {
    setTimeout(function() {
      clearInterval(setRebuyLocalizationInterval);
    }, 10000);
  }
}, 1000);
