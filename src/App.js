import React from 'react';
import './styles/App.scss';
import LoginPage from "./components/homepage/menu/LoginPage";
import SignUpPage from "./components/homepage/menu/SignUpPage";
import {BrowserRouter, Route} from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import MenuPage from "./components/homepage/menu/MenuPage";
import {isUserLoggedIn} from "./services/UserService";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {BASE_URL} from "./services/Constants";
import SearchResults from "./components/search/SearchResults";
import PostItemHomePage from "./components/postItem/PostItemHomePage";
import MyItemsRouter from "./components/homepage/menu/MyItemsRouter";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div id='app-content'>
                    <Route exact path="/" component={HomePage}/>
                    <Route path='/menu'>
                        <MenuPage baseUrl={BASE_URL} isLoggedIn={isUserLoggedIn}/>
                    </Route>
                    <Route path='/login'>
                        <LoginPage baseUrl={BASE_URL}/>
                    </Route>
                    <Route path='/sign-up'>
                        <SignUpPage baseUrl={BASE_URL}/>
                    </Route>
                    <MyItemsRouter/>
                    <PostItemHomePage/>
                    <Route exact path="/search-result" component={SearchResults}/>
                </div>
                <ToastContainer position='bottom-center' autoClose={2000} hideProgressBar={true} closeOnClick
                                draggable={false}/>
            </BrowserRouter>
        );
    }

}

export default App;
