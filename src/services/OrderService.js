import axios from 'axios';
import { BASE_URL } from './Constants';

export const getOrdersReceived = async () => (await axios.get(`${BASE_URL}/order`, { withCredentials: true })).data;
