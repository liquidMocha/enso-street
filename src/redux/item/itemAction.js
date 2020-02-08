import {getItemById} from "../../services/ItemService";

export const UPDATE_CURRENT_ITEM = 'UPDATE_CURRENT_ITEM';
export const FETCH_ITEM = 'FETCH_ITEM';
export const RECEIVE_ITEM = 'RECEIVE_ITEM';

export const fetchItemAction = (itemId) => ({
    type: FETCH_ITEM,
    itemId
});

export const receiveItemAction = (item) => ({
    type: RECEIVE_ITEM,
    item
});

export const getItem = (itemId) => {
    return dispatch => {
        dispatch(fetchItemAction(itemId));

        return getItemById(itemId).then(
            item => dispatch(receiveItemAction(item))
        );
    }
};