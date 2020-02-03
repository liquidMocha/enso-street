import {combineReducers} from "redux";
import {currentLocation} from "../current_location/currentLocation";
import {searchData} from "../search/searchData";

export default combineReducers({currentLocation, searchData});