import axios from "axios";

const baseUrl = '/api';

export const postItem = (item) => {
    return axios.post(
        baseUrl + '/items', item, {withCredentials: true}
    )
};

export const getAllItemsForUser = () => {
    return axios.get(baseUrl + '/items', {withCredentials: true})
};