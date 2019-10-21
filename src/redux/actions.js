import {CHANGE_RENT_DATE, CHANGE_RETURN_DATE} from "./actionTypes";

export const changeRentDate = date => ({
    type: CHANGE_RENT_DATE,
    payload: {
        date: date
    }
});

export const changeReturnDate = date => ({
    type: CHANGE_RETURN_DATE,
    payload: {
        date: date
    }
});