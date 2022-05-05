import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Swapi from "../../../services/swapi";
import Spinner from "../../spinner";
import MainItem from "../../main-item";
import ItemsList from "../../items-list";
import s from './person-page.module.css';

const PersonPage = () => {
    const swapi = new Swapi();
    const params = useParams();
    const [person, setPerson] = useState(null);

    useEffect(() => {
        swapi.getPerson(params.id)
            .then((person) => {
                setPerson(person);
            });
    }, []);

    if (!person) {
        return <Spinner/>
    }

    return (
        <div className={s.personWrapper}>
            <MainItem item={person} imgSrc={swapi.getPersonImage(person.id)}/>
            <div className={s.personInfoColumns}>
                <ItemsList itemsLinks={person.movies} entity={'movie'} entityImg={'films'}/>
            </div>
        </div>
    );
};

export default PersonPage;