import React, {useEffect, useState} from "react";
import {getAllItemsForUser} from "../../../services/ItemService";

const MyItems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getAllItemsForUser()
            .then(result => {
                setItems(result.data.sort((a, b) => {
                    const timeA = a.createdOn;
                    const timeB = b.createdOn;
                    if (timeA > timeB) {
                        return -1;
                    } else if (timeA < timeB) {
                        return 1;
                    }
                    return 0;
                }));
            });
    }, []);

    return (
        <div>
            {items.map(item => {
                return (
                    <div key={item.id}>
                        <img src={item.imageUrl} alt='item' />
                        <p>title: {item.title}</p>
                        <p>daily price: {item.rentalDailyPrice}</p>
                        <p>deposit: {item.deposit}</p>
                        <p>condition: {item.condition}</p>
                        <p>description: {item.description}</p>
                        {item.canBeDelivered ?
                            <div>
                                <p>within 3 miles: {item.deliveryStarting}</p>
                                <p>extra: {item.deliveryAdditional}</p>
                            </div> : null}
                    </div>
                )
            })}
        </div>
    )
};

export default MyItems