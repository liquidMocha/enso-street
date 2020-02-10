import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import combinedReducers from './reducers/combinedReducers';

export default createStore(combinedReducers, applyMiddleware(thunkMiddleware));
