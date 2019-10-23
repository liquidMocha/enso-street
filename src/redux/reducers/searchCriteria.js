import {
    ADD_SEARCH_LOCATION,
    CHANGE_RENT_DATE,
    CHANGE_RETURN_DATE,
    SELECT_SEARCH_LOCATION
} from "../actionTypes";

const initialState = {
    locations: [],
    dates: {
        rentDate: new Date(),
        returnDate: new Date()
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECT_SEARCH_LOCATION: {
            const selectedZipCode = action.payload;
            return Object.assign({}, state, {
                ...state,
                locations: state.locations.map(location => {
                    if (location.zipCode === selectedZipCode) {
                        return {
                            ...location,
                            selected: true
                        }
                    } else {
                        return {...location, selected: false};
                    }
                })
            })
        }
        case ADD_SEARCH_LOCATION: {
            const location = action.payload;
            return Object.assign({}, state, {
                ...state,
                locations: [
                    ...state.locations,
                    {
                        nickname: location.nickname,
                        zipCode: location.zipCode
                    }
                ]
            });
        }
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

export const selectedLocation = (state) => {
    return state.searchCriteria.locations.find(location => location.selected) ||
        state.searchCriteria.locations[0];
};