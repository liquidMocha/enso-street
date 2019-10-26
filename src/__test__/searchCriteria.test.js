import searchCriteria from "../redux/reducers/searchCriteria";
import {ADD_SEARCH_LOCATION, SELECT_SEARCH_LOCATION} from "../redux/actionTypes";

describe('searchCriteria reducer', () => {
    describe('should handle select search location action', () => {
        it('should select the location with the nickname passed in', () => {
            const action = {type: SELECT_SEARCH_LOCATION, payload: 'home'};
            const state = {
                locations: [
                    {nickname: 'work', zipCode: "123"},
                    {nickname: 'home', zipCode: "123"}
                ]
            };
            const newState = searchCriteria(state, action);

            expect(newState.locations[1].selected).toEqual(true);
        });

        it('should only select one location', () => {
            const action = {type: SELECT_SEARCH_LOCATION, payload: '123'};
            const secondAction = {type: SELECT_SEARCH_LOCATION, payload: '345'};
            const state = {
                locations: [
                    {nickname: '123'},
                    {nickname: '345'}
                ]
            };
            const intermediateState = searchCriteria(state, action);
            const actualState = searchCriteria(intermediateState, secondAction);

            expect(actualState.locations[0].selected).toBe(false);
            expect(actualState.locations[1].selected).toBe(true);
        })
    });

    describe('should handle add search location', () => {
        it('should add location', () => {
            const action = {type: ADD_SEARCH_LOCATION, payload: {nickname: 'home', zipCode: '12345'}};

            const newState = searchCriteria({locations: []}, action);

            expect(newState.locations.length).toEqual(1);
            expect(newState.locations[0].zipCode).toEqual('12345');
            expect(newState.locations[0].nickname).toEqual('home');
        })
    })
});