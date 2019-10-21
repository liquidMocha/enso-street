import {createStore} from "redux";
import combinedReducers from "./reducers/combinedReducers";

export default createStore(combinedReducers);