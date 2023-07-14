
class App {
    constructor() {
        this.$photographersWrapper = document.querySelector('.photographer-section')
        this.photographersApi = new PhotographersApi('/data/photographers-data.json')
    }

    async getData() {
        const photographer = await this.photographersApi.getPhotographerById(243)

       const medias = photographer.medias.map(media => new MediasFactory(media))
       console.log(medias);
    }

    async main() {
        const photographersData = await this.photographersApi.getAllPhotographers();

        photographersData
        .map(photographer => new Photographer(photographer))
        .forEach(photographer => {
            const template = new PhotographerCard(photographer)
            this.$photographersWrapper.appendChild(
                template.createPhotographerCard()
            )
        });
    }
}

const app = new App()
app.main()
app.getData()