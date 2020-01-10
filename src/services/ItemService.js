import axios from "axios";
import Jimp from 'jimp';
import {BASE_URL} from './Constants';

const itemsPath = '/items';
export const postItem = (item) => {
    const categoryValues = item.categories.map(category => {
        return category.value;
    });
    const conditionValue = item.condition.value;

    const itemPayload = {
        imageUrl: item.imageUrl,
        title: item.title,
        rentalDailyPrice: item.rentalDailyPrice,
        deposit: item.deposit,
        categories: categoryValues,
        condition: conditionValue,
        description: item.description,
        canBeDelivered: item.canBeDelivered,
        deliveryStarting: item.deliveryStarting,
        deliveryAdditional: item.deliveryAdditional,
        location: item.location
    };

    const signedRequestPromise = axios.post(
        BASE_URL + itemsPath, itemPayload, {withCredentials: true}
    );

    const imageUrl = item.imageUrl;

    const compressImagePromise = Jimp.read(imageUrl)
        .then(image => {
            return image.scaleToFit(110, 100).getBufferAsync(Jimp.MIME_PNG);
        }).then(binaryBuffer => {
            return binaryBuffer;
        }).catch(error => {
            console.error(`error when compressing image: ${error}`);
        });

    return Promise.all([compressImagePromise, signedRequestPromise])
        .then(values => {
            return axios.put(values[1].data, values[0],
                {
                    headers: {'Content-Type': 'image/jpeg'}
                })
                .then(result => {
                    console.log("response from s3", result);
                }).catch(error => {
                    console.error(error);
                });
        }).catch(error => {
            console.log(error);
        });
};

export const getAllItemsForUser = () => {
    return axios.get(BASE_URL + itemsPath, {withCredentials: true})
        .then(response => {
            return response.data.map(item => {
                return {
                    ...item,
                    rentalDailyPrice: Number(item.rentalDailyPrice),
                    deposit: Number(item.deposit),
                    deliveryStarting: Number(item.deliveryStarting),
                    deliveryAdditional: Number(item.deliveryAdditional),
                    categories: item.categories.map(category => {
                        return {value: category, label: category};
                    }),
                    condition: {value: item.condition, label: item.condition}
                }
            })
        });
};

export const deleteItem = (itemId) => {
    return axios.delete(`${BASE_URL}${itemsPath}/${itemId}`, {withCredentials: true});
};

export const updateItem = (item) => {
    return axios.put(`${BASE_URL}${itemsPath}/${item.id}`, {
        rentalDailyPrice: item.rentalDailyPrice,
        searchable: item.searchable,
        title: item.title,
        condition: item.condition ? item.condition.value : null,
        categories: item.categories ? item.categories.map(category => {
            return category.value
        }) : null,
        description: item.description,
        canBeDelivered: item.canBeDelivered,
        deliveryStarting: item.deliveryStarting,
        deliveryAdditional: item.deliveryAdditional,
        deposit: item.deposit,
        location: item.location ? {
            street: item.location.street,
            zipCode: item.location.zipCode,
            city: item.location.city,
            state: item.location.state
        } : null
    }, {withCredentials: true});
};