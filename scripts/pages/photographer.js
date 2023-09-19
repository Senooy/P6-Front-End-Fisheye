import { mediaFactory } from '../factories/media-factory.js';

const namePhographe = document.querySelector('#namePhotograph');

const lightbox = document.getElementById('lightbox');
const mediaContainer = document.querySelector('#media_container');
const mediaImage = document.querySelector('#lightbox_image');
const mediaVideo = document.querySelector('#lightbox_video');

const emClose = document.querySelector('#emClose');
const emPrev = document.querySelector('#emPrev');
const emNext = document.querySelector('#emNext');

const mediaTitle = document.querySelector('#lightbox_media_title');

let lightboxIsOpen = false;

// Vérifier si la lightbox est ouverte ou pas
function checkLighboxIsOpen() {
  if (lightboxIsOpen) {
    lightbox.style.display = 'block';
  } else {
    lightbox.style.display = 'none';
  }
}

checkLighboxIsOpen();

let photographerMedia = [];

// Fonction pour récupérer le photographer selon l'url et son id qui est dedans
function getPhotographerIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get('id'), 10);
}

// Fonction pour récupérer les données
async function fetchData() {
  const response = await fetch('data/photographers.json');
  const data = await response.json();
  return data;
}

// fonction pour récupérer le photographer selon son id (l'id doit être le même que l'id sur l'url)
function getPhotographerById(data, id) {
  const { photographers } = data;
  return photographers.find((photographer) => photographer.id === id);
}

// fonction pour récupérer les medias du photographer
function getPhotographerMedia(data, photographerId) {
  const { media } = data;
  return media.filter((item) => item.photographerId === photographerId);
}

// Fonction pour afficher les informations du photographe
function displayPhotographerInfo(photographer) {
  const photo = photographer.portrait;
  const { name } = photographer;
  document.querySelector('#photograph_infos > h1').innerHTML = photographer.name;
  namePhographe.innerHTML = photographer.name;
  document.querySelector('#photograph_infos > h2:nth-child(2)').innerHTML = `${photographer.city}, ${photographer.country}`;
  document.querySelector('#photograph_infos > p:nth-child(3)').innerHTML = photographer.tagline;
  document.querySelector('#img_photograph').innerHTML = `<img src="assets/images/Photographers ID Photos/${photo}" alt="Photo du profil de ${name}">`;
}

// Fonction pour vérifier si l'ID du photographe existe
// (met tous les photograpes dans un array et utilise some()
// pour tester s'il existe ou pas)
function checkPhotographerId(data, id) {
  const { photographers } = data;
  // vérifie si au moins un des tableau passe le test
  return photographers.some((photographer) => photographer.id === id);
}

// Fonction pour afficher les likes
function displayTotalLikes(media, photographer) {
  // reduce => fonction qui permet l'accumulation d'un nombre
  const totalLikes = media.reduce((acc, item) => acc + item.likes, 0);
  document.querySelector('#total_likes').textContent = `${totalLikes}`;
  const { price } = photographer;
  document.querySelector('#price').textContent = `${price} € / jour`;
}

// fonction pour trier les media
function sortMedia(media) {
  // récupérer la valeur du select
  const sortSelect = document.getElementById('sort-select');
  const sortBy = parseInt(sortSelect.value, 10);
  // switch selon la selection
  switch (sortBy) {
    // case popularité =>
    // media.sort() qui permet de trier par pop
    case 0: // Trier par popularité
      media.sort((a, b) => b.likes - a.likes);
      break;
    // case date =>
    // media.sort() qui permet de trier par date
    case 1: // Trier par date
      media.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    // case titre =>
    // media.sort() qui permet de trier par titre
    case 2: // Trier par titre
      media.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break;
  }
  return media;
}

