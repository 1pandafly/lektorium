import React, {useEffect, useState} from 'react';
import Swapi from "../../../services/swapi";
import Spinner from "../../spinner/spinner";
import MovieItem from "../../movie-item/movie-item";

const HomePage = () => {
    const swapi = new Swapi();

    useEffect(() => {
        swapi.getAllMovies()
            .then((movies) => {
                setMovies(movies);
            });
    }, []);

    const [movies, setMovies] = useState(null);

    const renderMovies = (items) => {
        return items.map((item, i) => {
            return (
                <MovieItem
                    key={item.id}
                    item={item}
                    img={swapi.getMovieImage(item.id)}
                />
            );
        });
    }

    if (!movies) {
        return <Spinner/>;
    }

    const items = renderMovies(movies);

    return (
        <div>
            <ul>
                {items}
            </ul>
        </div>
    );
};

export default HomePage;