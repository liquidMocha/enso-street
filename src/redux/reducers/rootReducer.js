import { combineReducers } from 'redux';
import { searchData } from '../search/searchData';
import { currentLocation } from '../current_location/currentLocation';
import { cartReducer } from '../cart/cartReducer';
import item from '../item/item';

const USER_LOGOUT = 'USER_LOGOUT';

export const logoutAction = () => ({
  type: USER_LOGOUT,
});

const appReducer = combineReducers({
  currentLocation, searchData, item, cart: cartReducer,
});

export default (state, action) => {
  if (action.type === USER_LOGOUT) {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return appReducer(state, action);
};
