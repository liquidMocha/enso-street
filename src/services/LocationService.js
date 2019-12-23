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

export const updateLocation = (location) => {
    return axios.put(baseUrl + `/users/locations/${location.id}`, {location},
        {withCredentials: true})
        .then(response => {
            return response.data;
        });
};

export const autosuggestAddress = (searchTerm) => {
    return axios.get(baseUrl + `/users/locations/autosuggest/${searchTerm}`, {withCredentials: true})
        .then(response => {
            return response.data;
        });
};

export const reverseGeocode = (coordinates) => {
    return axios.get(baseUrl + `/users/locations/reverseGeocode`, {
        params: {latitude: coordinates.latitude, longitude: coordinates.longitude}
    }).then(response => {
        return response.data;
    });
};