class Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url
    }

    async get(dataKey) {
        return fetch(this._url)
            .then(res => res.json())
            .then(res => dataKey ? res[dataKey] : res)
            .catch(err => console.log('an error occurs when retrieving the data', err))
    }
}


class PhotographersApi extends Api {
    /**
     * 
     * @param {string} url 
     * 
     */
    constructor(url) {
        super(url)
    }

    async getAllPhotographers() {
        return await this.get('photographers');
    }

    async getPhotographerById(identifiant) {
        const data = await this.get();
        const id = parseInt(identifiant)

        const photographer = data.photographers.find((p) => p.id === id);
        if (!photographer) {
            throw new Error(`Photographer with ID ${id} not found`);
        }
        
        const medias = data.media.filter((m) => m.photographerId === id);

        return { photographer, medias };
    }
}