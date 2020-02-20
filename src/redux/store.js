import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducers/rootReducer';

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
