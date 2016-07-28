import React, { Component } from "react";
import { connect } from "react-redux";

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const self = this;

        document.addEventListener("click", () => {
            self.props.dispatch({
                type: "CLICK",
                payload: {}
            });
        });
    }

    render() {
        return (
            <div>Clicks: {this.props.clicks}</div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        clicks: state.clicks
    }
}

export default connect(mapStateToProps)(App);