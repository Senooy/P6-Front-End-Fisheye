//Mettre le code JavaScript lié à la page photographer.html
async function getIdByUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id")
}


async function getData() {
    const photographer = await this.photographersApi.getPhotographerById(243)

   const medias = photographer.medias.map(media => new MediasFactory(media))
   console.log(medias);
}

async function initPhotographer() {
    const id = await getIdByUrl();
    console.log(`getId : ${id}`);

    const photographersApi = new PhotographersApi('/data/photographers-data.json')

    try {
        const photographer = await photographersApi.getPhotographerById(parseInt(id))
        console.log(`photographer : ${JSON.stringify(photographer)}`);

    } catch (error) {
        console.error(error);
    }

    
}

initPhotographer();