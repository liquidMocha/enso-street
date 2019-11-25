import axios from "axios";

const baseUrl = '/api';

export const postItem = (item) => {
    return axios.post(
        baseUrl + '/items', item, {withCredentials: true}
    )
};