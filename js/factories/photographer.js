function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        const img = document.createElement('img');

        img.setAttribute("src", picture)

        const h2 = document.createElement('h2');
        h2.textContent = name;

        article.appendChild(img);
        article.appendChild(h2);

        return (article);
    }

    return { name, picture, getUserCardDOM }
}

class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer;
    }

    createPhotographerCard() {
        const $wrapper = document.createElement('article');
        $wrapper.classList.add('photographer-card')

        const photographerCard = `
            <a href="#">
                <img class="photographerCard__pp" src="/assets/photographers/${this._photographer.portrait}" alt="">
                <h2>${this._photographer.name}</h2>
            </a>

                <p class="photographerCard__details photographerCard__details--city">${this._photographer.city}, ${this._photographer.country}</p>
                <p class="photographerCard__details photographerCard__details--quote">${this._photographer.tagline}</p>
                <p class="photographerCard__details photographerCard__details--forfait">${this._photographer.price}€/jour</p>
        `

        $wrapper.innerHTML = photographerCard;
        return $wrapper;
    }
}