import _ from 'lodash';
import { FETCH_ITEM, RECEIVE_ITEM, UPDATE_ITEM_DISTANCE } from './itemAction';

const initialState = {
  currentItem: null,
  fetchingCurrentItem: false,
};

function mapToConditionText(condition) {
  if (condition === 'like-new') {
    return 'Like New';
  }
  if (condition === 'normal-wear') {
    return 'Normal Wear';
  }
  if (condition === 'functional') {
    return 'Functional';
  }
  return '';
}

export default (state = initialState, action) => {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case FETCH_ITEM: {
      return { ...newState, fetchingCurrentItem: true };
    }
    case RECEIVE_ITEM: {
      const conditionText = mapToConditionText(action.item.condition);

      return {
        currentItem: {
          ...action.item,
          condition: conditionText,
          deposit: Number(action.item.deposit),
          rentalDailyPrice: Number(action.item.rentalDailyPrice),
          deliveryAdditional: Number(action.item.deliveryAdditional),
          deliveryStarting: Number(action.item.deliveryStarting),
        },
        fetchingCurrentItem: false,
      };
    }
    case UPDATE_ITEM_DISTANCE: {
      return { ...newState, distance: action.distance };
    }
    default: {
      return state;
    }
  }
};
