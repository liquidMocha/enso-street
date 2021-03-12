import { assoc } from 'ramda';
import {
  ADD_TO_CART_SELECTION,
  REMOVE_FROM_CART_SELECTION,
  UPDATE_CART,
  UPDATE_CART_ITEM_COUNT,
} from './cartAction';
import Cart, { deselectItem, selectItem } from './Cart';

const initialState = {
  cart: new Cart([]),
  itemCount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CART: {
      const newCart = new Cart(action.cart);
      return assoc('cart', newCart, state);
    }
    case ADD_TO_CART_SELECTION: {
      const newCart = selectItem(state.cart, action.itemId);
      return assoc('cart', newCart, state);
    }
    case REMOVE_FROM_CART_SELECTION: {
      const newCart = deselectItem(state.cart, action.itemId);
      return assoc('cart', newCart, state);
    }
    case UPDATE_CART_ITEM_COUNT: {
      return assoc('itemCount', action.count, state);
    }
    default: {
      return state;
    }
  }
};
