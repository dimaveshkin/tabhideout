export default function (state = [], action) {
    switch (action.type) {
        case 'TAB_ADD':
            return [...state,
                Object.assign({}, createFromTab(action.tab))
            ];
        case 'TAB_DELETE':
            return deleteTab(state, action.id);
        case 'LINK_ADD':
            return [...state,
                Object.assign({}, createFromLink(action.link))
            ];
        default: 
            return state;
    }
}

function deleteTab(tabs, id) {
    var result;

    if (Array.isArray(id)){
        result = tabs.filter(tab => id.indexOf(tab.id) === -1);
    } else {
        result = tabs.filter(tab => tab.id !== id);
    }

    return result;
}

function createFromTab(tabObject) {
    return {
        id: guid(),
        url: tabObject.url,
        favicon: tabObject.favIconUrl,
        title: tabObject.title
    };
}

function createFromLink(linkObj) {
    return {
        id: guid(),
        url: linkObj.url,
        favicon: linkObj.favicon,
        title: linkObj.title
    };
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