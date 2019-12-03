import axios from "axios";

const baseUrl = '/api';

export const postItem = (item) => {
    const imageFilePromise = axios.get(item.imageUrl, {responseType: 'blob'});
    const signedRequestPromise = axios.post(
        baseUrl + '/items', item, {withCredentials: true}
    );

    return Promise.all([imageFilePromise, signedRequestPromise])
        .then(values => {
            axios.put(values[1].data, values[0].data,
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
    return axios.get(baseUrl + '/items', {withCredentials: true})
};