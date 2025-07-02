document.addEventListener("DOMContentLoaded", function () {
  const formService = document.getElementById("form-services");

  formService.addEventListener("submit", function (e) {
    e.preventDefault();
    let formdata = new FormData(formService);

    fetch("https://syshelicom.mx/app/supervisors/actions/func_leads.php", {
      method: "POST",
      body: formdata,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la peticion");
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
        formService.reset(); // Limpiar el formulario
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

const whatsappNumber = "5215532541027"; // Incluye el "52" de México y el número completo

function validateMobile() {
  return /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent);
}

function openWhatsAppChat() {
  const whatsappURLMobile = `https://wa.me/${whatsappNumber}`;
  const whatsappURLEscritorio = `https://web.whatsapp.com/send?phone=${whatsappNumber}`;

  if (validateMobile()) {
    window.location.href = whatsappURLMobile;
  } else {
    window.open(whatsappURLEscritorio, "_blank");
  }
}

document.getElementById("btnWattsapp").addEventListener("click", function (e) {
  e.preventDefault(); // Evita que el enlace actúe como un link normal
  openWhatsAppChat();
});

// Asociación entre cards y servicios
document.addEventListener('DOMContentLoaded', function () {
  const serviceItems = document.querySelectorAll('.services-item');
  const cards = document.querySelectorAll('.cards-services .card');

  // Mapea el orden de los data-file con el orden de las cards
  const dataFiles = [
    'id_touch',
    'google_ads',
    'diseno_web',
    'redes_sociales',
    'impresos',
    'id_cards',
    'identidad',
    'diseno_grafico',
    'crm',
    'animacion',
    'otros'
  ];

  // Asocia cada card con su data-file
  cards.forEach((card, idx) => {
    card.setAttribute('data-file', dataFiles[idx] || '');
    card.addEventListener('click', function () {
      // Quita la clase activa de todos los servicios
      serviceItems.forEach(item => item.classList.remove('active'));
      // Busca el servicio correspondiente y lo activa
      const target = document.querySelector(`.services-item[data-file="${card.getAttribute('data-file')}"]`);
      if (target) {
        target.classList.add('active');
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // Opcional: al hacer click en un servicio, resalta la card correspondiente
  serviceItems.forEach(item => {
    item.addEventListener('click', function () {
      cards.forEach(card => card.classList.remove('active'));
      const target = document.querySelector(`.cards-services .card[data-file="${item.getAttribute('data-file')}"]`);
      if (target) {
        target.classList.add('active');
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
});

// Mostrar/Ocultar grupos de cards de servicios
document.addEventListener('DOMContentLoaded', function () {
  const group1 = document.querySelector('.cards-group-1');
  const group2 = document.querySelector('.cards-group-2');
  const btnMore = document.getElementById('btn-more-services');
  const btnPrev = document.getElementById('btn-prev-services');

  if (btnMore) {
    btnMore.addEventListener('click', function () {
      group1.style.display = 'none';
      group2.style.display = 'grid';
    });
  }
  if (btnPrev) {
    btnPrev.addEventListener('click', function () {
      group2.style.display = 'none';
      group1.style.display = 'grid';
    });
  }
});

// Mostrar solo el servicio seleccionado y ocultar los demás
document.addEventListener('DOMContentLoaded', function () {
  const serviceItems = document.querySelectorAll('.services-item');
  const cards = document.querySelectorAll('.cards-services .card');

  // Mostrar solo el de id_touch por defecto
  serviceItems.forEach(item => {
    if (item.getAttribute('data-file') === 'id_touch') {
      item.style.display = 'block';
      item.classList.add('active');
    } else {
      item.style.display = 'none';
      item.classList.remove('active');
    }
  });

  // Asocia cada card con su data-file
  cards.forEach(card => {
    card.addEventListener('click', function () {
      const file = card.getAttribute('data-file');
      console.log(`Card clicked: ${file}`);
      // Oculta todos los servicios
      serviceItems.forEach(item => {
        item.style.display = 'none';
        item.classList.remove('active');
      });
      // Muestra solo el servicio correspondiente
      const target = document.querySelector(`.services-item[data-file="${file}"]`);
      if (target) {
        target.style.display = 'block';
        target.classList.add('active');
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Selección de elementos
  const serviceItems = document.querySelectorAll('.services-item');
  const group1 = document.querySelector('.cards-group-1');
  const group2 = document.querySelector('.cards-group-2');
  const btnMore = document.getElementById('btn-more-services');
  const btnPrev = document.getElementById('btn-prev-services');

  // Mapeo de data-file para cada grupo de cards
  const group1Files = [
    'id_touch',
    'google_ads',
    'diseno_web',
    'redes_sociales',
    'impresos'
  ];
  const group2Files = [
    'id_cards',
    'identidad',
    'diseno_grafico',
    'crm',
    'animacion'
  ];

  // Función para mostrar solo un servicio
  function showService(dataFile, doScroll = true) {
    serviceItems.forEach(item => {
      if (item.getAttribute('data-file') === dataFile) {
        item.style.display = 'block';
        item.classList.add('active');
        if (doScroll) {
          item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        item.style.display = 'none';
        item.classList.remove('active');
      }
    });
  }

  // Inicialmente muestra solo el primero del grupo 1
  showService(group1Files[0], false);

  // Asocia cards del grupo 1
  group1.querySelectorAll('.card').forEach((card, idx) => {
    // Si es el botón "Otros Servicios", no asocia servicio
    if (card.classList.contains('card-next')) return;
    card.setAttribute('data-file', group1Files[idx]);
    card.addEventListener('click', function () {
      showService(group1Files[idx]);
    });
  });

  // Asocia cards del grupo 2
  group2.querySelectorAll('.card').forEach((card, idx) => {
    // Si es el botón "Volver", no asocia servicio
    if (card.classList.contains('card-prev')) return;
    card.setAttribute('data-file', group2Files[idx]);
    card.addEventListener('click', function () {
      showService(group2Files[idx]);
    });
  });

  // Botón "Ver más" muestra grupo 2 y el primer servicio de ese grupo
  if (btnMore) {
    btnMore.addEventListener('click', function () {
      group1.style.display = 'none';
      group2.style.display = 'grid';
      showService(group2Files[0]);
    });
  }

  // Botón "Volver" muestra grupo 1 y el primer servicio de ese grupo
  if (btnPrev) {
    btnPrev.addEventListener('click', function () {
      group2.style.display = 'none';
      group1.style.display = 'grid';
      showService(group1Files[0]);
    });
  }
});

// Mostrar el botón WhatsApp solo después de hacer scroll en el home
document.addEventListener('DOMContentLoaded', function () {
  const callBtn = document.querySelector('.call');
  const homeSection = document.getElementById('home');

  function toggleCallBtn() {
    const homeBottom = homeSection.getBoundingClientRect().bottom + window.scrollY;
    if (window.scrollY > homeBottom - 100) {
      callBtn.style.display = 'block';
    } else {
      callBtn.style.display = 'none';
    }
  }

  // Oculta al cargar
  callBtn.style.display = 'none';

  window.addEventListener('scroll', toggleCallBtn);
});

// Función para abrir WhatsApp sin mensaje, detectando mobile o desktop
function openWhatsAppService() {
  const whatsappNumber = "5215532541027";
  const isMobile = /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent);
  const url = isMobile
    ? `https://wa.me/${whatsappNumber}`
    : `https://web.whatsapp.com/send?phone=${whatsappNumber}`;
  window.open(url, "_blank");
}

// Asigna evento a todos los botones "Cotiza ahora" de servicios
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.services-item .row button').forEach(btn => {
    btn.addEventListener('click', function () {
      openWhatsAppService();
    });
  });
});

// Hace que el botón principal "Cotiza Ahora" abra WhatsApp
document.addEventListener('DOMContentLoaded', function () {
  const homeCotizarBtn = document.querySelector('.btn-home-cotizar');
  if (homeCotizarBtn) {
    homeCotizarBtn.addEventListener('click', function () {
      openWhatsAppService();
    });
  }
});

// Nueva funcionalidad: selección de cards en grupo
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.cards-group').forEach(group => {
    group.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', function (e) {
        // Quita selección previa
        group.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
        // Marca la seleccionada
        card.classList.add('selected');
        // Activa modo selección en el grupo
        group.classList.add('selected-mode');
      });
    });
    // Opcional: al salir del grupo, quita el modo selección
    group.addEventListener('mouseleave', function () {
      group.classList.remove('selected-mode');
      group.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
    });
  });
});
