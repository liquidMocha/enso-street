import _ from 'lodash';
import { FETCH_ITEM, RECEIVE_ITEM, UPDATE_ITEM_DISTANCE } from './itemAction';

const initialState = {
  currentItem: null,
  fetchingCurrentItem: false,
};

function mapToConditionText(condition) {
  if (condition === 1) {
    return 'Like New';
  }
  if (condition === 2) {
    return 'Normal Wear';
  }
  if (condition === 3) {
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
        currentItem: { ...action.item, condition: conditionText },
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
