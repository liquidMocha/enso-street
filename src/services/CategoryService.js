import axios from "axios";
const baseUrl = '/api';

export const getAllCategories = () => {
    return axios.get(baseUrl + '/category');
};