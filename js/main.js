document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang");
  const browserLang = navigator.language.slice(0, 2);
  const langToUse = savedLang || (["es", "en"].includes(browserLang) ? browserLang : "es");

  setLanguage(langToUse);
  initServiceCards();
});

// 🔁 Botones para cambiar idioma manualmente
document.querySelectorAll("[data-set-lang]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const newLang = btn.getAttribute("data-set-lang");
    localStorage.setItem("lang", newLang);
    setLanguage(newLang);
    initServiceCards(); // recarga contenido de servicios con el nuevo idioma
  });
});

// 🌐 Cargar traducciones y aplicar
async function setLanguage(lang) {
  try {
    const res = await fetch(`../translations/${lang}.json`);
    const translations = await res.json();

    // Textos
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) el.innerHTML = translations[key];
    });

    // Placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (translations[key]) el.placeholder = translations[key];
    });

    updateHomeBanners(lang);
  } catch (e) {
    console.error("Error cargando idioma", e);
  }
}

// 📸 Actualizar banners por idioma
function updateHomeBanners(lang) {
  const basePath = lang === "en" ? "../assets/img/img_en" : "../assets/img/img_es";
  const banners = ["banner_001", "banner_002", "banner_003", "banner_004"];

  document.querySelectorAll(".swiper-slide").forEach((slide, i) => {
    if (i >= banners.length) return;

    const picture = slide.querySelector("picture");
    const source = picture.querySelector("source");
    const img = picture.querySelector("img");
    const name = banners[i];

    source.srcset = `${basePath}/${name}_mobile.jpg`;
    img.src = `${basePath}/${name}.jpg`;
    img.alt = `Banner ${i + 1}`;
  });
}

// 🧩 Servicios dinámicos según idioma
function initServiceCards() {
  const cards = document.querySelectorAll(".js-card-service");
  const description = document.querySelector(".content-services");

  if (!cards.length || !description) return;

  async function loadServiceContent(fileName) {
    const activeLang = localStorage.getItem("lang") || "es";
    const filePath = `../assets/services/${activeLang}/${fileName}.html`;

    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error("Error al cargar contenido");

      const html = await response.text();
      description.innerHTML = html;
    } catch (error) {
      description.innerHTML = "<p>Error cargando el contenido.</p>";
      console.error(error);
    }

    cards.forEach((el) => {
      el.classList.toggle("active", el.dataset.file === fileName);
    });
  }

  // Cargar el contenido inicial (primera card)
  const activeFile = document.querySelector(".js-card-service.active")?.dataset.file || cards[0].dataset.file;
  loadServiceContent(activeFile);

  // Agregar eventos click
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      loadServiceContent(card.dataset.file);
    });
  });
}
