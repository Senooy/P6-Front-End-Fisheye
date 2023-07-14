const dropdownButton = document.querySelector('.dropdown-toggle');
const dropdownList = document.querySelector('.dropdown-menu');

dropdownButton.addEventListener('click', () => {
  dropdownList.classList.toggle('show');
});

// Masquer le menu déroulant si l'utilisateur clique en dehors du menu
document.addEventListener('click', (event) => {
  if (!event.target.closest('.dropdown')) {
    dropdownList.classList.remove('show');
  }
});

// Mettre à jour le bouton avec l'option sélectionnée
dropdownList.addEventListener('click', (event) => {
  const selectedOption = event.target.textContent;
  dropdownButton.textContent = selectedOption;
  dropdownList.classList.remove('show');
});


const dropdownLinks = document.querySelectorAll('.dropdown-item');

dropdownLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const sortBy = event.target.getAttribute('data-sort-by');
    // Utilisez la valeur de sortBy pour trier votre liste
    console.log(sortBy);
  });
});