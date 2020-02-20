import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import combinedReducers from './reducers/combinedReducers';

export default createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));
