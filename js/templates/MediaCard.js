class MediaCard {
    constructor(media) {
        this._media = media;
    }

    createMediaCardV1() {
        const $wrapper = document.createElement('article')
        $wrapper.classList.add('media-card')
        $wrapper.setAttribute('id', this._media.id)

        const media = this._media.type === 'image' ?
            `<img class="media-card__media" src="${this._media.image}" alt="">` :
            `<video class="media-card__media" src="${this._media.video}" alt=""></video>`;

        const mediaCard = `
            ${media}

            <div class="media-card__description">
            <p class="media-card__description__title">${this._media.title}</p>
            <button class="btn-likes">${this._media.likes} <i class="fa-solid fa-heart"></i></button>
          </div>            
        `;

        $wrapper.innerHTML = mediaCard;
        return $wrapper;
    }

    createMediaCard(sortedList) {
        const $wrapper = document.createElement('article')
        $wrapper.classList.add('media-card')

        const media = this._media.type === 'image' ?
            `<img class="media-card__media" src="${this._media.image}" alt="">` :
            `<video class="media-card__media" src="${this._media.video}" alt=""></video>`;

        const mediaCard = `
            ${media}
    
            <div class="media-card__description">
            <p class="media-card__description__title">${this._media.title}</p>
            <button class="btn-likes">${this._media.likes} <i class="fa-solid fa-heart"></i></button>
          </div>            
        `;

        $wrapper.innerHTML = mediaCard;

        // Stocker la référence de l'élément dans une propriété pour une utilisation future
        this._template = $wrapper;

        // Ajouter les écouteurs d'événements
        this._addEventListeners(sortedList);

        // Retourner l'élément
        return $wrapper;
    }

    // Méthode privée qui se charge d'ajouter les écouteurs d'événements
    _addEventListeners(sortedList) {
        // Ajouter l'écouteur pour l'ouverture de la lightbox
        const media = this._template.querySelector('.media-card__media');
        media.addEventListener('click', () => {
            const lightbox = new MediaLightbox(sortedList, this._media.id, 'lightbox');
            lightbox.showLightbox();
        });

        // Ajouter l'écouteur pour la mise à jour des likes
        const btnLike = this._template.querySelector('.btn-likes');
        const updateLike = new UpdateLike();
        btnLike.addEventListener('click', (event) => {
            event.preventDefault();
            updateLike.update(btnLike);
        });
    }

    createLightBoxMedia() {
        const media = this._media.type === 'image' ?
            `<img class="lightbox__media-container__content" src="${this._media.image}" alt="">` :
            `<video class="lightbox__media-container__content video" src="${this._media.video}" alt="" controls loop></video>`;

        const lightboxMedia = `
        ${media}

        <h3>${this._media.title}</h3>
        `;

        return lightboxMedia;
    }
}