import React from "react";
import s from './movie-item.module.css';
import {useNavigate} from "react-router-dom";
import Swapi from "../../services/swapi";

const MovieItem = ({item}) => {
    const swapi = new Swapi();

    let history = useNavigate();

    const gotoMovie = () => {
        const path = `/movie/${item.id}`;
        history(path);
    }

    return (
        <li onClick={gotoMovie} className={s.movieItem}>
            <img src={swapi.getMovieImage(item.id)} alt="film" />
            <div>
                <p className={s.movieName}>{item.title} ({item.params.Date.slice(0, 4)})</p>
            </div>
        </li>
    );
};

export default MovieItem;