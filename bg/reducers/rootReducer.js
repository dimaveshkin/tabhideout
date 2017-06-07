import tabs from "./tabsReducer/index";

const initialState = {
    tabs: []
};

export default function (state = initialState, action) {
    state = applyNewState(state, action);

    return {
        tabs: tabs(state.tabs, action)
    }
};

function applyNewState(state, action) {
    switch (action.type) {
        case 'APPLY_NEW_STATE': {
            return action.state;
        }

        default: {
            return state;
        }
    }
}
