import { assoc, mergeDeepRight } from 'ramda';
import { FETCH_ITEM, RECEIVE_ITEM, UPDATE_ITEM_DISTANCE } from './itemAction';

const initialState = {
  currentItem: null,
  fetchingCurrentItem: false,
};

const conditionMap = {
  'like-new': 'Like New',
  'normal-wear': 'Normal Wear',
  functional: 'Functional',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEM: {
      return assoc('fetchingCurrentItem', true, state);
    }
    case RECEIVE_ITEM: {
      return mergeDeepRight(state, {
        currentItem: {
          ...action.item,
          condition: conditionMap[action.item.condition],
          deposit: Number(action.item.deposit),
          rentalDailyPrice: Number(action.item.rentalDailyPrice),
          deliveryAdditional: Number(action.item.deliveryAdditional),
          deliveryStarting: Number(action.item.deliveryStarting),
        },
        fetchingCurrentItem: false,
      });
    }
    case UPDATE_ITEM_DISTANCE: {
      return assoc('distance', action.distance, state);
    }
    default: {
      return state;
    }
  }
};
