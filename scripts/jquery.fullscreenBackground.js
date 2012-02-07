(function($){
  /**
   * This is an extremely simple-minded tool that uses jQuery to create an image
   * element using the url of the background image on the body element as its src
   * attribute, and apply configurable CSS values to it. Usually, this will be
   * used to resize the image to the full width and/or height of the browser
   * window so that it will behave as a 'fluid' background image.
   *
   * The default options will cause the generated image to occupy 100% of the
   * width and height of the window, regardless of the image's native aspect
   * ratio.
   *
   * @param object overrides Javascript object with the following properties:
   *    css (object): CSS properties suitable for direct use in jQuery's css
   *                  method. In practice, this MUST include position, width,
   *                  height, top or bottom, and left or right.
   *
   *                  The CSS clip property is used to ensure that, if a minWidth
   *                  value is provided, the image is not scaled below that size,
   *                  and that no horizontal scrollbar appears in the browser.
   *      
   *    image (object): object containing id and alt atrributes for generated
   *                    image (normally, alt should be empty for non-content
   *                    images such as this).
   *
   * @example
   *
   * // The following code produces an image that occupies 100% of the screen.
   * // If the screen is resized to less than 1200px in width, the image will
   * // not be scaled, but clipped so that it scales up, but not down.
   * $.fullscreenBackground({
   *   css: {
   *     clip: 'inherit',
   *     height: 600,
   *     left: 0,
   *     minWidth: 1200,
   *     position: 'absolute',
   *     top: 0,
   *     width: '100%'
   *   }
   * });
   *
   * @author Christopher Torgalson <manager@bedlamhotel.com>
   * @version 1.0
   */
  $.fullscreenBackground = function(overrides) {  
    var defaults = {
          css: {
            height: '100%',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%'
          },
          image: {
            alt: '',
            id: 'background-image'
          }
        },
        options = $.extend({}, defaults, overrides),
        $body = $('body'),
        $img = $('<img/>')
          .attr({
            alt: options.image.alt,
            id: options.image.id,
            src: $body.css('backgroundImage').replace(/url\("([^)]+)"\)/g, '$1')
          })
          .css(options.css);
    $img.prependTo($body);
    $(window).resize(function(){
      $img.css({
        clip: 'rect(0 ' + $(window).width() + ' ' + options.css.height + ' 0)'
      });
    });
  }; /* $.fullscreenBackground */
})(jQuery);