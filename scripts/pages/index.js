import { photographerFactory } from '../factories/photographer.js';

async function getPhotographers() {
  try {
    const response = await fetch('./data/photographers.json');
    if (!response.ok) {
      throw new Error('Erreur lors du chargement du fichier Json');
    }
    const photographers = await response.json();
    return { error: false, data: photographers };
  } catch (error) {
    return { error: true, message: error.message };
  }
}

function displayError(errorMessage) {
  const errorDiv = document.createElement('div');
  errorDiv.innerHTML = `<p id="error-container">Erreur : ${errorMessage}</p>`;
  document.body.appendChild(errorDiv);
}

function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    // loader le factory patern des photographer
    const photographerModel = photographerFactory(photographer);
    // loader les card des photographer venant du factory
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const result = await getPhotographers();

  if (result.error) {
    displayError(result.message);
  } else {
    displayData(result.data.photographers);
  }
}

init();
