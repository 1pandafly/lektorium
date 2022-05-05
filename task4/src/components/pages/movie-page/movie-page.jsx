import React, {useEffect, useState} from 'react';
import s from './movie-page.module.css';
import {useParams} from "react-router-dom";
import Swapi from "../../../services/swapi";
import Spinner from "../../spinner";
import MainItem from "../../main-item";
import ItemsList from "../../items-list";

const MoviePage = () => {
    const [movie, setMovie] = useState(null);
    const params = useParams();
    const swapi = new Swapi();

    useEffect(() => {
        swapi.getMovie(params.id)
            .then((movie) => {
                setMovie(movie);
            });
    }, []);

    if (!movie) {
        return <Spinner/>
    }

    return (
        <div className={s.movieWrapper}>
            <MainItem item={movie} imgSrc={swapi.getMovieImage(movie.id)}/>
            <div className={s.movieInfoColumns}>
                <ItemsList itemsLinks={movie.characters} entity={'person'} entityImg={'characters'}/>
            </div>
        </div>
    );
};

export default MoviePage;