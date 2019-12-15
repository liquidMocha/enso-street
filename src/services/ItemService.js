import axios from "axios";

const baseUrl = '/api';

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

    const imageFilePromise = axios.get(item.imageUrl, {responseType: 'blob'});
    const signedRequestPromise = axios.post(
        baseUrl + '/items', itemPayload, {withCredentials: true}
    );

    return Promise.all([imageFilePromise, signedRequestPromise])
        .then(values => {
            return axios.put(values[1].data, values[0].data,
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
    return axios.get(baseUrl + '/items', {withCredentials: true});
};

export const deleteItem = (itemId) => {
    return axios.delete(`${baseUrl}/items/${itemId}`, {withCredentials: true});
};