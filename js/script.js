"use strict";
//                          SELECTORS

const planets = document.querySelectorAll(".planet");
const sun = document.querySelector(".planet-sun");

import { searchApi, getPlanetData } from "./modules/api.js";
import {
  blurOverlay,
  searchInput,
  toggleModal,
  modal,
  init,
} from "./modules/display.js";

//                       EVENT LISTERNERS

// Toggle MODAL och BLUR när man klickar på en planet
planets.forEach((planet) => {
  planet.addEventListener("click", (e) => {
    e.preventDefault();
    // Med hjälp av closest() fångar jag alla event på alla element med .planet samt eventuella children av detta. T ex saturnus ring i detta fallet.
    const clicked = e.target.closest(".planet");

    // Jag har indexerat planeterna med data-index 0-8 som här avläses och körs som sökning i APIn
    getPlanetData(clicked.dataset.index);
  });
});

sun.addEventListener("click", (e) => {
  e.preventDefault();
  getPlanetData(e.target.dataset.index);
});

// Toggle MODAL och BLUR när man klickar blurOverlay
blurOverlay.addEventListener("click", (e) => {
  e.preventDefault();
  init();
});

// Toggle MODAL och BLUR om man trycker ESC och om modal innehåller classen inactive
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("inactive")) {
    toggleModal();
  }
});

//
searchInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    searchInput.value
      ? searchApi(searchInput.value)
      : alert("Sökfältet är tomt");
  }
});

planets.forEach((planet) => {
  planet.addEventListener("mouseenter", (e) => {
    Array.from(planet.parentElement.children).forEach((planet) => {
      if (planet === e.target) console.log(planet);
    });
  });
});
