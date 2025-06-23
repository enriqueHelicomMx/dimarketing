const cards = document.querySelectorAll(".js-card-service");
const heading = document.querySelector(".js-services-heading");
const description = document.querySelector(".js-description-services");

// Definimos los nombres base de archivos sin idioma ni extensión
const servicesFilesBase = [
  "id_touch",
  "google_ads",
  "diseno_web",
  "redes_sociales",
  "impresos",
  "otros"
];


// Detectar idioma, por defecto español si no se detecta o no es inglés
function getLang() {
  const lang = navigator.language || navigator.userLanguage || 'es';
  if (lang.startsWith('en')) return 'en';
  return 'es';
}

const lang = getLang();

async function loadServiceContent(index) {
  const baseName = servicesFilesBase[index] || "otros";
  const filePath = `./services-html/${lang}/${baseName}.html`;

  // Cambiar título
  heading.textContent = (servicesTitles[lang][index]) || "Servicio";

  description.innerHTML = "<p>Cargando...</p>";

  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error("Error al cargar contenido");
    const html = await response.text();
    description.innerHTML = html;
  } catch (error) {
    description.innerHTML = "<p>Error cargando el contenido.</p>";
    console.error(error);
  }

  cards.forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });
}

// Inicializar con la primera tarjeta cargada
loadServiceContent(0);

// Evento click para cargar cada contenido dinámicamente
cards.forEach((el, index) => {
  el.addEventListener("click", () => {
    loadServiceContent(index);
  });
});
