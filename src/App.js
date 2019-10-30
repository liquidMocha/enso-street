import React from 'react';
import './styles/App.scss';
import LoginPage from "./components/homepage/menu/LoginPage";
import SignUpPage from "./components/homepage/menu/SignUpPage";
import {BrowserRouter, Route} from "react-router-dom";
import ListItem from "./ListItem";
import Footer from "./components/shared/Footer";
import HomePage from "./components/homepage/HomePage";
import MenuPage from "./components/homepage/menu/MenuPage";
import LocationPickerPage from "./components/homepage/location/LocationPickerPage";
import DateRangePickerPage from "./components/homepage/dateRange/DateRangePickerPage";
import AddLocationPage from "./components/homepage/location/AddLocationPage";
import PostItemPage from "./components/postItem/PostItemPage";

class App extends React.Component {
    render() {
        const baseUrl = process.env.REACT_APP_SERVER_URL;
        return (
            <BrowserRouter>
                <div id='app-content'>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/menu" component={MenuPage}/>
                    <Route path="/login" component={(props) => <LoginPage {...props} baseUrl={baseUrl}/>}/>
                    <Route path="/sign-up" component={(props) => <SignUpPage {...props} baseUrl={baseUrl}/>}/>
                    <Route path="/list-item" component={(props) => <ListItem {...props} baseUrl={baseUrl}/>}/>
                    <Route path="/location" component={LocationPickerPage}/>
                    <Route path="/pick-date" component={DateRangePickerPage}/>
                    <Route path="/add-location" component={AddLocationPage}/>
                    <Route path="/post-item" component={PostItemPage}/>
                </div>
                <Footer/>
            </BrowserRouter>
        );
    }

}

export default App;
