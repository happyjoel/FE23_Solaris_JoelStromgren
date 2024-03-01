// ALLT API-relaterat

import { renderPlanetDescription, togglePopup } from "../modules/display.js";

export { searchApi, getPlanetData };

// Här lagras API-key som hämtas i getApiKey - funktionen så att den blir tillgänglig i global scope för andra funktioner
let apiKey = "";

// API förfrågan om att hämta API-NYCKEL
async function getApiKey() {
  try {
    const response = await fetch(
      "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys",
      { method: "POST" }
    );

    const data = await response.json();

    apiKey = data.key;
  } catch (error) {
    togglePopup(`Problem att hämta API-nyckel: ", ${error}`);
  }
}

// Function som kör alla API anrop
const apiCall = async function () {
  try {
    await getApiKey();
    const response = await fetch(
      "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies",
      {
        method: "GET",
        headers: { "x-zocom": `${apiKey}` },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    togglePopup(`Något blev fel med hämtningen från API:n: ", ${error}`);
    console.log(error);
  }
};

// API förfrågan för hämtning av alla planeter
async function getPlanetData(planetID) {
  try {
    // Anropar API:n via funktionen apiCall() och sparar responsen i variabeln data
    const data = await apiCall();
    // Kör funktion för att rendera/visa respektive planet baserat på inmatade planetID (data-index från html) som körs mot API:n
    renderPlanetDescription(data.bodies[planetID]);
  } catch (error) {
    togglePopup(
      `Något blev fel med renderingen av informationen!: ", ${error}`
    );
  }
}

// Funktion för att söka i API efter inmatat värde (input)
const searchApi = async function (input) {
  try {
    const data = await apiCall();

    // looopar igenom bodies och försöker hitta match mellan inputfield-värdet och faktiska namn på planeterna
    data.bodies.forEach((body) => {
      // Gör både input och body.name till lowercase

      if (body.name.toLowerCase() === input.toLowerCase()) {
        return renderPlanetDescription(body);
      }
    });
  } catch (error) {
    togglePopup(`Något blev fel med din sökning: ", ${error}`);
  }
};
