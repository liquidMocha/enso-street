import _ from 'lodash';
import { ADD_TO_CART_SELECTION, REMOVE_FROM_CART_SELECTION, UPDATE_CART } from './cartAction';
import Cart from './Cart';

const initialState = {
  cart: new Cart([]),
};

export default (state = initialState, action) => {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case UPDATE_CART: {
      const newCart = new Cart(action.cart);
      return { ...newState, cart: newCart };
    }
    case ADD_TO_CART_SELECTION: {
      const newCart = newState.cart;
      const { itemId } = action;

      newCart.selectItem(itemId);

      return newState;
    }
    case REMOVE_FROM_CART_SELECTION: {
      const newCart = newState.cart;
      const { itemId } = action;

      newCart.deselectItem(itemId);

      return newState;
    }
    default: {
      return state;
    }
  }
};
