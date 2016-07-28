import { createStore } from "redux";
import { wrapStore } from "react-chrome-redux";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer, {
    clicks: 0
});

wrapStore(store, {
    portName: "tabhideout"
});