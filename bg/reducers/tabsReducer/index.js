export default function (state = [], action) {
    switch (action.type) {
        case 'TAB_ADD':
            return createTab(state, action.tab);
        case 'TAB_DELETE':
            return deleteTab(state, action.id);
        case 'TAB_DELETE_ALL':
            return [];
        case 'LINK_ADD':
            return createTab(state, action.link);
        default: 
            return state;
    }
}

function deleteTab(tabs, id) {
    return tabs.filter(tab => tab.id !== id);
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