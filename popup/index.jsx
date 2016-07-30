import React from "react";
import {render} from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { Store } from "react-chrome-redux";

const store = new Store({
    portName: 'TAB'
});

const unsubscribe = store.subscribe(() => {
    unsubscribe(); // make sure to only fire once
    render(
        <Provider store={store}>
            <App/>
        </Provider>
        , document.getElementById('app'));
});