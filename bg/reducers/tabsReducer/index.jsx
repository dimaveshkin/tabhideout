export default function (state = [], action) {
    switch (action.type) {
        case 'TAB_ADD':
            console.log(action);
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
    return tabs.filter(tab => tab.id !== id)
}

function createFromTab(tabObject) {
    return {
        id: guid(),
        url: tabObject.url,
        favicon: tabObject.favIconUrl,
        title: tabObject.title
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