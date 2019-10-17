import React from 'react';
import './styles/App.css';
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import {BrowserRouter, Route} from "react-router-dom";
import ListItem from "./ListItem";
import Footer from "./Footer";
import HomePage from "./HomePage";
import MenuPage from "./MenuPage";
import LocationPickerPage from "./LocationPickerPage";

class App extends React.Component {
    render() {
        const baseUrl = process.env.REACT_APP_SERVER_URL;
        return (
            <BrowserRouter>
                <div id='app-content'>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/menu" component={MenuPage}/>
                    <Route path="/login"
                           component={(props) => <LoginPage {...props} baseUrl={baseUrl}/>}
                    />
                    <Route path="/sign-up"
                           component={(props) => <SignUpPage {...props} baseUrl={baseUrl}/>}
                    />
                    <Route path="/list-item"
                           component={(props) => <ListItem {...props} baseUrl={baseUrl}/>}/>
                    <Route path="/location" component={LocationPickerPage}/>
                </div>
                <Footer/>
            </BrowserRouter>
        );
    }

}

export default App;
