class PhotographerPage {
    constructor() {
        this.$photographerWrapper = document.querySelector('.photographer-header')
        this.$mediaWrapper = document.querySelector('.medias-section')
        this.$wrapperInsertLikesAndPrice = document.querySelector('.insertLikesAndPrice')
        this.$wrapperModalNamePhotographer = document.querySelector('.contact-name-photographer')

        this.URLparams = new URLSearchParams(window.location.search);
        this.photographersApi = new PhotographersApi('/data/photographers-data.json')
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

            // insertion des médias dans la page
            const medias = photographerData.medias.map(media => new MediasFactory(media))
            
            medias.forEach(media => {
                const templateMedia = new MediaCard(media)
                this.$mediaWrapper.appendChild(
                    templateMedia.createMediaCard()
                )
            });

            // création encart totalLikes + prix du photographe
            const totalLikes = await this.photographersApi.getTotalLikes(photographerData)

            const templateDisplayData = new DisplayData(photographer)
            templateDisplayData.insertLikesAndPrice(this.$wrapperInsertLikesAndPrice, totalLikes)            
    

            //ajout nom photographe form
           templateDisplayData.insertNamePhotographer(this.$wrapperModalNamePhotographer)

        } catch (error) {
            console.log(error);
        }
    }
}

const photographerPage = new PhotographerPage();

photographerPage.main()
