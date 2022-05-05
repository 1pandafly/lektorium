import React from 'react';
import s from './item.module.css';
import {useNavigate} from "react-router-dom";

const Item = ({item, entity, img}) => {
    let history = useNavigate();

    const gotoItem = () => {
        const path = `/${entity}/${item.id}`;
        history(path);
    }

    return (
        <li onClick={gotoItem} className={s.item}>
            <img src={img} alt="film" className={s.img}/>
            <div className={s.characteristics}>
                <p className={s.name}>{item.title}</p>
            </div>
        </li>
    );
}

export default Item;