// Fonction pour afficher les médias du photographe (mettre le tri d'entrée)
function displayMedia(photographer, media) {
  // variable qui contient les media triés
  const mediaSort = sortMedia(media);

  let mediaHtml = '';

  // item est l'élément et index l'index dans le
  // tableau qui permettra ensuite de pécho l'index
  // et de le mettre dans data-id
  mediaSort.forEach((item, index) => {
    const firstName = photographer.name.split(' ')[0];
    const newFirstName = firstName.replace('-', ' ');
    const mediaFolder = newFirstName;

    const mediaElement = mediaFactory(item, mediaFolder, index);
    // l'index est récupéré et fouttu dans le data-id pour savoir sur quel élément on est
    mediaHtml += `<div id="media_${item.id}" data-id="${index}">
    ${mediaElement}
    </div>`;
  });

  mediaContainer.innerHTML = mediaHtml;

  // gestionnaire d'événement à chaque cœur
  media.forEach((item) => {

    const likeIcon = document.getElementById(`like_${item.id}`);
    let isClicked = false;

    // gérer le clic sur le coeur
    const handleLikeClick = () => {
      if (!isClicked) {
        item.likes++;
        isClicked = true;
        const likesElement = document.querySelector(`#media_${item.id} .likes h3`);
        likesElement.textContent = item.likes;
        const totalLikesElement = document.querySelector('#total_likes');
        const totalLikes = media.reduce((acc, item) => acc + item.likes, 0);
        totalLikesElement.textContent = totalLikes;
        likeIcon.classList.remove('fa-regular');
        likeIcon.classList.add('fa-solid');
      } else {
        item.likes--;
        isClicked = false;
        const likesElement = document.querySelector(`#media_${item.id} .likes h3`);
        likesElement.textContent = item.likes;
        const totalLikesElement = document.querySelector('#total_likes');
        const totalLikes = media.reduce((acc, item) => acc + item.likes, 0);
        totalLikesElement.textContent = totalLikes;
        likeIcon.classList.remove('fa-solid');
        likeIcon.classList.add('fa-regular');
      }
    };

    
    // gestionnaires d'événements du like pour le clavier
    likeIcon.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        handleLikeClick();
      }
    });

    // rôle et attribut tabindex pour permettre le focus avec la touche Tab
    likeIcon.setAttribute('role', 'button');
    likeIcon.setAttribute('tabindex', '0');

    // Ajoute le gestionnaire de clic pour les interactions souris
    likeIcon.addEventListener('click', handleLikeClick);
  });
}

// Fermer la lightbox
function closeLightbox() {
  lightboxIsOpen = false;
  checkLighboxIsOpen();
  stopVideoPlayback();

  emClose.setAttribute('aria-label', 'Fermeture du formulaire de contact');
  emPrev.setAttribute('aria-label', 'Précédent');
  emNext.setAttribute('aria-label', 'Suivant');
  emClose.setAttribute('tabindex', '-1');
  emPrev.setAttribute('tabindex', '-1');
  emNext.setAttribute('tabindex', '-1');

  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.setAttribute('tabindex', '-1');
}

// fonction pour transférer les datas du media
function transfertMediaData() {
  // transferrer la data-id à la lightbox
  const mediaClicked = event.target;
  const mediaDataId = mediaClicked.getAttribute('data-id');
  mediaImage.setAttribute('data-id', mediaDataId);

  const mediaPath = event.target.src;
  openLightbox(mediaDataId, mediaPath, mediaPath);

  mediaImage.src = mediaPath;
}

// écouteur d'event sur les media de la galerie clavier
mediaContainer.addEventListener('keydown', (event) => {
  if (event.code === 'Enter' && event.target.classList.contains('media_obj')) {
    transfertMediaData();
  }
});
// écouteur d'event sur les media de la galerie souris
mediaContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('media_obj')) {
    transfertMediaData();
  }
});

// récupération du dossier correspondant au photographe
function getPhotographerFolderPath(photographerName) {
  const basePath = 'assets/images/';
  const sanitizedFolderName = photographerName.split(' ')[0];
  const newFoldername = sanitizedFolderName.replace('-', ' ');
  const pathPhotographer = `${basePath}${newFoldername}/`;
  return pathPhotographer;
}

emClose.addEventListener('click', closeLightbox);

// Stop la vidéo lors du passage à un média

function stopVideoPlayback() {
  if (mediaVideo) {
    mediaVideo.pause();
  }
}


/* bloquer à la dernière image et ne pas revenir en
arrière au premier élémment si je clique sur next au dernier élément */
async function showNextMedia() {
  const currentElement = mediaImage.style.display === 'block' ? mediaImage : mediaVideo;
  const currentDataId = parseInt(currentElement.getAttribute('data-id'), 10);
  
  // Ici, on utilise le modulo pour avoir une navigation circulaire
  const nextIndex = (currentDataId + 1) % photographerMedia.length;

  console.log("Current Data ID:", currentDataId);
  console.log("Next Index:", nextIndex);

  const data = await fetchData();
  const photographerId = getPhotographerIdFromUrl();
  const photographer = getPhotographerById(data, photographerId);
  const mediaFolder = getPhotographerFolderPath(photographer.name);
  const nextMedia = photographerMedia[nextIndex];
  let mediaSrc = '';

  if (nextMedia.image) {
    mediaSrc = mediaFolder + nextMedia.image;
    mediaImage.setAttribute('data-id', nextIndex);
  } else {
    mediaSrc = mediaFolder + nextMedia.video;
    mediaVideo.setAttribute('data-id', nextIndex);
  }

  setMediaInLightbox(nextIndex, mediaSrc);
  mediaTitle.innerHTML = nextMedia.title;
}



