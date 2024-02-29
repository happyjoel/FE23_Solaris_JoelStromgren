let apiKey = "";

import { renderPlanetDescription } from "../modules/display.js";

export { searchApi, getPlanetData };

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
    console.log("Problem att hämta API-nyckel: ", error);
  }
}

// API förfrågan för hämtning av alla planeter
async function getPlanetData(planetID) {
  await getApiKey();
  const url = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies";

  await fetch(url, {
    method: "GET",
    headers: { "x-zocom": `${apiKey}` },
  })
    .then((response) => response.json())
    .then((data) => {
      renderPlanetDescription(data.bodies[planetID]);
    })
    .catch((error) => {
      alert("Something went wrong, Check console! "),
        console.log("error", error);
    });
}

// Funktion för att söka i API efter inmatat värde (input)
const searchApi = async function (input) {
  await getApiKey();
  const response = await fetch(
    "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies",
    {
      method: "GET",
      headers: { "x-zocom": `${apiKey}` },
    }
  );

  const data = await response.json();

  data.bodies.forEach((body) => {
    if (body.name.toLowerCase() === input.toLowerCase()) {
      return renderPlanetDescription(body);
    }
  });
};
