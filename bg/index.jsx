import { createStore, applyMiddleware } from "redux";
import { wrapStore, alias } from "react-chrome-redux";
import ReduxThunk  from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import aliases from "./aliases";

let store;
let ctxPageId;
let ctxLinkId;

store = createStore(rootReducer,
applyMiddleware(
    alias(aliases),
    ReduxThunk
));

wrapStore(store, {
    portName: "TAB"
});

chrome.runtime.onInstalled.addListener(function() {
    ctxPageId = chrome.contextMenus.create({
        title: "Save page to TabHideOut!",
        contexts: ["page"]
    });

    ctxLinkId = chrome.contextMenus.create({
        title: "Save link to TabHideOut!",
        contexts: ["link"]
    });

    chrome.contextMenus.onClicked.addListener(function (info, tab) {
        if(info.menuItemId === ctxLinkId) {
            console.log(arguments);

        }

        if (info.menuItemId === ctxPageId) {
            store.dispatch({
                type: "TAB_ADD",
                tab
            })
        }
    });
});
