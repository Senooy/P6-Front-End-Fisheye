class Lightbox {
    constructor(lightboxId) {
        this._modalSection = document.querySelector('#modal-section');

        this._lightbox = document.querySelector(`#${lightboxId}`);
        this._lightboxCloseBtn = this._lightbox.querySelector('.lightbox__close');
        this._lightboxPrevBtn = this._lightbox.querySelector('.lightbox__nav__prev');
        this._lightboxNextBtn = this._lightbox.querySelector('.lightbox__nav__next');
        this._lightboxContent = this._lightbox.querySelector('.lightbox__media-container');

        this._lightboxCloseBtn.addEventListener('click', () => {
            this.hideLightbox();
        });

        this._lightboxPrevBtn.addEventListener('click', () => {
            this.showPrev();
        });

        this._lightboxNextBtn.addEventListener('click', () => {
            this.showNext();
        });
    }

    showLightbox() {
        this._lightbox.classList.add('active');
        this._modalSection.classList.add('active');
        this.showMedia();
    }

    hideLightbox() {
        this._lightbox.classList.remove('active');
        this._modalSection.classList.remove('active');
    }

    showMedia() {
        // À implémenter dans la classe enfant
    }

    showPrev() {
        // À implémenter dans la classe enfant
    }

    showNext() {
        // À implémenter dans la classe enfant
    }
}

class MediaLightbox extends Lightbox {
    constructor(mediaMap, idMediaClicked, lightboxId) {
        super(lightboxId);

        this._medias = Array.from(mediaMap.values());
        this._currentIndex = Array.from(mediaMap.keys()).indexOf(parseInt(idMediaClicked));
    }

    showMedia() {
        const media = this._medias[this._currentIndex];
        const template = new MediaCard(media);

        this._lightboxContent.innerHTML =  template.createLightBoxMedia();

        if (media.type === 'video') {
            const video = this._lightboxContent.querySelector('.video');
            video.play();
        }
    }

    showPrev() {
        this._currentIndex = (this._currentIndex === 0) ? this._medias.length - 1 : this._currentIndex - 1;
        this.showMedia();
    }

    showNext() {
        this._currentIndex = (this._currentIndex === this._medias.length - 1) ? 0 : this._currentIndex + 1;
        this.showMedia();
    }
}
