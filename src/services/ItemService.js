import axios from 'axios';
import { BASE_URL } from './Constants';

const itemsPath = '/items';

export const postItem = (item) => {
  const categoryValues = item.categories.map((category) => category.value);
  const conditionValue = item.condition.value;

  const itemPayload = {
    imageUrl: item.imageUrl,
    title: item.title,
    rentalDailyPrice: item.rentalDailyPrice,
    deposit: item.deposit,
    categories: categoryValues,
    condition: conditionValue,
    description: item.description,
    canBeDelivered: item.canBeDelivered,
    deliveryStarting: item.deliveryStarting,
    deliveryAdditional: item.deliveryAdditional,
    location: item.location,
  };

  return axios.post(
    BASE_URL + itemsPath, itemPayload, { withCredentials: true },
  );
};

export const getAllItemsForUser = () => axios.get(BASE_URL + itemsPath, { withCredentials: true })
  .then((response) => response.data.map((item) => ({
    ...item,
    rentalDailyPrice: Number(item.rentalDailyPrice),
    deposit: Number(item.deposit),
    deliveryStarting: Number(item.deliveryStarting),
    deliveryAdditional: Number(item.deliveryAdditional),
    categories: item.categories.map((category) => ({ value: category, label: category })),
    condition: { value: item.condition, label: item.condition },
  })));

export const deleteItem = (itemId) => axios.delete(`${BASE_URL}${itemsPath}/${itemId}`, { withCredentials: true });

export const updateItem = (item, imageUrl) => axios.put(`${BASE_URL}${itemsPath}/${item.id}`, {
  rentalDailyPrice: item.rentalDailyPrice,
  searchable: item.searchable,
  title: item.title,
  imageUrl: imageUrl || item.imageUrl,
  condition: item.condition ? item.condition.value : null,
  categories: item.categories ? item.categories.map((category) => category.value) : null,
  description: item.description,
  canBeDelivered: item.canBeDelivered,
  deliveryStarting: item.deliveryStarting,
  deliveryAdditional: item.deliveryAdditional,
  deposit: item.deposit,
  location: {
    address: {
      street: item.location.address.street,
      zipCode: item.location.address.zipCode,
      city: item.location.address.city,
      state: item.location.address.state,
    },
  },
}, { withCredentials: true });

export const getItemById = async (itemId) => (await axios.get(`${BASE_URL}${itemsPath}/${itemId}`)).data;
