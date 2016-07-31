import { Store } from "react-chrome-redux";

const store = new Store({
    portName: 'TAB'
});

document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.altKey && e.which === 87) {
        store.dispatch({
            type: 'TAB_ADD_CURRENT',
            id: 1
        });
    }
});
