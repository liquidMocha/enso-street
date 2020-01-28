import React from 'react';
import './styles/App.scss';
import LoginPage from "./components/homepage/menu/LoginPage";
import SignUpPage from "./components/homepage/menu/SignUpPage";
import {BrowserRouter, Route} from "react-router-dom";
import MenuPage from "./components/homepage/menu/MenuPage";
import {isUserLoggedIn} from "./services/UserService";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {BASE_URL} from "./services/Constants";
import PostItemRouter from "./components/postItem/PostItemRouter";
import MyItemsRouter from "./components/homepage/menu/MyItemsRouter";
import HomePageRouter from "./components/homepage/HomePageRouter";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <main id='app-content'>
                    <HomePageRouter/>
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
                    <PostItemRouter/>
                </main>
                <ToastContainer position='bottom-center' autoClose={2000} hideProgressBar={true} closeOnClick
                                draggable={false}/>
            </BrowserRouter>
        );
    }

}

export default App;
