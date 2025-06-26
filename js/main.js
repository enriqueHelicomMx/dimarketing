document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".cards-services");
  const serviceItems = document.querySelectorAll(".services-item");
  const cards = Array.from(document.querySelectorAll(".card-item__services"));
  let currentIndex = 0;
  let visibleCards = getVisibleCards();
  let autoplay;

  // Clonar los primeros elementos para efecto infinito
  const clonedCards = cards
    .slice(0, visibleCards)
    .map((card) => card.cloneNode(true));
  clonedCards.forEach((card) => container.appendChild(card));
  const allCards = [...cards, ...clonedCards];

  function getVisibleCards() {
    return window.innerWidth <= 768 ? 1 : 4;
  }

  function showService(fileName) {
    const currentActive = document.querySelector(".services-item.active");
    const nextActive = [...serviceItems].find(
      (item) => item.dataset.file === fileName
    );

    if (!nextActive || currentActive === nextActive) return;

    if (currentActive) {
      currentActive.classList.remove("active");
      currentActive.classList.add("fade-out");

      setTimeout(() => {
        currentActive.classList.remove("fade-out");
        nextActive.classList.add("active");
      }, 300);
    } else {
      nextActive.classList.add("active");
    }
  }

  const indicatorsContainer = document.querySelector(".cards-indicators");

  function renderIndicators() {
    if (!indicatorsContainer) return;
    indicatorsContainer.innerHTML = "";
    const total = Math.ceil(cards.length / visibleCards);
    for (let i = 0; i < total; i++) {
      const dot = document.createElement("span");
      dot.className =
        "indicator-dot" +
        (i === Math.floor(currentIndex / visibleCards) ? " active" : "");
      dot.addEventListener("click", () => {
        currentIndex = i * visibleCards;
        showCards();
      });
      indicatorsContainer.appendChild(dot);
    }
  }

  function showCards() {
    visibleCards = getVisibleCards(); // recalcular por si cambió
    allCards.forEach((card, index) => {
      if (index >= currentIndex && index < currentIndex + visibleCards) {
        card.style.display = "block";
        card.style.opacity = "0";
        card.style.transform = "translateX(10px)";
        requestAnimationFrame(() => {
          card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          card.style.opacity = "1";
          card.style.transform = "translateX(0)";
        });
      } else {
        card.style.display = "none";
      }
    });

    renderIndicators();

    // Mostrar la descripción del primero visible
    const visibleCard = allCards[currentIndex];
    if (visibleCard) {
      const fileName = visibleCard.dataset.file;
      showService(fileName);
    }
  }

  function nextCards() {
    currentIndex++;

    if (currentIndex >= cards.length) {
      setTimeout(() => {
        currentIndex = 0;
        container.style.transition = "none";
        showCards();
        void container.offsetWidth; // reflow
        container.style.transition = "";
      }, 500);
    }

    animateTransition("next");
    showCards();
  }

  function animateTransition(direction) {
    const visible = container.querySelectorAll(".card-item__services");
    visible.forEach((card) => {
      card.style.opacity = "0.7";
      card.style.transform =
        direction === "next" ? "translateX(-20px)" : "translateX(20px)";
    });

    setTimeout(() => {
      visible.forEach((card) => {
        card.style.opacity = "1";
        card.style.transform = "translateX(0)";
        card.style.transition = "all 0.3s ease";
      });
    }, 200);
  }

  // Click para mostrar descripción
  allCards.forEach((card) => {
    card.addEventListener("click", () => {
      const fileName = card.dataset.file;
      showService(fileName);
    });
  });

  // Mostrar por defecto
  showCards();

  // Autoplay
  function startAutoplay() {
    autoplay = setInterval(nextCards, 4000);
  }

  function stopAutoplay() {
    clearInterval(autoplay);
  }

  startAutoplay();

  container.addEventListener("mouseenter", stopAutoplay);
  container.addEventListener("mouseleave", startAutoplay);

  // Detectar resize para adaptar visibleCards
  window.addEventListener("resize", () => {
    visibleCards = getVisibleCards();
    showCards();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const formService = document.getElementById("form-services");

  formService.addEventListener("submit", function (e) {
    e.preventDefault();
    let formdata = new FormData(formService);

    fetch("http://dev.syshelicom.mx/app/supervisors/actions/func_leads.php", {
      method: "POST",
      body: formdata,
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Error en la peticion");
        }

        return response.text();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

const whatsappNumber = "5215548722671"; // Incluye el "52" de México y el número completo

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
