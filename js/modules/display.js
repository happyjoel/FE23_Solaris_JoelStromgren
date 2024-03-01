const modal = document.querySelector(".modal");
const searchInput = document.querySelector(".search-input");
const blurOverlay = document.querySelector(".blur-overlay");

export {
  renderPlanetDescription,
  toggleModal,
  blurOverlay,
  searchInput,
  modal,
};

// Funktion som visar/döljer modal-diven, blur-filtret och tömmer eventuell inmatning i inputfältet
const toggleModal = function () {
  modal.classList.toggle("inactive");
  blurOverlay.classList.toggle("inactive");
  searchInput.value = "";
  searchInput.classList.toggle("inactive-opacity");
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
