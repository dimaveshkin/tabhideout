import React, {Component} from "react";
import {connect} from "react-redux";

import Tab from "./Tab";

class Tabs extends Component {
    constructor(props) {
        super(props);
        
        this.deleteTab = this.deleteTab.bind(this);
    }
    
    deleteTab(id) {
        this.props.dispatch({
            type: "TAB_DELETE",
            id
        });
    }

    render() {
        let tabList = this.props.tabs;

        if (this.props.filter !== "") {
            tabList = tabList.filter( tab => {
                return ~tab.title.indexOf(this.props.filter);
            });
        }

        tabList = tabList.map((tab, i) => {
            return <Tab tab={tab} key={i} deleteTab={this.deleteTab}/>;
        });


        return (
            <ul className="tabs-list">
                {tabList}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        tabs: state.tabs
    }
}

export default connect(mapStateToProps)(Tabs);

