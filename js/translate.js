async function setLanguage(lang) {
  try {
    const res = await fetch(`../translations/${lang}.json`);
    const translations = await res.json();

    // Cambia texto con HTML
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) {
        el.innerHTML = translations[key];
      }
    });

    // Cambia placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (translations[key]) {
        el.placeholder = translations[key];
      }
    });

    // ✅ Cambiar imágenes del banner por idioma
    updateHomeBanners(lang);

    localStorage.setItem("lang", lang);
  } catch (e) {
    console.error("Error cargando idioma", e);
  }
}

function updateHomeBanners(lang) {
  const basePath =
    lang === "en" ? "../assets/img/img_en" : "../assets/img/img_es";

  const banners = ["banner_001", "banner_002", "banner_003", "banner_004"];

  const slides = document.querySelectorAll(".swiper-slide");
  slides.forEach((slide, i) => {
    if (i >= banners.length) return; // Salta si no hay banner correspondiente

    const picture = slide.querySelector("picture");
    const source = picture.querySelector("source");
    const img = picture.querySelector("img");
    const name = banners[i];

    source.srcset = `${basePath}/${name}_mobile.jpg`;
    console.log(source.srcset);
    img.src = `${basePath}/${name}.jpg`;
    img.alt = `Banner ${i + 1}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang");
  let langToUse = "es";

  if (savedLang) {
    langToUse = savedLang;
  } else {
    const browserLang = navigator.language.slice(0, 2);
    if (["es", "en"].includes(browserLang)) {
      langToUse = browserLang;
    }
  }

  setLanguage(langToUse);
});
