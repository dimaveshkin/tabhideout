export function addTab(tab) {
    return {
        type: 'TAB_ADD',
        tab
    };
}

export function addLink(link) {
    return {
        type: 'LINK_ADD',
        link
    };
}

export function applyNewState(state) {
    return {
        type: 'APPLY_NEW_STATE',
        state
    };
}