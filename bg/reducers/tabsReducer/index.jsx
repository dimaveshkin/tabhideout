export default function (state = [], action) {
    switch (action.type) {
        case 'TAB_ADD':
            return createTab(state, action.tab);
        case 'TAB_DELETE':
            return deleteTab(state, action.id);
        case 'LINK_ADD':
            return createTab(state, action.link);
        default: 
            return state;
    }
}

function deleteTab(tabs, id) {
    let result;

    if (Array.isArray(id)){
        result = tabs.filter(tab => id.indexOf(tab.id) === -1);
    } else {
        result = tabs.filter(tab => tab.id !== id);
    }

    return result;
}

function createTab(state, tabObject) {
    let urls = state.map(tab => tab.url);
    let result;

    if (urls.indexOf(tabObject.url) === -1 && tabObject.url.indexOf("chrome://") === -1) {
        result = [...state,
            Object.assign({}, {
                id: guid(),
                url: tabObject.url,
                favicon: tabObject.favIconUrl || tabObject.favicon,
                title: tabObject.title
            })
        ];
    } else {
        result = state;
    }

    return result;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}