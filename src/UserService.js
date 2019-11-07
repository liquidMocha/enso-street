import axios from "axios";

const baseUrl = '/api';


export const isUserLoggedIn = () => {
    return axios.post(
        baseUrl + '/users/isLoggedIn', null,
        {withCredentials: true})
};