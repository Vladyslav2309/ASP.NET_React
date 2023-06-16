import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";
import {AuthUserActionType, IUser} from "./components/auth/types";
import http from "./http";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

    if(localStorage.token){
        http.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${localStorage.token}`;
        const user = jwtDecode(localStorage.token) as IUser;
        store.dispatch({type: AuthUserActionType.LOGIN_USER, payload:{
            email: user.email,
                name: user.name
            } as IUser});
    }
root.render(
    <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();