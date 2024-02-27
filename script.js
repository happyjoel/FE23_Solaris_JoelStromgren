"use strict";
// GENERAL SELECTORS
const planets = document.querySelectorAll(".planet");
const sun = document.querySelector("planet-sun");
const modal = document.querySelector(".modal");
const blurOverlay = document.querySelector(".blur-overlay");
const searchInput = document.querySelector(".search-input");

// MODAL SELECTORS
const modalHeading = document.querySelector(".modal-heading");
const modalSubheading = document.querySelector(".modal-subheading");
const modalDescription = document.querySelector(".modal-description");

const modalFactHeading1 = document.getElementById("fact-heading-1");
const modalFactHeading2 = document.getElementById("fact-heading-2");
const modalFactHeading3 = document.getElementById("fact-heading-3");
const modalFactHeading4 = document.getElementById("fact-heading-4");

const modalFact1 = document.getElementById("fact-1");
const modalFact2 = document.getElementById("fact-2");
const modalFact3 = document.getElementById("fact-3");
const modalFact4 = document.getElementById("fact-4");

// --------    EVENT LISTERNERS

// Toggle MODAL och BLUR när man klickar på en planet
planets.forEach((planet) => {
  planet.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e.target);
    toggleBlur();
    toggleModal();
    toggleInputfield();
  });
});

// Toggle MODAL och BLUR när man klickar blurOverlay
blurOverlay.addEventListener("click", (e) => {
  e.preventDefault();
  toggleBlur();
  toggleModal();
  toggleInputfield();
});

// Toggle MODAL och BLUR om man trycker ESC och om modal innehåller classen inactive
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("inactive")) {
    toggleBlur();
    toggleModal();
    toggleInputfield();
  }
});

// --------    FUNCTIONS

const toggleModal = function () {
  modal.classList.toggle("inactive");
};

const toggleBlur = function () {
  blurOverlay.classList.toggle("inactive");
};

const toggleInputfield = function () {
  searchInput.classList.toggle("inactive-opacity");
};
