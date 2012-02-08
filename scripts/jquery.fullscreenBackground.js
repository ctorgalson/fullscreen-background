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
   *    
   *    image (object): object containing id and alt atrributes for generated
   *                    image (normally, alt should be empty for non-content
   *                    images such as this), and also an object containing
   *                    CSS rules suitable for use in jQuery's CSS method. Almost
   *                    certainly should contain position, width, height,
   *                    top or bottom, and left or right.
   *
   *    wrapper (object): object containing id atrribute for wrapper for generated
   *                      image, and also an object containing CSS properties
   *                      suitable for direct use in jQuery's css method. In
   *                      practice, this MUST include position, width, height,
   *                      top or bottom, and left or right.
   *
   *
   * @example
   *
   * // The following code produces an image that occupies 100% of the screen.
   * // If the screen is resized to less than 1200px in width, the image will
   * // not be scaled:
   * //
   * $.fullscreenBackground({
   *   image: {
   *      css: {
   *       height: 100,
   *       left: 0,
   *       minWidth: 1200,
   *       position: 'absolute',
   *       top: 0,
   *       width: '100%'
   *     }
   *   }
   * });
   *
   * @author Christopher Torgalson <manager@bedlamhotel.com>
   * @version 1.1
   */
  $.fullscreenBackground = function(overrides) {  
    var defaults = {
          image: {
            alt: '',
            css: {
              height: '100%',
              left: 0,
              position: 'absolute',
              top: 0,
              width: '100%'
            },
            id: 'background-image'
          },
          wrapper: {
            css: {
              height: '100%',
              left: 0,
              overflow: 'hidden',
              position: 'absolute',
              top: 0,
              width: '100%'
            },
            id: 'background-image-wrapper'
          }
        },
        options = $.extend({}, defaults, overrides),
        $body = $('body'),
        $wrapper = $('<div id="background-image-wrapper" />')
          .css(options.wrapper.css)
          .attr({
            id: options.wrapper.id
          }),
        $img = $('<img/>')
          .css(options.image.css)
          .attr({
            alt: options.image.alt,
            id: options.image.id,
            src: $body.css('backgroundImage').replace(/url\("?([^)|"]+)"?\)/g, '$1')
          })
          .wrap($wrapper);
    $wrapper
      .prependTo($body)
      .append($img);
  }; /* $.fullscreenBackground */
})(jQuery);