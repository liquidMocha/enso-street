export const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM';
export const UPDATE_SEARCH_COORDINATES = 'UPDATE_SEARCH_COORDINATES';
export const UPDATE_SEARCH_ADDRESS = 'UPDATE_SEARCH_ADDRESS';
export const USE_ADDRESS_FOR_SEARCH = 'USE_ADDRESS_FOR_SEARCH';
export const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS';

export const UPDATE_SEARCH_TERM_ACTION = (searchTerm) => ({
  type: UPDATE_SEARCH_TERM,
  searchTerm,
});

export const UPDATE_SEARCH_COORDINATES_ACTION = ({ latitude, longitude }) => ({
  type: UPDATE_SEARCH_COORDINATES,
  coordinates: { latitude, longitude },
});

export const UPDATE_SEARCH_ADDRESS_ACTION = (address) => ({
  type: UPDATE_SEARCH_ADDRESS,
  address,
});

export const USE_ADDRESS_FOR_SEARCH_ACTION = () => ({
  type: USE_ADDRESS_FOR_SEARCH,
});

export const UPDATE_SEARCH_RESULTS_ACTION = (searchResults) => ({
  type: UPDATE_SEARCH_RESULTS,
  searchResults,
});
