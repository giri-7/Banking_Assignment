import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './App';
import reducers from './reducers';
import logger from "redux-logger";
import thunk from 'redux-thunk';

const initialState = window.initialReduxState;

const middleware = applyMiddleware(logger, thunk);

const createStoreWithMiddleware = (createStore(reducers, middleware));


const persistedState = localStorage.getItem("reduxState") ? JSON.parse(localStorage.getItem("reduxState")) : {};

const store = createStore(
    reducers,
    persistedState,
    middleware,
    initialState
);

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
, document.getElementById('root'));




