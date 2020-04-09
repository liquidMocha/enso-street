import React from 'react';
import './styles/App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from './components/homepage/menu/LoginPage';
import SignUpPage from './components/homepage/menu/SignUpPage';
import MenuPage from './components/homepage/menu/MenuPage';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from './services/Constants';
import PostItemRouter from './components/postItem/PostItemRouter';
import MyItemsRouter from './components/homepage/menu/MyItemsRouter';
import HomePageRouter from './components/homepage/HomePageRouter';
import ItemDetail from './components/search/ItemDetail';
import { isUserLoggedIn } from './services/UserService';
import MyCart from './components/cart/MyCart';
import CheckoutRouter from './components/cart/checkout/CheckoutRouter';

const App = () => (
  <BrowserRouter>
    <main id="app-content">
      <HomePageRouter />
      <Route path="/menu">
        <MenuPage isLoggedIn={isUserLoggedIn} />
      </Route>
      <Route path="/login">
        <LoginPage baseUrl={BASE_URL} />
      </Route>
      <Route path="/sign-up">
        <SignUpPage baseUrl={BASE_URL} />
      </Route>
      <Route path="/item-detail/:itemId">
        <ItemDetail />
      </Route>
      <Route path="/my-cart">
        <MyCart />
      </Route>
      <CheckoutRouter />
      <MyItemsRouter />
      <PostItemRouter />
    </main>
    <ToastContainer
      position="bottom-center"
      autoClose={2000}
      hideProgressBar
      closeOnClick
      draggable={false}
    />
  </BrowserRouter>
);

export default App;
