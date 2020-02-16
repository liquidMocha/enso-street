import { combineReducers } from 'redux';
import { searchData } from '../search/searchData';
import { currentLocation } from '../current_location/currentLocation';
import { item } from '../item/item';
import { cart } from '../cart/cart';

export default combineReducers({
  currentLocation, searchData, item, cart,
});
