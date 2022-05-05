import React from "react";
import s from './header.module.css';
import {Link} from "react-router-dom";
import img from './logo.png';

const Header = () => {
    return (
        <header className={s.header}>
            <Link to="/">
                <img className={s.headerLogo} src={img} alt="StarWars" />
            </Link>
        </header>
    );
}

export default Header;