
class App {
    constructor() {
        this.$photographersWrapper = document.querySelector('.photographer-section')
        this.photographersApi = new PhotographersApi('/data/photographers-data.json')
    }

    async getData() {
        const photographers = await this.photographersApi.getAllPhotographers();
        console.log(`photographer : ${JSON.stringify(photographers)}`);

        const photographer = await this.photographersApi.getPhotographerById(930)
        console.log(`un photographe : ${JSON.stringify(photographer)}`);
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