import {combineReducers} from "redux";
import {currentLocation} from "../current_location/currentLocation";
import {searchData} from "../search/searchData";
import {item} from "../item/item";

export default combineReducers({currentLocation, searchData, item});