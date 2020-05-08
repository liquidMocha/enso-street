import axios from 'axios';
import { BASE_URL } from './Constants';

export const getOrdersReceived = async () => (await axios.get(`${BASE_URL}/order`, { withCredentials: true })).data;

export const cancelOrder = async (orderId) => {
  await axios.post(`${BASE_URL}/order/${orderId}/cancel`, null, { withCredentials: true });
};
