const modal = document.querySelector(".modal");
const searchInput = document.querySelector(".search-input");
const blurOverlay = document.querySelector(".blur-overlay");
const solarSystemContainer = document.querySelector(".solar-system-container");
const popup = document.querySelector(".popup");

export {
  renderPlanetDescription,
  toggleModal,
  blurOverlay,
  searchInput,
  modal,
  popup,
  togglePopup,
  init,
};

addEventListener;

const init = function () {
  popup.classList.add("inactive");
  blurOverlay.classList.add("inactive");
  searchInput.value = "";
  searchInput.classList.add("inactive-opacity");
  modal.classList.add("inactive");
  popup.innerHTML = "";
};

// Function som manipulerar alla planets opacity beroende på vilken planet man hover med muspekaren
const handleHover = function (e) {
  // Med hjälp av closest() fångar jag alla event på alla element med .planet samt eventuella children av detta. T ex saturnus ring i detta fallet.
  const clicked = e.target.closest(".planet");

  if (clicked) {
    if (clicked.classList.contains("planet")) {
      // Sparar target i en variabel
      const planet = e.target.closest(".planet");

      // selecta alla  solarSystemContainer's children med .planet i classlistan
      const siblingPlanets = solarSystemContainer.querySelectorAll(".planet");
      // Här loopar jag genom alla .planet
      siblingPlanets.forEach((el) => {
        // Om el inte är detsamma som planet (target) så justeras el's opacity
        if (el !== planet) {
          opacityChanger(el, this);
        }
      });
    }
  }
};

// Eventlisterners som lyssnar efter muspekare som förs in och ur solarSystemContainer (Då detta är solen + planeternas gemensamma parent)
// Och kallar på handleHover med this-keywordet satt till nedan givna värden
solarSystemContainer.addEventListener("mouseover", handleHover.bind(0.2));
solarSystemContainer.addEventListener("mouseout", handleHover.bind(1));

// Funktion som visar/döljer modal-diven, blur-filtret och tömmer eventuell inmatning i inputfältet
const toggleModal = function () {
  modal.classList.toggle("inactive");
  blurOverlay.classList.toggle("inactive");
  searchInput.value = "";
  searchInput.classList.toggle("inactive-opacity");
};

const opacityChanger = function (el, value) {
  el.style.opacity = value;
};

// Funktion som renderar/visar info om respektive planet
const renderPlanetDescription = function (data) {
  // html som dynamiskt uppdateras baserat på funktionens inmatade värde (data)
  const html = `<header class="modal-header">
    <h1 class="modal-heading">${data.name}</h1>
    <h2 class="modal-subheading">${data.latinName}</h2>
  </header>
  
  <p class="modal-description">
   ${data.desc}
  </p>
  
  <div class="modal-fact-container">
    <div>
      <p class="fact-heading" id="fact-heading-1">OMKRETS</p>
      <p class="fact" id="fact-1">${data.circumference}</p>
    </div>
  
    <div>
      <p class="fact-heading" id="fact-heading-2">KM FRÅN SOLEN</p>
      <p class="fact" id="fact-2">${data.distance}</p>
    </div>
  
    <div>
      <p class="fact-heading" id="fact-heading-3">MAX TEMPERATUR</p>
      <p class="fact" id="fact-3">${data.temp.day}</p>
    </div>
  
    <div>
      <p class="fact-heading" id="fact-heading-4">MIN TEMPERATUR</p>
      <p class="fact" id="fact-4">${data.temp.night}</p>
    </div>
  </div>`;

  // Modal-diven fylls med html-variabelns innehåll.
  modal.innerHTML = html;

  // Kallar på toggleModal-funktionen som visar modal-diven
  toggleModal();
};

// Funktion som visar/döljer varnings popup för felmeddelande
const togglePopup = function (message) {
  popup.insertAdjacentHTML("afterbegin", `<h3>${message}</h3>`);

  if (popup.classList.contains("inactive")) {
    popup.classList.toggle("inactive");
    blurOverlay.classList.toggle("inactive");
    searchInput.value = "";
    searchInput.classList.toggle("inactive-opacity");
  }
};
