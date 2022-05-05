import React from "react";
import s from './main-item.module.css';
import ItemParam from "../item-param";

const MainItem = ({item, imgSrc}) => {
    const params = Object.keys(item.params);

    const RenderParams = (params) => {
        return params.map((elem) => {
            return (
                <ItemParam name={elem} value={item.params[elem]} key={item.params[elem]}/>
            );
        });
    }

    return (
        <div className={s.mainItem}>
            <div className={s.imageWrapper}>
                <img src={imgSrc} alt={item.title}/>
            </div>
            <div>
                <p className={s.infoTitle}>{item.title}</p>
                {RenderParams(params)}
            </div>
        </div>
    );
}

export default MainItem;