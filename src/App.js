import React from 'react';
import './styles/App.css';
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import {BrowserRouter, Route} from "react-router-dom";
import ListItem from "./ListItem";
import TitleBar from "./TitleBar";
import Footer from "./Footer";
import HomePage from "./HomePage";
import MenuPage from "./MenuPage";

class App extends React.Component {
    render() {
        const baseUrl = process.env.REACT_APP_SERVER_URL;
        return (
            <BrowserRouter>
                <div id='app-content'>
                    <TitleBar/>
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
                </div>
                <Footer/>
            </BrowserRouter>
        );
    }

}

export default App;
