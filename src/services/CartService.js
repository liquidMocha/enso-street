import axios from 'axios';
import { BASE_URL } from './Constants';

const cartPath = '/cart';

export const addItemToCart = (itemId) => axios.put(
  BASE_URL + cartPath, { itemId }, { withCredentials: true },
);

export const removeFromCart = (itemId, removeAll) => axios.delete(
  BASE_URL + cartPath, { data: { itemId, all: removeAll }, withCredentials: true },
);

export const getCart = async () => {
  const { data } = await axios.get(BASE_URL + cartPath, { withCredentials: true });

  return data.ownerBatches;
};
