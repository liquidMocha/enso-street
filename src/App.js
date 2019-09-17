import React from 'react';
import './styles/App.css';
import SearchBar from "./SearchBar/SearchBar";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import {BrowserRouter, Route} from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <SearchBar/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/sign-up" component={SignUpPage}/>
            </BrowserRouter>
        );
    }

}

export default App;
