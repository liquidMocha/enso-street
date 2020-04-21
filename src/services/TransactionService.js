import axios from 'axios';
import { BASE_URL } from './Constants';

const transactionBasePath = '/transaction';

// eslint-disable-next-line import/prefer-default-export
export const getDeliveryPrice = async (itemIds, deliveryAddress) => (await axios.post(`${BASE_URL}${transactionBasePath}/delivery-quote`,
  { itemIds, deliveryAddress })).data;
