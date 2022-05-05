import React from "react";
import s from'./item-param.module.css';

const ItemParam = ({name, value}) => {
    return (
        <p className={s.paramsItem}>{name}: {value}</p>
    );
}

export default ItemParam;