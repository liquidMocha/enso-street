import React from 'react';
import './styles/App.css';
import SearchBar from "./SearchBar/SearchBar";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import {BrowserRouter, Route} from "react-router-dom";
import ListItem from "./ListItem";

class App extends React.Component {
    render() {
        const baseUrl = process.env.REACT_APP_SERVER_URL;
        return (
            <BrowserRouter>
                <SearchBar/>
                <Route path="/login"
                       component={(props) => <LoginPage {...props} baseUrl={baseUrl}/>}
                />
                <Route path="/sign-up"
                       component={(props) => <SignUpPage {...props} baseUrl={baseUrl}/>}
                />
                <Route path="/list-item"
                       component={(props) => <ListItem {...props} baseUrl={baseUrl}/>}/>
            </BrowserRouter>
        );
    }

}

export default App;
