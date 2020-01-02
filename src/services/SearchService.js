import axios from "axios";
import {BASE_URL} from './Constants';

const searchPath = '/search';

export const search = (searchTerm, {latitude, longitude, address}) => {
    return axios.post(BASE_URL + searchPath, {
        searchTerm,
        coordinates: (latitude && longitude) ? {latitude, longitude} : null,
        address: address
    }).then(results => {
        return results.data;
    }).catch(error => {
        console.error(error);
    })
};