import axios from 'axios';

const baseUrl = '/api';

export const getAllCategories = () => axios.get(`${baseUrl}/category`);

export const getItemCountForCategory = async (category) => (await axios.get(`${baseUrl}/category/${category}/count`)).data;
