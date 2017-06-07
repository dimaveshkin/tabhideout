import { createStore, applyMiddleware } from "redux";
import { wrapStore, alias } from "react-chrome-redux";
import ReduxThunk from 'redux-thunk';
import aliases from "./aliases/index";
import rootReducer from "./reducers/rootReducer";

export default (initialData) => {
    let store = createStore(rootReducer,
        initialData,
        applyMiddleware(
            alias(aliases),
            ReduxThunk
        ));

    wrapStore(store, {
        portName: 'TAB'
    });

    return store;
};