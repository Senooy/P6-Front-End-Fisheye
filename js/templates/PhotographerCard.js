class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer;
    }

    createPhotographerCard() {
        const $wrapper = document.createElement('article');
        $wrapper.classList.add('photographer-card')

        const photographerCard = `
            <a href="/lab/photographer-lab.html?id=${this._photographer.id}"> 
                <img class="photographer-card__pp round" 
                    src="${this._photographer.portrait}" 
                    alt="">
                <h2 lang="en">${this._photographer.name}</h2>
            </a>

            <p class="photographer-card__localisation" lang="en">${this._photographer.localisation}</p>
            <p class="photographer-card__tagline">${this._photographer.tagline}</p>
            <p class="photographer-card__price">${this._photographer.price}</p>
        `

        $wrapper.innerHTML = photographerCard;
        return $wrapper;
    }

    createPhotographerHeader($wrapper) {
        const content = `
            <div class="photographer-header__description">
                <h1>${this._photographer.name}</h1>
                <p class="photographer-header__localisation">${this._photographer.localisation}</p>
                <p class="photographer-header__tagline">${this._photographer.tagline}</p>
            </div>

            <button class="btn btn--hover" onclick="toggleForm()">Contactez-moi</button>
            
            <img src="${this._photographer.portrait}" alt="" class="photographer-header__pp round">
        `

        $wrapper.innerHTML = content;
    }
}