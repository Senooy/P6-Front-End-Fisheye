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
            .catch(err => console.log('an error occurs', err))
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

    async getPhotographerById(id) {
        const data = await this.get();
        
        const photographer = data.photographers.find((p) => p.id === id);
        const media = data.media.filter((m) => m.photographerId === id);
        
        return { photographer, media };
    }
}