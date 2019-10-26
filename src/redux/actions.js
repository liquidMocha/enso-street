import {ADD_SEARCH_LOCATION, CHANGE_RENT_DATE, CHANGE_RETURN_DATE, SELECT_SEARCH_LOCATION} from "./actionTypes";

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

export const addSearchLocation = location => ({
    type: ADD_SEARCH_LOCATION,
    payload: location
});

export const selectSearchLocation = nickname => ({
    type: SELECT_SEARCH_LOCATION,
    payload: nickname
});