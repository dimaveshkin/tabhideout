import React, { Component } from "react";

class Tab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDetails: false,
            isDeletePrompt: false
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
        this.handlePromptClose = this.handlePromptClose.bind(this);
        this.openTab = this.openTab.bind(this);
    }

    handleDetails() {
        this.setState({
            showDetails: !this.state.showDetails
        })
    }

    handleClose() {
        if (this.state.isDeletePrompt) {
            this.props.deleteTab(this.props.tab.id);
        } else {
            this.setState({
                isDeletePrompt: true
            })
        }
    }

    handlePromptClose() {
        this.setState({
            isDeletePrompt: false
        });
    }

    openTab() {
        if (this.state.isDeletePrompt) {
            return;
        }

        chrome.tabs.create({
            url: this.props.tab.url,
            active: true
        });

        this.props.deleteTab(this.props.tab.id);
    }

    render() {
        let tab = this.props.tab;
        let hasDetails = !!this.props.tab.desc;

        return (
            <li>
                <table className="tab-table">
                    <tbody>
                        <tr className={this.state.isDeletePrompt ? "deleting-row tab-row" : "tab-row"}>
                            { tab.favicon &&
                                <td className="favicon">
                                    <img src={tab.favicon} alt/>
                                </td>
                            }
                            <td className="title">
                                <span onClick={this.openTab}>{tab.title}</span>
                            </td>
                            { hasDetails &&
                                <td className="details-icon" onClick={this.handleDetails}>i</td>
                            }
                            <td className="close-icon">
                                <button title={this.state.isDeletePrompt ? "Click again to delete." : ""}
                                        onClick={this.handleClose}
                                        onMouseLeave={this.handlePromptClose}>
                                    {this.state.isDeletePrompt ? "✓" : "✕"}
                                </button>
                            </td>
                        </tr>
                        { hasDetails && this.state.showDetails &&
                            <tr className="tab-row">
                                <td colspan="3" className="tab-description">
                                    {tab.desc}
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </li>
        );
    }
}

export default Tab;