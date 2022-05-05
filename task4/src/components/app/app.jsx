import React from 'react';
import s from './app.module.css';
import Header from '../header';
import HomePage from '../pages/home-page';
import MoviePage from '../pages/movie-page';
import PersonPage from '../pages/person-page';
import {Navigate, Route, Routes} from 'react-router-dom';

const App = () => {
    return (
        <div className={s.app}>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/person/:id" element={<PersonPage/>}/>
                <Route path="/movie/:id" element={<MoviePage/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;