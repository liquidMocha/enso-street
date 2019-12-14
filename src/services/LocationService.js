import axios from "axios";

const baseUrl = '/api';

export const getLocations = () => {
    return axios.get(baseUrl + '/users/locations', {withCredentials: true})
        .then(response => {
            return response.data;
        })
};

export const createLocation = (location) => {
    return axios.put(baseUrl + '/users/locations', {location},
        {withCredentials: true})
        .then(response => {
            return response.data;
        })
};