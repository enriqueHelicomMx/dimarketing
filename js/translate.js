const originalTexts = {};

function switchHomeImages(lang) {
  const isEN = lang === 'en';

  document.querySelectorAll("picture").forEach((picture) => {
    const source = picture.querySelector("source");
    const img = picture.querySelector("img");

    if (!img || !img.src) return;

    const baseName = img.src.match(/banner_\d{3}/)?.[0];
    if (!baseName) return;

    const mobileSrc = isEN
      ? `./assets/img/img_en/${baseName}_mobile.webp`
      : `./assets/img/img_es/${baseName}_mobile.webp`;

    const desktopSrc = isEN
      ? `./assets/img/img_en/${baseName}.webp`
      : `./assets/img/img_es/${baseName}.webp`;

    if (source) source.setAttribute("srcset", mobileSrc);
    img.setAttribute("src", desktopSrc);
  });
}

async function setLanguage(lang) {
  // ✅ Agregar clase lang-es o lang-en al <html> para controlar estilos
  document.documentElement.classList.remove("lang-es", "lang-en");
  document.documentElement.classList.add(`lang-${lang}`);

  // Mostrar/ocultar impresos según idioma usando clase
  const impresosServices = document.querySelectorAll('.services-item[data-file="impresos"]');
  const impresosCards = document.querySelectorAll('.card[data-file="impresos"]');
  const impresosOption = document.querySelectorAll('.option-impresos');
  impresosServices.forEach(el => el.classList.toggle('hide-impresos', lang === "en"));
  impresosCards.forEach(el => el.classList.toggle('hide-impresos', lang === "en"));
  impresosOption.forEach(el => el.classList.toggle('hide-impresos', lang === "en"));

  if (lang === 'en') {
    try {
      const res = await fetch(`../translations/en.json`);
      const translations = await res.json();

      // Contenido con data-i18n
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const value = translations[key];

        if (value) {
          if (Array.isArray(value)) {
            if (el.tagName === 'UL' || el.tagName === 'DIV') {
              el.innerHTML = '';
              const ul = document.createElement('ul');
              value.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = item;
                ul.appendChild(li);
              });
              el.appendChild(ul);
            } else {
              el.innerHTML = value.join('<br>');
            }
          } else {
            el.innerHTML = value;
          }
        }
      });

      // Placeholder con data-i18n-placeholder
      document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const key = el.getAttribute("data-i18n-placeholder");
        const value = translations[key];
        if (value) {
          el.setAttribute("placeholder", value);
        }
      });

    } catch (err) {
      console.error("Error cargando traducciones en inglés:", err);
    }
  } else {
    // Restaurar contenido original en español
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (originalTexts[key]) {
        el.innerHTML = originalTexts[key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (originalTexts[key]) {
        el.setAttribute("placeholder", originalTexts[key]);
      }
    });
  }

  switchHomeImages(lang);
}

document.addEventListener("DOMContentLoaded", () => {
  // Guardar texto original (español)
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    originalTexts[key] = el.innerHTML;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    originalTexts[key] = el.getAttribute("placeholder");
  });

  let lang = localStorage.getItem('lang');
  if (!lang) {
    const browserLang = navigator.language.slice(0, 2);
    lang = browserLang === "es" ? "es" : "en";
  }

  setLanguage(lang);
});

// Botones de idioma
document.getElementById("btn-es").addEventListener("click", () => {
  localStorage.setItem("lang", "es");
  setLanguage("es");
});

document.getElementById("btn-en").addEventListener("click", () => {
  localStorage.setItem("lang", "en");
  setLanguage("en");
});
