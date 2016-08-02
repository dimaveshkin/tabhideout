import { createStore, applyMiddleware } from "redux";
import { wrapStore, alias } from "react-chrome-redux";
import deepEqual from "deep-equal";
import ReduxThunk  from "redux-thunk";
import $  from "jquery";
import rootReducer from "./reducers/rootReducer";
import aliases from "./aliases";

let store;
let prevState;
let ctxPageId;
let ctxLinkId;

chrome.storage.sync.get("store", startApp);

function startApp(initialData) {
    store = createStore(rootReducer,
        initialData.store,
        applyMiddleware(
            alias(aliases),
            ReduxThunk
        ));

    wrapStore(store, {
        portName: "TAB"
    });

    if (initialData.store) {
        setBadgeCount(initialData.store.tabs.length);
    }

    store.subscribe(onStoreChange);
    chrome.storage.onChanged.addListener(onStorageChange)
}

chrome.runtime.onInstalled.addListener(function() {
    ctxPageId = chrome.contextMenus.create({
        title: "Hide this page to TabHideOut!",
        contexts: ["page"]
    });

    ctxLinkId = chrome.contextMenus.create({
        title: "Hide linked page to TabHideOut!",
        contexts: ["link"]
    });

    chrome.contextMenus.onClicked.addListener(handleContextMenuClick);

    chrome.tabs.query({}, injectContentScripts);
});

function onStoreChange() {
    let state = store.getState();

    if (!deepEqual(state, prevState)) {
        prevState = state;
        store.dispatch((dispatch, getState) => {
            chrome.storage.sync.set({store: getState()}, () => {
                dispatch({
                    type: "SEND_DATA_TO_STORAGE"
                });
            })
        });
        return;
    }

    setBadgeCount(state.tabs.length);
}

function setBadgeCount(length) {
    let text = "";

    if (length) {
        text = length.toString();
    }

    chrome.browserAction.setBadgeText({text});
}

function onStorageChange(changes) {
    if (changes.store){
        if (!deepEqual(changes.store.newValue, prevState)) {
            prevState = changes.store.newValue;
            store.dispatch({
                type: "APPLY_NEW_STATE",
                state: changes.store.newValue
            });
        }
    }
}

function handleContextMenuClick(info, tab) {
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
}

function injectContentScripts(tabs) {
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].url.indexOf("chrome://") === -1)  {
            chrome.tabs.executeScript(tabs[i].id, {file: "content.js"});
        }
    }
}

function createTabFromLink(url) {
    let GOOGLE_FAVICON_SERVICE = "https://www.google.com/s2/favicons?domain=";
    let def = $.Deferred();

    $.get(url).then(function(response){
        let titleRegex = /<\s*?title.*?>(.*?)<.*?\/\s*?title\s*?>/;
        let favicon = GOOGLE_FAVICON_SERVICE + url;
        let title;

        if(typeof response === "string"){
            let tmp;
            tmp = titleRegex.exec(response);
            title = tmp && tmp[1];
        }

        def.resolve({
            url,
            title,
            favicon
        });
    });

    return def.promise();
}