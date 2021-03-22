import { assoc } from 'ramda';
import {
  UPDATE_SEARCH_ADDRESS,
  UPDATE_SEARCH_COORDINATES,
  USE_ADDRESS_FOR_SEARCH,
} from './searchActions';

const initialState = {
  searchTerm: '',
  useAddress: false,
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
  },
  coordinates: {
    latitude: null,
    longitude: null,
  },
  searchResults: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_COORDINATES:
      return assoc('coordinates', {
        latitude: action.coordinates.latitude,
        longitude: action.coordinates.longitude,
      }, state);
    case UPDATE_SEARCH_ADDRESS:
      return assoc('address', action.address, state);
    case USE_ADDRESS_FOR_SEARCH:
      return assoc('useAddress', true, state);
    default:
      return state;
  }
};
