import _ from 'lodash';
import { ADD_TO_CART_SELECTION, UPDATE_CART } from './cartAction';

const initialState = {
  cart: new Map(),
};

export const cart = (state = initialState, action) => {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case UPDATE_CART: {
      const newCart = new Map();
      action.cart.forEach((ownerBatch) => {
        newCart.set(ownerBatch.owner, ownerBatch.items);
      });
      return { ...newState, cart: newCart };
    }
    case ADD_TO_CART_SELECTION: {
      newState.cart.forEach((items) => {
        const addedItem = items.find((item) => item.id === action.itemId);
        addedItem.selected = true;
      });

      return newState;
    }
    default: {
      return state;
    }
  }
};
