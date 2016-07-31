import { createStore, applyMiddleware } from "redux";
import { wrapStore, alias } from "react-chrome-redux";
import ReduxThunk  from "redux-thunk";
import $  from "jquery";
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
    store.subscribe(function () {
        let state = store.getState();
        let text = "";

        if (state.tabs.length) {
            text = state.tabs.length.toString();
        }

        chrome.browserAction.setBadgeText({text});
    });

    ctxPageId = chrome.contextMenus.create({
        title: "Hide this page to TabHideOut!",
        contexts: ["page"]
    });

    ctxLinkId = chrome.contextMenus.create({
        title: "Hide linked page to TabHideOut!",
        contexts: ["link"]
    });

    chrome.contextMenus.onClicked.addListener(function (info, tab) {
        if(info.menuItemId === ctxLinkId) {
            createTabFromLink(info.linkUrl).then(link => {
                store.dispatch({
                    type: "LINK_ADD",
                    link
                })
            })
        }

        if (info.menuItemId === ctxPageId) {
            store.dispatch({
                type: "TAB_ADD",
                tab
            })
        }
    });

    chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].url.indexOf("chrome://") === -1)  {
                    chrome.tabs.executeScript(tabs[i].id, {file: "content.js"});
                }
            }
        }
    );
});

function createTabFromLink(url) {
    let GOOGLE_FAVICON_SERVICE = "https://www.google.com/s2/favicons?domain=";
    let def = $.Deferred();

    $.get(url).then(function(response){
        let titleRegex = /<\s*title.*>(.*)<.*\/\s*title\s*>/;
        let favicon = GOOGLE_FAVICON_SERVICE + url;
        let title;

        if(typeof response === "string"){
            let tmp;
            tmp = titleRegex.exec(response);
            title = tmp && tmp[1];
        }

        if (!title) {
            title = url;
        }

        def.resolve({
            url,
            title,
            favicon
        });
    });

    return def.promise();
}
