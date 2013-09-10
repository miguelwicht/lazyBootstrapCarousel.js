lazyBootstrapCarousel.js
========================
## Usage

1. Include jQuery and Bootstrap:

	```html
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="dist/jquery.lazyBootstrapCarousel.min.js"></script>
	```
3. Add data-lazy-src to images (src attribute is still needed for the first image and the 2 images surrounding it)
  ```html
  <div id="#my-carousel" class="carousel slide" data-interval="false">
      <div class="carousel-inner">
        <div class="item">
          <img src="images/image1.jpg" data-lazy-src="images/image1.jpg">
        </div>
        <div class="item">
          <img src="images/image2.jpg" data-lazy-src="images/image2.jpg">
        </div>
        <div class="item">
          <img src="" data-lazy-src="images/image3.jpg">
        </div>
        <div class="item">
         <img src="" data-lazy-src="images/image4.jpg">
        </div>
        <div class="item">
         <img src="images/image6.jpg" data-lazy-src="images/image5.jpg">
        </div>
      </div>
  </div>
  ```

4. Call the plugin:

	```javascript
	$(".carousel").lazyBootstrapCarousel();
	```
