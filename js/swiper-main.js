const swiper = new Swiper(".home-slide", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  effect: "fade", // puedes usar "slide" o "fade"
});
