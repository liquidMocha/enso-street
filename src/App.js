import React from 'react';
import './styles/App.css';
import SearchBar from "./SearchBar/SearchBar";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import {BrowserRouter, Route} from "react-router-dom";
import ListItem from "./ListItem";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <SearchBar/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/sign-up" component={SignUpPage}/>
                <Route path="/list-item" component={ListItem}/>
            </BrowserRouter>
        );
    }

}

export default App;
