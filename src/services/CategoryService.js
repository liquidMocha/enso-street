import axios from "axios";

const baseUrl = '/api';

const getAllCategories = () => {
    return axios.get(baseUrl + '/category');
};

const getItemCountForCategory = async (category) => {
    return (await axios.get(baseUrl + `/category/${category}/count`)).data
};

export default {
    getItemCountForCategory,
    getAllCategories
}