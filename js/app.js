
class App {
    constructor() {
        this.photographersApi = new PhotographersApi('/data/photographers-data.json')
    }

    async main() {
        const photographers = await this.photographersApi.getAllPhotographers();

        console.log(`photographer : ${JSON.stringify(photographers)}`);

        const photographer = await this.photographersApi.getPhotographerById(930)
        console.log(`un photographe : ${JSON.stringify(photographer)}`);
    }
}

const app = new App()
app.main()