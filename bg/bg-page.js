import { setBadgeCount, injectContentScripts, createTabFromLink } from "./helpers";
import deepEqual from 'deep-equal';
import initStore from './store';
import { addTab, addLink, applyNewState } from './actions';

export class BGPage {
    constructor() {
        this.contextMenuIds = {
            page: null,
            link: null
        };
        this.store = null;
        this.prevState = null;

        this.initBrowserEvents();
    }

    initBrowserEvents() {
        chrome.storage.sync.get('store', this.createStore.bind(this));
        chrome.runtime.onInstalled.addListener(this.createContextMenus.bind(this));
    }

    createStore(initialData) {
        this.store = initStore(initialData.store);

        if (initialData.store) {
            setBadgeCount(initialData.store.tabs.length);
        }

        this.initStoreEvents();
    }

    initStoreEvents() {
        this.store.subscribe(this.handleStoreChanges.bind(this));
        chrome.storage.onChanged.addListener(this.handleChromeStorageChanges.bind(this))
    }

    handleStoreChanges() {
        let state = this.store.getState();

        setBadgeCount(state.tabs.length);

        if (!deepEqual(state, this.prevState)) {
            this.prevState = state;
            chrome.storage.sync.set({store: state});
        }
    }

    handleChromeStorageChanges(changes) {
        if (!changes.store || deepEqual(changes.store.newValue, this.prevState)){
            return;
        }

        this.prevState = changes.store.newValue;
        this.store.dispatch(applyNewState(changes.store.newValue));
    }

    createContextMenus() {
        this.contextMenuIds.page = chrome.contextMenus.create({
            title: 'Hide this page to TabHideOut!',
            contexts: ['page']
        });

        this.contextMenuIds.link = chrome.contextMenus.create({
            title: 'Hide linked page to TabHideOut!',
            contexts: ['link']
        });

        chrome.contextMenus.onClicked.addListener(this.handleContextMenuClick.bind(this));
        chrome.tabs.query({}, injectContentScripts);
    }

    handleContextMenuClick(info, tab) {
        switch(info.menuItemId) {
            case this.contextMenuIds.link:
                createTabFromLink(info.linkUrl).then(link => {
                    this.store.dispatch(addLink(link))
                });
                break;
            case this.contextMenuIds.page:
                this.store.dispatch(addTab(tab));
                break;
            default:
                break;
        }
    }
}