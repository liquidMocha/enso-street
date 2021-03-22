import { combineReducers } from 'redux';
import currentLocation from '../current_location/currentLocation';
import cart from '../cart/cartReducer';
import UserReducer from '../user/UserReducer';
import item from '../item/item';
import OrderReducer from '../order/OrderReducer';
import searchData from '../search/searchData';

const USER_LOGOUT = 'USER_LOGOUT';

export const logoutAction = () => ({
  type: USER_LOGOUT,
});

const appReducer = combineReducers({
  currentLocation,
  searchData,
  item,
  cart,
  user: UserReducer,
  orders: OrderReducer,
});

export default (state, action) => {
  let newState = state;
  if (action.type === USER_LOGOUT) {
    newState = undefined;
  }

  return appReducer(newState, action);
};
