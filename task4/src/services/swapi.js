export default class Swapi {
    _baseUrl = 'https://swapi.dev/api';
    _imageBaseUrl = 'https://starwars-visualguide.com/assets/img';

    async getResource(url) {
        const res = await fetch(`${this._baseUrl}${url}`);
        return await res.json();
    }

    getAllMovies = async () => {
        const res = await this.getResource('/films/');
        return res.results.map(this._transformMovies);
    }

    getMovie = async (id) => {
        const movie = await this.getResource(`/films/${id}`);
        return this._transformMovie(movie);
    }

    getPerson = async (id) => {
        const person = await this.getResource(`/people/${id}`);
        return this._transformPerson(person);
    }

    getItemImage = (id, entity) => {
        return `${this._imageBaseUrl}/${entity}/${id}.jpg`;
    }

    getMovieImage = (id) => {
        return `${this._imageBaseUrl}/films/${id}.jpg`;
    }

    getPersonImage = (id) => {
        return `${this._imageBaseUrl}/characters/${id}.jpg`;
    }

    getArray = async (arr) => {
        let requests = arr.map(url => fetch(url).then(res => res.json()));

        const response = await Promise.allSettled(requests)
            .then((res) => {
                return res.map(item => item.value);
            });

        return response.map(this._transformArrayItem);
    }

    _extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _extractIdFromUrl(url) {
        const idRegExp = /\/([0-9]*)\/$/;

        return url.match(idRegExp)[1];
    }

    _transformMovies = (movie) => {
        return {
            id: this._extractId(movie),
            title: movie.title,
            characters: movie.characters,
            params: {
                'Director': movie.director,
                'Producer': movie.producer,
                'Date': movie.release_date,
            }
        };
    }

    _transformMovie = (movie) => {
        return {
            id: this._extractId(movie),
            title: movie.title,
            characters: movie.characters,
            params: {
                'Director': movie.director,
                'Producer': movie.producer,
                'Date': movie.release_date,
            }
        };
    }

    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            title: person.name,
            movies: person.films,
            params: {
                'Birth year': person.birth_year,
                'Gender': person.gender,
                'Height': person.height,
                'Mass': person.mass,
            },
        };
    }

    _transformArrayItem = (item) => {
        if (item.name) {
            return {
                id: this._extractIdFromUrl(item.url),
                title: item.name
            };
        } else {
            return {
                id: this._extractIdFromUrl(item.url),
                title: item.title
            };
        }
    }
}