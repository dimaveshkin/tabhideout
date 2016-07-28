export default function (state, action) {
    switch (action.type) {
        case "CLICK":
            Object.assign({}, state, {
                clicks: state.clicks + 1
            });

            break;
        default:
            return state;
    }
}