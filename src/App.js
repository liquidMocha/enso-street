import React from 'react';
import './styles/App.scss';
import LoginPage from "./components/homepage/menu/LoginPage";
import SignUpPage from "./components/homepage/menu/SignUpPage";
import {BrowserRouter, Route} from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import MenuPage from "./components/homepage/menu/MenuPage";
import LocationPickerPage from "./components/homepage/location/LocationPickerPage";
import DateRangePickerPage from "./components/homepage/dateRange/DateRangePickerPage";
import AddLocationPage from "./components/homepage/location/AddLocationPage";
import PostItemPage from "./components/postItem/PostItemPage";
import {isUserLoggedIn} from "./services/UserService";
import PostItemDetailPage from "./components/postItem/PostItemDetailPage";
import PriceAndDelivery from "./components/postItem/PriceAndDelivery";
import Preview from "./components/postItem/Preview";
import UseMyPhoto from "./components/postItem/UseMyPhoto";
import MyItems from "./components/homepage/menu/MyItems";
import EditCompleteItem from "./components/postItem/EditCompleteItem";
import ChooseLocationPage from "./components/postItem/ChooseLocationPage";
import EditAddressPage from "./components/postItem/EditAddressPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {BASE_URL} from "./services/Constants";
import SearchResults from "./components/search/SearchResults";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div id='app-content'>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/menu"
                           component={(props) => <MenuPage {...props} baseUrl={BASE_URL}
                                                           isLoggedIn={isUserLoggedIn}/>}/>
                    <Route path="/login" component={(props) => <LoginPage {...props} baseUrl={BASE_URL}/>}/>
                    <Route path="/sign-up" component={(props) => <SignUpPage {...props} baseUrl={BASE_URL}/>}/>
                    <Route path="/location" component={LocationPickerPage}/>
                    <Route path="/pick-date" component={DateRangePickerPage}/>
                    <Route path="/add-location" component={AddLocationPage}/>
                    <Route path="/my-items" component={MyItems}/>
                    <Route exact path="/post-item" component={PostItemPage}/>
                    <Route exact path="/post-item/use-my-photo" component={UseMyPhoto}/>
                    <Route exact path="/post-item/details" component={PostItemDetailPage}/>
                    <Route exact path="/post-item/price-and-delivery" component={PriceAndDelivery}/>
                    <Route exact path="/post-item/price-and-delivery/choose-location" component={ChooseLocationPage}/>
                    <Route exact path="/post-item/price-and-delivery/choose-location/edit-address"
                           component={EditAddressPage}/>
                    <Route exact path="/post-item/preview" component={Preview}/>
                    <Route exact path="/post-item/edit-complete-item" component={EditCompleteItem}/>
                    <Route exact path="/search-result" component={SearchResults}/>
                </div>
                <ToastContainer position='bottom-center' autoClose={2000} hideProgressBar={true} closeOnClick
                                draggable={false}/>
            </BrowserRouter>
        );
    }

}

export default App;
