/* Update hearts : get the "media-card__description__likes" --> .innerText --> parseInt --> can add 1 */
class UpdateLike {
    constructor() {
       // this._btnsLike = this.btnsLike = document.querySelectorAll('.btn-likes');
        this._$wrapperTotalLikes = document.querySelector('.total-likes');
    }

    update(btn) {
                if (btn.classList.contains('liked')) {
                    btn.innerHTML = this._subLike(btn)
                    this._$wrapperTotalLikes.innerHTML = this._subLike(this._$wrapperTotalLikes)

                    btn.classList.remove('liked')

                } else {
                    btn.innerHTML = this._addLike(btn)
                    this._$wrapperTotalLikes.innerHTML = this._addLike(this._$wrapperTotalLikes)

                    btn.classList.add('liked')

                }
    }

    _addLike(nodeElement) {
        const up = parseInt(nodeElement.innerText) + 1;
        return `${up} <i class="fa-solid fa-heart"></i>`
    }

    _subLike(nodeElement) {
        const lower = parseInt(nodeElement.innerText) - 1;
        return `${lower} <i class="fa-solid fa-heart"></i>`
    }
}