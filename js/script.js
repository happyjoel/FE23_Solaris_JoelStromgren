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
} from "./modules/display.js";

//                       EVENT LISTERNERS

// Toggle MODAL och BLUR när man klickar på en planet
planets.forEach((planet) => {
  planet.addEventListener("click", (e) => {
    e.preventDefault();
    // Använder .closest för att eventlistenern ska lyssna på göra saturnus ring (closest letar efter närmsta parent med class'.planet')
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
  toggleModal();
});

// Toggle MODAL och BLUR om man trycker ESC och om modal innehåller classen inactive
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("inactive")) {
    toggleModal();
  }
});

searchInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    searchApi(searchInput.value);
  }
});

planets.forEach((planet) => {
  planet.addEventListener("mouseenter", (e) => {
    Array.from(planet.parentElement.children).forEach((planet) => {
      if (planet === e.target) console.log(planet);
    });
  });
});
