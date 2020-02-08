import {FETCH_ITEM, RECEIVE_ITEM} from "./itemAction";
import _ from "lodash";

const initialState = {
    currentItem: null,
    fetchingCurrentItem: false
};

export const item = (state = initialState, action) => {
    const newState = _.cloneDeep(state);

    switch (action.type) {
        case FETCH_ITEM: {
            return {...newState, fetchingCurrentItem: true}
        }
        case RECEIVE_ITEM: {
            return {currentItem: action.item, fetchingCurrentItem: false}
        }
        default: {
            return state
        }
    }
};