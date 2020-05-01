import axios from 'axios';
import { BASE_URL } from './Constants';

const transactionBasePath = '/transaction';

export const getDeliveryPrice = async (itemIds, deliveryAddress) => (await axios.post(`${BASE_URL}${transactionBasePath}/delivery-quote`,
  { itemIds, deliveryAddress })).data;

export const createPaymentIntent = async (items, needsDelivery, deliveryAddress, rentalDays) => {
  return (await axios.post(`${BASE_URL}${transactionBasePath}/pay`, {
    items: items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    })),
    needsDelivery,
    deliveryAddress,
    rentalDays,
  }, { withCredentials: true }))
    .data.clientSecret;
};
