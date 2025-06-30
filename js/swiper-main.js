window.addEventListener("load", () => {
    const swiper = new Swiper(".home-slide", {
      loop: true,
      initialSlide: 0,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: false, // 🚫 NO autoplay en inicio
      effect: "fade",
    });

    // ✅ Activa autoplay manualmente después del LCP (~3s)
    setTimeout(() => {
      swiper.params.autoplay = {
        delay: 5000,
        disableOnInteraction: false,
      };
      swiper.autoplay.start();
    }, 3500);
  });