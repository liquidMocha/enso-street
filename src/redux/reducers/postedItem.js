import {UPDATE_POSTED_ITEM_TITLE} from "../actionTypes";

const initialState = {
    title: '',
    imagePath: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POSTED_ITEM_TITLE: {
            const newTitle = action.payload;

            return Object.assign({}, state, {
                ...state, title: newTitle
            })
        }
        default: {
            return state;
        }
    }
}