import axios from 'axios';
import { BASE_URL } from './Constants';

export const getLocations = () => axios.get(`${BASE_URL}/locations`, { withCredentials: true })
  .then((response) => response.data);

export const createLocation = (location) => axios.put(`${BASE_URL}/locations`, { location },
  { withCredentials: true })
  .then((response) => response.data);

export const updateLocation = (location) => axios.put(`${BASE_URL}/locations/${location.id}`, { location },
  { withCredentials: true })
  .then((response) => response.data);

export const autosuggestAddress = (searchTerm, { latitude, longitude }) => axios.get(`${BASE_URL}/locations/autosuggest/${searchTerm}`, {
  params: { latitude, longitude },
  withCredentials: true,
})
  .then((response) => response.data);

export const getDistance = (start, end) => axios.get(`${BASE_URL}/locations/distance`, {
  params: {
    startLatitude: start.latitude,
    startLongitude: start.longitude,
    endLatitude: end.latitude,
    endLongitude: end.longitude,
  },
}).then((response) => Number(response.data.distance));
