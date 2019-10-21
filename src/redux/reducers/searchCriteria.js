import {CHANGE_RENT_DATE, CHANGE_RETURN_DATE} from "../actionTypes";

const initialState = {
    location: {},
    dates: {
        rentDate: new Date(),
        returnDate: new Date()
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_RENT_DATE: {
            const rentDate = action.payload.date;
            return {
                ...state,
                dates: {
                    ...state.dates,
                    rentDate: rentDate
                }
            }
        }
        case CHANGE_RETURN_DATE: {
            const returnDate = action.payload.date;
            return {
                ...state,
                dates: {
                    ...state.dates,
                    returnDate: returnDate
                }
            }
        }
        default: {
            return state;
        }
    }
}