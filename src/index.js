import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as ReactGA from 'react-ga';
import {Provider} from "react-redux";
import store from "./redux/store";
import "babel-core/register";
import "babel-polyfill";

ReactGA.initialize('UA-148905897-1', {
    gaOptions: {
        siteSpeedSampleRate: 100
    }
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
