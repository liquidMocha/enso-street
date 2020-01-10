import React, {useState} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import HomePage from "./HomePage";
import * as SearchService from "../../services/SearchService";
import SearchResults from "../search/SearchResults";

const HomePageRouter = () => {
    const [searchResults, setSearchResult] = useState([]);

    let history = useHistory();

    const onSearch = async (location) => {
        history.push('/search-result');

        const results = await SearchService.search('', location);
        setSearchResult(results);
    };

    return (
        <Switch>
            <Route exact path="/">
                <HomePage onSearch={onSearch}/>
            </Route>
            <Route exact path="/search-result">
                <SearchResults results={searchResults}/>
            </Route>
        </Switch>
    )
};

export default HomePageRouter