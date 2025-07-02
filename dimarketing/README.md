### Step 1: Update HTML Structure

Assuming you have a basic structure for your services section, you can modify it as follows:

```html
<section class="services">
  <div class="box-container">
    <div class="content">
      <div class="services-item active" data-file="id_touch">
        <h3>Service Title 1</h3>
        <div class="description__services">
          <p>Description for Service 1.</p>
        </div>
        <button>Contact Us</button>
      </div>
      <div class="services-item" data-file="google_ads">
        <h3>Service Title 2</h3>
        <div class="description__services">
          <p>Description for Service 2.</p>
        </div>
        <button>Contact Us</button>
      </div>
      <div class="services-item" data-file="diseno_web">
        <h3>Service Title 3</h3>
        <div class="description__services">
          <p>Description for Service 3.</p>
        </div>
        <button>Contact Us</button>
      </div>
      <!-- Add more services as needed -->
    </div>
  </div>

  <!-- Carousel for mobile -->
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="services-item" data-file="id_touch">
          <h3>Service Title 1</h3>
          <div class="description__services">
            <p>Description for Service 1.</p>
          </div>
          <button>Contact Us</button>
        </div>
      </div>
      <div class="swiper-slide">
        <div class="services-item" data-file="google_ads">
          <h3>Service Title 2</h3>
          <div class="description__services">
            <p>Description for Service 2.</p>
          </div>
          <button>Contact Us</button>
        </div>
      </div>
      <div class="swiper-slide">
        <div class="services-item" data-file="diseno_web">
          <h3>Service Title 3</h3>
          <div class="description__services">
            <p>Description for Service 3.</p>
          </div>
          <button>Contact Us</button>
        </div>
      </div>
      <!-- Add more slides as needed -->
    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
    <!-- Add Navigation -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</section>
```

### Step 2: CSS Adjustments

You may need to adjust your CSS to ensure that the carousel displays correctly on mobile devices. Here’s an example of how you might do that:

```css
@media (max-width: 768px) {
  .services .box-container .content {
    display: none; /* Hide the default service display on mobile */
  }

  .swiper-container {
    display: block; /* Show the swiper container */
    height: auto; /* Adjust height as needed */
  }

  .swiper-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem; /* Adjust padding as needed */
  }

  .services-item {
    text-align: center; /* Center text for mobile */
  }
}
```

### Step 3: JavaScript for Carousel

You will need to initialize the Swiper carousel in your JavaScript. Make sure to include the Swiper.js library in your project.

```javascript
// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
```

### Step 4: Include Swiper.js

Make sure to include the Swiper.js library in your HTML file. You can add the following lines in the `<head>` section or before the closing `</body>` tag:

```html
<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
```

### Final Notes

- Ensure that you test the implementation on various screen sizes to confirm that the carousel works as expected.
- You may need to adjust styles further based on your design requirements.
- This example assumes you have a basic understanding of HTML, CSS, and JavaScript. Adjust the service titles and descriptions as per your actual content.