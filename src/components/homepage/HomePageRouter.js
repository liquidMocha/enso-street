import React from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import HomePage from "./HomePage";
import * as SearchService from "../../services/SearchService";
import SearchResults from "../search/SearchResults";
import {useDispatch} from "react-redux";
import {UPDATE_SEARCH_RESULTS_ACTION} from "../../redux/search/searchActions";

const HomePageRouter = () => {
    const dispatch = useDispatch();

    let history = useHistory();

    const onSearch = async (keyword, location) => {
        history.push('/search-result');

        const results = await SearchService.search(keyword, location);
        dispatch(UPDATE_SEARCH_RESULTS_ACTION(results));
    };

    return (
        <Switch>
            <Route exact path="/">
                <HomePage onSearch={onSearch}/>
            </Route>
            <Route exact path="/search-result">
                <SearchResults/>
            </Route>
        </Switch>
    )
};

export default HomePageRouter