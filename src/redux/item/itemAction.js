import { getItemById } from '../../services/ItemService';
import { getDistance } from '../../services/LocationService';

export const FETCH_ITEM = 'FETCH_ITEM';
export const RECEIVE_ITEM = 'RECEIVE_ITEM';
export const UPDATE_ITEM_DISTANCE = 'UPDATE_ITEM_DISTANCE';

export const fetchItemAction = (itemId) => ({ type: FETCH_ITEM, itemId });

export const receiveItemAction = (item) => ({ type: RECEIVE_ITEM, item });

export const updateCurrentItemDistance = (distance) => ({ type: UPDATE_ITEM_DISTANCE, distance });

export const getItemDistanceAction = (itemCoordinates, searchCoordinates) => (dispatch) => getDistance(itemCoordinates, searchCoordinates)
  .then((distance) => {
    dispatch(updateCurrentItemDistance(distance));
  });

export const getItem = (itemId, searchCoordinates) => (dispatch) => {
  dispatch(fetchItemAction(itemId));

  return getItemById(itemId)
    .then((item) => {
      dispatch(receiveItemAction(item));

      dispatch(getItemDistanceAction(item.location, searchCoordinates));
    });
};
