import { combineReducers } from "redux";
import searchCriteria from "./searchCriteria";
import postedItem from "./postedItem";

export default combineReducers({ searchCriteria, postedItem });