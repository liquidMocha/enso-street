import _ from 'lodash';
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
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case UPDATE_SEARCH_COORDINATES:
      return {
        ...newState,
        coordinates: {
          latitude: action.coordinates.latitude,
          longitude: action.coordinates.longitude,
        },
      };
    case UPDATE_SEARCH_ADDRESS:
      return {
        ...newState,
        address: action.address,
      };
    case USE_ADDRESS_FOR_SEARCH:
      return {
        ...newState,
        useAddress: true,
      };
    default:
      return state;
  }
};
