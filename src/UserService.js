import axios from "axios";

const baseUrl = process.env.REACT_APP_SERVER_URL;


export const isUserLoggedIn = () => {
    return axios.get(
        baseUrl + '/users/isLoggedIn',
        {withCredentials: true})
};