import axios from "axios";

const baseUrl = '/api';

export const isUserLoggedIn = async () => {
    try {
        const response = axios.post(
            baseUrl + '/users/isLoggedIn', null,
            {withCredentials: true});
        return (await response).data.loggedIn;
    } catch (e) {
        return false;
    }
};