import React from 'react';
import './styles/App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import LoginPage from './components/homepage/menu/LoginPage';
import SignUpPage from './components/homepage/menu/SignUpPage';
import MenuPage from './components/homepage/menu/MenuPage';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from './services/Constants';
import PostItemRouter from './components/postItem/PostItemRouter';
import MyItemsRouter from './components/homepage/menu/myitems/MyItemsRouter';
import Item from './components/search/ItemDetails/Item';
import { isUserLoggedIn } from './services/UserService';
import MyCart from './components/cart/MyCart';
import CheckoutRouter from './components/cart/checkout/CheckoutRouter';
import InitializeUser from './InitializeUser';
import OrdersReceivedPage from './components/ordersreceived/OrdersReceivedPage';
import ForgetPassword from './components/homepage/menu/ForgetPassword';
import ResetPassword from './components/homepage/menu/ResetPassword';
import HowItWorks from './components/homepage/menu/HowItWorks';
import MyAccountRouter from './components/homepage/menu/MyAccountRouter';
import ChangePassword from './components/homepage/menu/ChangePassword';
import MyReservationsPage from './components/reservations/MyReservationsPage';
import TermsAndConditions from './components/homepage/menu/TermsAndConditions';
import PrivacyPolicy from './components/homepage/menu/PrivacyPolicy';
import HomePage from './components/homepage/HomePage';

const stripePromise = loadStripe('pk_test_iiYBIcKzGSXfI7I4YdqXQyRX00aBp7Oras');

const App = () => {
  const dispatch = useDispatch();
  InitializeUser(dispatch);

  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <main id="app-content">
          <Route exact path="/">
            <HomePage />
          </Route>
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
            <Item />
          </Route>
          <Route path="/my-cart">
            <MyCart />
          </Route>
          <Route path="/orders-received">
            <OrdersReceivedPage />
          </Route>
          <Route path="/my-reservations">
            <MyReservationsPage />
          </Route>
          <Route path="/forget-password">
            <ForgetPassword />
          </Route>
          <Route path="/reset-password/">
            <ResetPassword />
          </Route>
          <Route path="/change-password">
            <ChangePassword />
          </Route>
          <Route path="/how-it-works">
            <HowItWorks />
          </Route>
          <Route path="/terms-and-conditions">
            <TermsAndConditions />
          </Route>
          <Route path="/privacy-policy">
            <PrivacyPolicy />
          </Route>
          <MyAccountRouter />
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
    </Elements>
  );
};

export default App;
