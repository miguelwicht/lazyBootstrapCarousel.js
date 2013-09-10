// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "lazyBootstrapCarousel",
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.settings).

            $(this.element).on(
                'slid.bs.carousel', function () {
                    var items = $(this).find('.item');
                    var activeItem = $(this).find('.item.active');
                    var index = items.index(activeItem);
                    var lastIndex = items.length - 1;
                    var nextItem = items.eq(index + 1);
                    var prevItem = items.eq(index - 1);
                    if (index == 0) {
                        prevItem = items.eq(lastIndex)
                    } else if (index == lastIndex) {
                        nextItem = items.eq(0)
                    }

                    nextItemImage = nextItem.find('> img');
                    prevItemImage = prevItem.find('> img');
                    var nextLoader = nextItem.find('.loader');
                    var prevLoader = prevItem.find('.loader');

                    if (nextLoader.length == 0) {
                        nextItem.prepend('<div class="loader center" style="display: none;"><img src="./images/loader.gif" /></div>');
                        nextLoader = nextItem.find('.loader')
                    }
                    if (prevLoader.length == 0) {
                        prevItem.prepend('<div class="loader center" style="display: none;"><img src="./images/loader.gif" /></div>');
                        prevLoader = prevItem.find('.loader')
                    }

                    var nextAndPrev = nextItemImage.add(prevItemImage);
                    nextAndPrev.one('load', function () {
                        $(this).parent().find('.loader').fadeOut();
                        $(this).stop(true, true).animate({
                            opacity: '1.0'
                        }, 300)
                    }).attr('src', function () {
                        return $(this).attr('data-lazy-src')
                    }).each(function () {
                        $(this).parent().find('.loader').show();
                        $(this).css({
                            opacity: '0.0'
                        });
                        if (this.complete || $(this).width() > 0) {
                            $(this).trigger('load');
                            $(this).stop(true, true);
                            $(this).css({
                                opacity: '1.0'
                            });
                            $(this).parent().find('.loader').hide()
                        }
                    })
                }
            );

        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
    };

})( jQuery, window, document );