const formCtn = document.getElementById('form-ctn');
const background = document.getElementById('bg-panel');

// Variables éléments formulaire
const form = document.querySelector('#form');

const firstName = document.querySelector('#first');
const lastName = document.querySelector('#last');
const email = document.querySelector('#email');
const message = document.querySelector('#message');

const main = document.querySelector('#main');

const contactBtn = document.querySelector('#contactBtn');
const closeBtn = document.querySelector('#closeImg');

// Variables globales d'erreurs
let errorOnFirst;
let errorOnLast;
let errorOnEmail;
let errorOnMess;

// Variables pour error
const errDivFirst = document.querySelector('#error-first');
const errDivLast = document.querySelector('#error-last');
const errDivEmail = document.querySelector('#error-email');
const errDivMess = document.querySelector('#error-message');

const namesForm = /^[a-zA-Z\u00C0-\u017F\- ]+$/;

const emailForm = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;

// tableau des erreurs dédiée
const dataError = {
  empty: 'Merci de remplir ce champ',
  name: 'Veuillez entrer 2 caractères ou plus pour le champ du prénom',
  last: 'Veuillez entrer 2 caractères ou plus pour le champ du nom',
  mail: 'le format d\'email n\'est pas valide',
  message: 'Veuillez entrer un message',
  fname: 'le format du prénom n\'est pas valide',
  lname: 'le format du nom n\'est pas valide',
};

function reset() {
  form.reset();
  errorOnFirst = true;
  errorOnLast = true;
  errorOnEmail = true;
  errorOnMess = true;

  errDivFirst.style.display = 'none';
  errDivLast.style.display = 'none';
  errDivEmail.style.display = 'none';
  errDivMess.style.display = 'none';
}

// Fonction pour activer l'ordre de tabulation personnalisé de la modal
function enableModalTabOrder() {
  const modalElements = document.querySelectorAll('.form-item');
  modalElements.forEach((element) => {
    element.setAttribute('tabindex', '3');
  });
}

// Fonction pour rétablir l'ordre de tabulation normal
function restoreDefaultTabOrder() {
  const modalElements = document.querySelectorAll('.form-item');
  modalElements.forEach((element) => {
    element.setAttribute('tabindex', '0');
  });
}

function deleteForm() {
  document.body.classList.remove('modal-open');

  background.style.display = 'none';
  formCtn.style.display = 'none';

  formCtn.setAttribute('aria-hidden', 'true');
  main.setAttribute('aria-hidden', 'false');

  restoreDefaultTabOrder();
  reset();
}

function createForm() {
  reset();

  form.style.display = 'block';
  background.style.display = 'block';

  formCtn.setAttribute('aria-hidden', 'false');
  main.setAttribute('aria-hidden', 'true');

  enableModalTabOrder();
  document.body.classList.add('modal-open');
  formCtn.style.display = 'block';
  const closeImg = document.querySelector('#first');
  closeImg.focus();
}

contactBtn.addEventListener('click', createForm);
closeBtn.addEventListener('click', deleteForm);

function handleKeyDown(event) {
  if (event.key === 'Escape') {
    deleteForm();
  }
}
window.addEventListener('keydown', handleKeyDown);

document.querySelector('#closeImg').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    deleteForm();
  }
});

// fonction pour checker le prénom
function firstNameCheck() {
  const trimmedFirstName = firstName.value.trim();

  errorOnFirst = false;
  if (trimmedFirstName === '' || trimmedFirstName.length < 2) {
    errorOnFirst = true;
    errDivFirst.innerHTML = dataError.empty;
  } else if (!trimmedFirstName.match(namesForm)) {
    errorOnFirst = true;
    errDivFirst.innerHTML = dataError.fname;
  }
  errDivFirst.style.display = errorOnFirst ? 'block' : 'none';
}

// fonction pour checker le nom
function lastNameCheck() {
  const trimmedLastName = lastName.value.trim();

  errorOnLast = false;

  if (trimmedLastName === '' || trimmedLastName.length < 2) {
    errorOnLast = true;
    errDivLast.innerHTML = dataError.empty;
  } else if (!trimmedLastName.match(namesForm)) {
    errorOnLast = true;
    errDivFirst.innerHTML = dataError.lname;
  }
  errDivLast.style.display = errorOnLast ? 'block' : 'none';
}

// fonction pour checker l'email
function emailCheck() {
  const trimmedEmail = email.value.trim();

  if (trimmedEmail === '') {
    errorOnEmail = true;
    errDivEmail.innerHTML = dataError.empty;
  } else if (trimmedEmail.match(emailForm)) {
    errorOnEmail = false;
    errDivEmail.style.display = 'none';
  } else {
    errorOnEmail = true;
    errDivEmail.innerHTML = dataError.mail;
  }
  errDivEmail.style.display = errorOnEmail ? 'block' : 'none';
}

// fonction pour checker le nom
function messCheck() {
  errorOnMess = false;

  if (message.value === '' || message.value.length <= 15) {
    errorOnMess = true;
    errDivMess.innerHTML = dataError.message;
  }
  errDivMess.style.display = errorOnMess ? 'block' : 'none';
}

// Fonction pour valider les entrées
function validation() {
  if (errorOnFirst === false
    && errorOnLast === false
    && errorOnEmail === false
    && errorOnMess === false) {
    form.style.display = 'none';

    console.log('Prénom:', firstName.value.trim());
    console.log('Nom:', lastName.value.trim());
    console.log('Email:', email.value.trim());
    console.log('Message:', message.value.trim());

    restoreDefaultTabOrder();

    reset();
    deleteForm();
  }
}

// Fonction pour lancer les fonction qui vont checker toutes les entrées
function check() {
  firstNameCheck();
  lastNameCheck();
  emailCheck();
  messCheck();

  validation();
}

// écouter le bouton submit et lancer la fonction check au clic
form.addEventListener('submit', (event) => {
  event.preventDefault();
  check();
});
