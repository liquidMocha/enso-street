import axios from 'axios';

const baseUrl = '/api';

export const getLocations = () => axios.get(`${baseUrl}/locations`, { withCredentials: true })
  .then((response) => response.data);

export const createLocation = (location) => axios.put(`${baseUrl}/locations`, { location },
  { withCredentials: true })
  .then((response) => response.data);

export const updateLocation = (location) => axios.put(`${baseUrl}/locations/${location.id}`, { location },
  { withCredentials: true })
  .then((response) => response.data);

export const autosuggestAddress = (searchTerm, { latitude, longitude }) => axios.get(`${baseUrl}/locations/autosuggest/${searchTerm}`, {
  params: { latitude, longitude },
  withCredentials: true,
})
  .then((response) => response.data);

export const getDistance = (start, end) => axios.get(`${baseUrl}/locations/distance`, {
  params: {
    startLatitude: start.latitude,
    startLongitude: start.longitude,
    endLatitude: end.latitude,
    endLongitude: end.longitude,
  },
}).then((response) => response.data.distance);
