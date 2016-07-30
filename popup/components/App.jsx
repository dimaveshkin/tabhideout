import React, { Component } from "react";
import SearchBox from "./SearchBox";
import Tabs from "./Tabs";

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            filter: ''
        };

        this.onFilterChange = this.onFilterChange.bind(this);
    }

    onFilterChange(event) {
        this.setState({
            filter: event.target.value
        });
    }

    render() {
        return (
            <div className="app-wrapper">
                <h1 className="app-header">TABHIDEOUT (ALPHA 0.0.1)</h1>
                <SearchBox filter={this.state.filter} onFilterChange={this.onFilterChange}/>
                <Tabs filter={this.state.filter}/>
            </div>
        );
    }
}

export default App;