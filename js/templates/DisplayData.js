class DisplayData {
    constructor(photographer) {
        this._photographer = photographer;
    }

    insertLikesAndPrice($wrapper, likes) {
        const content = `
        <span class="likes">${likes} <i class="fa-solid fa-heart"></i></span>
        <span class="price">${this._photographer.price}</span>
        `

        $wrapper.innerHTML = content;
    }

    insertNamePhotographer($wrapper) {
        $wrapper.innerHTML = `Contactez-moi <br> ${this._photographer.name}`
    }
}
