"use strict";

// GENERAL SELECTORS
const planets = document.querySelectorAll(".planet");
const sun = document.querySelector(".planet-sun");
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

// searchInput.addEventListener('submit', (e) => {
// getPlanetData
// })

// --------    FUNCTIONS

const toggleModal = function () {
  modal.classList.toggle("inactive");
  blurOverlay.classList.toggle("inactive");
  searchInput.classList.toggle("inactive-opacity");
};

// API Info

const getPlanetData = function (planetID) {
  fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
    method: "GET",
    headers: { "x-zocom": "solaris-2ngXkR6S02ijFrTP" },
  })
    .then((response) => response.json())
    .then((data) => renderPlanetDescription(data.bodies[planetID]))
    .catch((error) => console.log(error));
};

const renderPlanetDescription = function (data) {
  console.log(data);
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
  modal.innerHTML = "";
  modal.insertAdjacentHTML("afterbegin", html);
  toggleModal();
};
