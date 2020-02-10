export const UPDATE_LOCATION = 'UPDATE_LOCATION';

export const UPDATE_LOCATION_ACTION = ({ latitude, longitude }) => ({
  type: UPDATE_LOCATION,
  location: { latitude, longitude },
});
