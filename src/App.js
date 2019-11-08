import React from 'react';
import './styles/App.scss';
import LoginPage from "./components/homepage/menu/LoginPage";
import SignUpPage from "./components/homepage/menu/SignUpPage";
import {BrowserRouter, Route} from "react-router-dom";
import Footer from "./components/shared/Footer";
import HomePage from "./components/homepage/HomePage";
import MenuPage from "./components/homepage/menu/MenuPage";
import LocationPickerPage from "./components/homepage/location/LocationPickerPage";
import DateRangePickerPage from "./components/homepage/dateRange/DateRangePickerPage";
import AddLocationPage from "./components/homepage/location/AddLocationPage";
import PostItemPage from "./components/postItem/PostItemPage";
import {isUserLoggedIn} from "./UserService";
import PostItemPhoto from "./components/postItem/PostItemPhoto";

class App extends React.Component {
    render() {
        const baseUrl = '/api';
        return (
            <BrowserRouter>
                <div id='app-content'>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/menu" component={(props) => <MenuPage {...props} baseUrl={baseUrl} isLoggedIn={isUserLoggedIn}/>}/>
                    <Route path="/login" component={(props) => <LoginPage {...props} baseUrl={baseUrl}/>}/>
                    <Route path="/sign-up" component={(props) => <SignUpPage {...props} baseUrl={baseUrl}/>}/>
                    <Route path="/location" component={LocationPickerPage}/>
                    <Route path="/pick-date" component={DateRangePickerPage}/>
                    <Route path="/add-location" component={AddLocationPage}/>
                    <Route exact path="/post-item" component={PostItemPage}/>
                    <Route exact path="/post-item/photo" component={PostItemPhoto}/>
                </div>
                <Footer/>
            </BrowserRouter>
        );
    }

}

export default App;
