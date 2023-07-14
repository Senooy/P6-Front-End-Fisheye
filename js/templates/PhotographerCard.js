class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer;
    }

    createPhotographerCard() {
        const $wrapper = document.createElement('article');
        $wrapper.classList.add('photographer-card')

        //photographer.html/id=${this._photographer.id} --> quel lien mettre pour accéder à la page du photographe ??

        const photographerCard = `
            <a href="/photographer?id=${this._photographer.id}"> 
                <img class="photographer-card__pp" 
                    src="${this._photographer.portrait}" 
                    alt="">
                <h2>${this._photographer.name}</h2>
            </a>

            <p class="photographerCard__details photographer-card__details--localisation">${this._photographer.localisation}</p>
            <p class="photographerCard__details photographer-card__details--tagline">${this._photographer.tagline}</p>
            <p class="photographerCard__details photographer-card__details--price">${this._photographer.price}</p>
        `

        $wrapper.innerHTML = photographerCard;
        return $wrapper;
    }

    createPhotographerPage() {
        
    }
}