// Voir le media précédent
async function showPrevMedia() {
  const currentDataId = parseInt(mediaImage.getAttribute('data-id'), 10);
  const prevIndex = (currentDataId - 1 + photographerMedia.length) % photographerMedia.length;

  console.log("Current Data ID:", currentDataId);
  console.log("Prev Index:", prevIndex);

  const data = await fetchData();
  const photographerId = getPhotographerIdFromUrl();
  const photographer = getPhotographerById(data, photographerId);
  const mediaFolder = getPhotographerFolderPath(photographer.name);
  let mediaSrc = '';
  const prevMedia = photographerMedia[prevIndex];

  if (prevMedia.image) {
    mediaSrc = mediaFolder + prevMedia.image;
    mediaImage.setAttribute('data-id', prevIndex);
  } else {
    mediaSrc = mediaFolder + prevMedia.video;
    mediaVideo.setAttribute('data-id', prevIndex);
  }

  setMediaInLightbox(prevIndex, mediaSrc);
  mediaTitle.innerHTML = prevMedia.title;
}


// faire en sorte que la lightbox s'adapte soit aux img soit aux video
function adaptLightboxToMedia(lightboxIndex) {
  // lister les media dans un tableau

  const currentMedia = photographerMedia[lightboxIndex];

  mediaImage.style.display = (currentMedia && currentMedia.image) ? 'block' : 'none';
  mediaVideo.style.display = (currentMedia && currentMedia.video) ? 'block' : 'none';

}
// spécifier le media dans la lightbox
function setMediaInLightbox(mediaDataId, mediaSrc) {
  mediaImage.src = mediaSrc;
  mediaVideo.src = mediaSrc;

  const currentDataId = mediaDataId;
  const currentMedia = photographerMedia[currentDataId];
  mediaTitle.innerHTML = currentMedia.title;

  adaptLightboxToMedia(currentDataId);
}



// ouvrir la lightbox
function openLightbox(mediaDataId, mediaSrc) {
  lightboxIsOpen = true;
  checkLighboxIsOpen();
  stopVideoPlayback();

  setMediaInLightbox(mediaDataId, mediaSrc);

  lightbox.setAttribute('aria-hidden', 'false');

  emClose.setAttribute('aria-label', 'Fermer');
  emPrev.setAttribute('aria-label', 'Image précédente');
  emNext.setAttribute('aria-label', 'Image suivante');
  emClose.setAttribute('tabindex', '1');
  emPrev.setAttribute('tabindex', '1');
  emNext.setAttribute('tabindex', '1');
  emPrev.focus();
}

// Les Events de la lightbox:
emClose.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    closeLightbox();
  }
});
emPrev.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    showPrevMedia();
  }
});
emNext.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    showNextMedia();
  }
});

// quand on appuie sur next ou prev lancer showNext ou showPrev
emNext.addEventListener('click', () => {
  stopVideoPlayback(); // Ajouté pour stopper la vidéo lors du passage au média suivant
  showNextMedia();
});
emPrev.addEventListener('click', () => {
  stopVideoPlayback(); // Ajouté pour stopper la vidéo lors du passage au média précédent
  showPrevMedia();
});

// Ajout d'un gestionnaire d'événement keydown sur le document pour gérer les flèches droite et gauche
document.addEventListener('keydown', function(event) {
  if(lightboxIsOpen) {
    switch(event.code) {
      case 'ArrowRight':
        showNextMedia();
        break;
      case 'ArrowLeft':
        showPrevMedia();
        break;
      default:
        break;
    }
  }
});

// Fonction qui initialise les autres fonctions
async function init() {
  const photographerId = getPhotographerIdFromUrl();
  const data = await fetchData();

  if (checkPhotographerId(data, photographerId)) {
    const photographer = getPhotographerById(data, photographerId);
    photographerMedia = getPhotographerMedia(data, photographerId);

    displayPhotographerInfo(photographer);
    getPhotographerFolderPath(photographer.name);
    displayMedia(photographer, photographerMedia);
    displayTotalLikes(photographerMedia, photographer);

    // Écoute de l'événement de changement du select
    const sortSelect = document.getElementById('sort-select');
    sortSelect.addEventListener('change', () => {
      displayMedia(photographer, photographerMedia);
      displayTotalLikes(photographerMedia, photographer);
    });
  } else {
    // redirige vers la page d'accueil si l'ID du photographe n'existe pas
    window.location.href = 'index.html';
  }
}

init();