class App {
    constructor() {
        this.$moviesWrapper = document.querySelector('.movies-wrapper')
        this.moviesApi = new MovieApi('/data/new-movie-data.json')
    }

    async main() {
        // Ici je récupère mes films de mon fichier old-movie-data.json
        const moviesData = await this.moviesApi.getMovies()
        
        moviesData
            // Ici, je transforme mon tableau de données en un tableau de classe Movie
            .map(movie => new Movie(movie))
            .forEach(movie => {
                const Template = new MovieCard(movie)
                this.$moviesWrapper.appendChild(
                    Template.createMovieCard()
                )
            })
    }
}

const app = new App()
app.main()

class Movie {
    constructor(data) {
        this._duration = data.duration
        this._picture = data.picture
        this._released_in = data.released_in
        this._synopsis = data.synopsis
        this._title = data.title
    }

    get duration() {
        const hours = Math.floor(this._duration / 60)
        const minutes = this._duration % 60
        return `${hours}h${minutes}`
    }

    get picture() {
        return `/assets/${this._picture}`
    }

    get thumbnail() {
        return `/assets/thumbnails/${this._picture}`
    }

    get released_in() {
        return this._released_in
    }

    get synopsis() {
        return this._synopsis
    }

    get title() {
        return this._title.hasOwnProperty('fr') ? this._title['fr'] : this._title['en']
    }
}




class MovieCard {
    constructor(movie) {
        this._movie = movie
    }

    createMovieCard() {
        const $wrapper = document.createElement('div')
        $wrapper.classList.add('movie-card-wrapper')

        const movieCard = `
            <div class="movie-thumbnail center">
                <img
                    alt="${this._movie.title}"
                    src="${this._movie.thumbnail}"
                />
            </div>
            <h3 class="fs-16 center">${this._movie.title}</h3>
            <p class="fs-14 center">
                <span>${this._movie.released_in}</span>
                -
                <span>${this._movie.duration}</span>
            </p>
        `
        
        $wrapper.innerHTML = movieCard
        return $wrapper
    }
}
