
class PhotographerApp {
    constructor() {
        this.URLparams = new URLSearchParams(window.location.search);
        this.photographersApi = new PhotographersApi('/data/photographers-data.json')

        this.mediaListbox = document.querySelector('.mediaListbox')

        this.$photographerWrapper = document.querySelector('.photographer-header')
        this.$mediaWrapper = document.querySelector('.medias-section')
        this.$wrapperInsertLikesAndPrice = document.querySelector('.insertLikesAndPrice')
        this.$wrapperModalNamePhotographer = document.querySelector('#contact-name-photographer')
        this.$wrapperContactForm = document.querySelector('#contact-form')
    }

    async main() {
        try {
            // récupération données du photographe en fonction de l'id de
            const id = await this.URLparams.get("id")
            const photographerData = await this.photographersApi.getPhotographerById(id)

            // création de l'en-tête de la page
            const photographer = new Photographer(photographerData.photographer)

            const templatePhotographer = new PhotographerCard(photographer)
            templatePhotographer.createPhotographerHeader(this.$photographerWrapper)


             // création encart totalLikes + prix du photographe
             const totalLikes = await this.photographersApi.getTotalLikes(photographerData)

             const templateDisplayData = new DisplayData(photographer)
             templateDisplayData.insertLikesAndPrice(this.$wrapperInsertLikesAndPrice, totalLikes)


            // insertion des médias dans la page
            // tri des médias en fonction du bouton cliqué
            const medias = photographerData.medias.map(media => new MediasFactory(media))

            const displayMedia = new DisplayMedia(medias, this.$mediaWrapper, this.mediaListbox);
            displayMedia.render();


            //formulaire
            templateDisplayData.insertNamePhotographer(this.$wrapperModalNamePhotographer)
            const contactForm = new ContactForm("contact-photographer", this.$wrapperContactForm);
            contactForm.generate();

            const response =contactForm.response();
            console.log(`depuis photographerApp : ${response}`);

        } catch (error) {
            console.log(error);
        }
    }
}

const app = new PhotographerApp();

app.main()
