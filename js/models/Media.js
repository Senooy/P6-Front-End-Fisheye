class Media {
    constructor(data) {
        this._id = data.id
        this._photographerId = data.photographerId
        this._title = data.title
        this._likes = data.likes
        this._date = data.date
        this._price = data.price
    }

    get id() {
        return this._id
    }

    get photographerId() {
        return this._photographerId
    }

    get title() {
        return this._title
    }

    get likes() {
        return this._likes
    }

    get date() {
        return this._date
    }

    get price() {
        return this._price
    }
}

class Image extends Media {
    constructor(data) {
        super(data)
        this._image = data.image
    }
    
    get image() {
        return `/public/assets/portfolio/${this._photographerId}/${this._image}`
    }

    get type() {
        return 'image'
    }
}

class Video extends Media {
    constructor(data) {
        super(data)
        this._video = data.video
    }

    get video() {
        return `/public/assets/portfolio/${this._photographerId}/${this._video}`
    }

    get type() {
        return 'video'
    }
}