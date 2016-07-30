const addCurrentTab = (orginalAction) => {
    return dispatch => {
        chrome.tabs.query({active: true, windowId: chrome.windows.WINDOW_ID_CURRENT}, function (tab) {
            dispatch({
                type: 'TAB_ADD',
                tab: tab[0]
            });
            
            chrome.tabs.remove(tab[0].id);
        });
    }
};

export default {
    'TAB_ADD_CURRENT': addCurrentTab
};