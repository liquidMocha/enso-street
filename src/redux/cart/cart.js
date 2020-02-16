import _ from 'lodash';
import { UPDATE_CART } from './cartAction';

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
    default: {
      return state;
    }
  }
};
