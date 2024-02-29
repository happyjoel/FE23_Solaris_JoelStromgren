"use strict";
// GENERAL SELECTORS
const planets = document.querySelectorAll(".planet");
const sun = document.querySelector(".planet-sun");

// MODAL SELECTORS

import { searchApi, getPlanetData } from "./modules/api.js";
import {
  blurOverlay,
  searchInput,
  toggleModal,
  modal,
} from "./modules/display.js";

// --------    EVENT LISTERNERS

// Toggle MODAL och BLUR när man klickar på en planet
planets.forEach((planet) => {
  planet.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e.target);
    getPlanetData(e.target.dataset.index);
  });
});

sun.addEventListener("click", (e) => {
  e.preventDefault();
  getPlanetData(e.target.dataset.index);
  console.log(e.target);
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

// --------    FUNCTIONS

// SEARCH FUNCTION
