// proriété du photographer
export function photographerFactory(data) {
  const {
    id, name, portrait, tagline, city, country, price,
  } = data;
  const picture = `assets/images/Photographers ID Photos/${portrait}`;

  // former la card dans le dom (Intégrer les données et l'id dans l'url et la card)
  function getUserCardDOM() {
    const article = document.createElement('article');
    const href = `./photographer.html?id=${id}`;
    article.innerHTML = `<a href="${href}" aria-label="photographe ${name}" tabindex="0">
    <div class="media_ctn"><img src="${picture}" alt="Photo du profil de ${name}"></div>
            <h2>${name}</h2>
        </a>
        <div aria-label="Informations concernant le photographe">
            <h3>${city}, ${country}</h3>
            <p>${tagline}</p>
            <p aria-label="${price} € / jour">${price} € / jour</p>
        </div>`;
    return (article);
  }
  return { getUserCardDOM };
}
