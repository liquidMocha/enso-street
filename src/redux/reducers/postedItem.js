import {
    UPDATE_POSTED_ITEM_CAN_BE_DELIVERED, UPDATE_POSTED_ITEM_CATEGORIES,
    UPDATE_POSTED_ITEM_CONDITION,
    UPDATE_POSTED_ITEM_DAILY_PRICE,
    UPDATE_POSTED_ITEM_DEPOSIT, UPDATE_POSTED_ITEM_DESCRIPTION,
    UPDATE_POSTED_ITEM_IMAGE_URL, UPDATE_POSTED_ITEM_SIZE,
    UPDATE_POSTED_ITEM_TITLE
} from "../actionTypes";

const initialState = {
    imageUrl: null,
    title: '',
    rentalDailyPrice: 0,
    deposit: 0,
    categories: [],
    condition: {value: 'like-new', label: 'Like new'},
    description: '',
    itemSize: {value: 'small', label: 'Small (can fit in a backpack)'},
    canBeDelivered: false,
    zipCode: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POSTED_ITEM_TITLE: {
            const newTitle = action.payload;

            return Object.assign({}, state, {
                ...state, title: newTitle
            })
        }
        case UPDATE_POSTED_ITEM_IMAGE_URL: {
            return Object.assign({}, state, {
                ...state, imageUrl: action.payload
            })
        }
        case UPDATE_POSTED_ITEM_DAILY_PRICE: {
            return Object.assign({}, state, {
                ...state, rentalDailyPrice: action.payload
            })
        }
        case UPDATE_POSTED_ITEM_DEPOSIT: {
            return Object.assign({}, state, {
                ...state, deposit: action.payload
            })
        }
        case UPDATE_POSTED_ITEM_CATEGORIES: {
            return Object.assign({}, state, {
                ...state, categories: action.payload
            })
        }
        case UPDATE_POSTED_ITEM_CONDITION: {
            return Object.assign({}, state, {
                ...state, condition: action.payload
            })
        }
        case UPDATE_POSTED_ITEM_DESCRIPTION: {
            return Object.assign({}, state, {
                ...state, description: action.payload
            })
        }
        case UPDATE_POSTED_ITEM_SIZE: {
            return Object.assign({}, state, {
                ...state, itemSize: action.payload
            })
        }
        case UPDATE_POSTED_ITEM_CAN_BE_DELIVERED: {
            return Object.assign({}, state, {
                ...state, canBeDelivered: action.payload
            })
        }
        default: {
            return state;
        }
    }
}