import React, {useEffect, useState} from 'react';
import s from './items-list.module.css';
import Swapi from "../../services/swapi";
import Spinner from "../spinner";
import Item from "../item";

const ItemsList = ({itemsLinks, entity, entityImg}) => {
    const swapi = new Swapi();
    const [items, setItems] = useState([]);

    useEffect(() => {
        swapi.getArray(itemsLinks)
            .then((res) => {
                setItems(res);
            });
    }, []);

    const renderItems = (items) => {
        return items.map((item, i) => {
            return (
                <Item
                    key={item.id}
                    item={item}
                    entity={entity}
                    img={swapi.getItemImage(item.id, entityImg)}
                />
            );
        });
    }

    if (items.length === 0) {
        return <Spinner/>;
    }

    const itemsHtml = renderItems(items);

    return (
        <div className={s.itemsList}>
            {itemsHtml}
        </div>
    );
}

export default ItemsList;