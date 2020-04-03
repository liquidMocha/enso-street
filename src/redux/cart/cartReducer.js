import _ from 'lodash';
import { ADD_TO_CART_SELECTION, UPDATE_CART } from './cartAction';
import Cart from './Cart';

const initialState = {
  cart: new Cart([]),
};

export const cartReducer = (state = initialState, action) => {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case UPDATE_CART: {
      const newCart = new Cart(action.cart);
      return { ...newState, cart: newCart };
    }
    case ADD_TO_CART_SELECTION: {
      const newCart = newState.cart;
      const { itemId } = action;

      const selectedBatch = newCart.ownerBatches.find((ownerBatch) => ownerBatch.selected);
      if (selectedBatch) {
        const item = selectedBatch.items.find((itemInCheckoutBatch) => itemInCheckoutBatch.id === itemId);
        if (item) {
          item.selected = true;
        }
      } else {
        const ownerBatch = newCart.ownerBatches.find((batch) => batch.hasItem(itemId));
        ownerBatch.selected = true;
        ownerBatch.items.find((item) => item.id === itemId).selected = true;
      }

      return newState;
    }
    default: {
      return state;
    }
  }
};
