import { UPDATE_LOCATION } from './CurrentLocaitonActions';

const initialState = {
  latitude: undefined,
  longitude: undefined,
};

export default (state = initialState, action) => {
  if (action.type === UPDATE_LOCATION) {
    return {
      latitude: action.location.latitude,
      longitude: action.location.longitude,
    };
  }
  return state;
};
