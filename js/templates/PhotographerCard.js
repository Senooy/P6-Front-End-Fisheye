class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer;
    }

    createPhotographerCard() {
        const $wrapper = document.createElement('article');
        $wrapper.classList.add('photographer-card')

        const photographerCard = `
            <a href="#">
                <img class="photographerCard__pp" 
                    src="${this._photographer.portrait}" 
                    alt="">
                <h2>${this._photographer.name}</h2>
            </a>

            <p class="photographerCard__details photographerCard__details--localisation">${this._photographer.localisation}</p>
            <p class="photographerCard__details photographerCard__details--tagline">${this._photographer.tagline}</p>
            <p class="photographerCard__details photographerCard__details--price">${this._photographer.price}</p>
        `

        $wrapper.innerHTML = photographerCard;
        return $wrapper;
    }
}