import React, {Component} from "react";
import {connect} from "react-redux";

import Tab from "./Tab";

class Tabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prompt: false,
            promptType: "none",
            filter: props.filter
        };
        
        this.deleteTab = this.deleteTab.bind(this);
        this.deleteAllTabs = this.deleteAllTabs.bind(this);
        this.openTab = this.openTab.bind(this);
        this.openAllTabs = this.openAllTabs.bind(this);
        this.showDeletePrompt = this.showDeletePrompt.bind(this);
        this.showOpenPrompt = this.showOpenPrompt.bind(this);
        this.hidePrompt = this.hidePrompt.bind(this);
    }

    showOpenPrompt() {
        this.setState({
            prompt: true,
            promptType: "open"
        });
    }

    showDeletePrompt() {
        this.setState({
            prompt: true,
            promptType: "delete"
        });
    }

    hidePrompt() {
        this.setState({
            prompt: false,
            promptType: "none"
        });
    }
    
    deleteTab(id) {
        this.props.dispatch({
            type: "TAB_DELETE",
            id
        });
    }
    
    openTab(url, id) {
        chrome.tabs.create({
            url,
            active: true
        });

        this.deleteTab(id);
    }
    
    deleteAllTabs(tabs) {
        let id = tabs.map(tab => tab.id);

        this.props.dispatch({
            type: "TAB_DELETE",
            id
        });

        this.hidePrompt();
    }
    
    openAllTabs(tabs) {
        tabs.forEach((tab, i, array) => {
            chrome.tabs.create({
                url: tab.url,
                active: i === array.length - 1
            });
        });

        this.deleteAllTabs(tabs);
        this.hidePrompt();
    }

    render() {
        let tabList = this.props.tabs;
        let openAllTabs;
        let deleteAllTabs;
        let isListEmpty;

        if (this.props.filter !== "") {
            tabList = tabList.filter( tab => {
                let filter = this.props.filter.toLowerCase();
                let title = tab.title.toLowerCase();
                let url = tab.url.toLowerCase();
                return ~title.indexOf(filter) || ~url.indexOf(filter);
            });
        }

        if (this.state.filter !== this.props.filter) {
            this.setState({
                filter: this.props.filter,
                prompt: false,
                promptType: "none"
            });
        }

        openAllTabs = this.openAllTabs.bind(this, tabList);
        deleteAllTabs = this.deleteAllTabs.bind(this, tabList);

        tabList = tabList.map((tab, i) => {
            return <Tab tab={tab} key={i} deleteTab={this.deleteTab} openTab={this.openTab}/>;
        });

        isListEmpty = !tabList.length;

        if (!this.props.tabs.length) {
            tabList = <li className="beginner-guide">
                Use context menu to save pages and links. <br/>
                Ctrl + Alt + W - save tab and close.
            </li>;
        } else if (isListEmpty) {
            tabList = <li className="beginner-guide">
                Nothing found!
            </li>;
        }

        return (
            <div>
                {!isListEmpty &&
                    <div className="controls">
                        <span className="open-all" onClick={this.showOpenPrompt}>Open all</span>
                        <span className="delete-all" onClick={this.showDeletePrompt}>Delete all</span>
                        {this.state.prompt &&
                        <div className="prompt">
                            <span>Are you sure?</span>
                            {this.state.promptType === "open" &&
                            <span className="accept-open" onClick={openAllTabs}>OPEN</span>
                            }
                            {this.state.promptType === "delete" &&
                            <span className="accept-delete" onClick={deleteAllTabs}>DELETE</span>
                            }
                            <span className="close-prompt" onClick={this.hidePrompt}>CANCEL</span>
                        </div>
                        }
                    </div>
                }
                <ul className="tabs-list">
                    {tabList}
                </ul>
                <p className="note">Note: If you close your browser, tabs will be saved.</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tabs: state.tabs
    }
}

export default connect(mapStateToProps)(Tabs);

