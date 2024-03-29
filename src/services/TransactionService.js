import axios from 'axios';
import { BASE_URL } from './Constants';

const transactionBasePath = '/transaction';

export const getDeliveryPrice = async (itemIds, deliveryAddress) => (
  await axios.post(
    `${BASE_URL}${transactionBasePath}/delivery-quote`,
    { itemIds, deliveryAddress },
  )
).data;

export const createPaymentIntent = async (items, needsDelivery, deliveryAddress, rentDate, returnDate) => (
  await axios.post(
    `${BASE_URL}${transactionBasePath}/pay`,
    {
      items: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      deliveryAddress,
      rentDate,
      returnDate,
    }, { withCredentials: true },
  )
).data.clientSecret;
