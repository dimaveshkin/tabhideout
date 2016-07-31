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

        this.props.openTab(this.props.tab.url, this.props.tab.id);
    }

    componentWillReceiveProps() {
        this.setState({
            isDeletePrompt: false
        });
    }

    render() {
        let tab = this.props.tab;
        let hasDetails = !!tab.desc;
        let hostName = getUrlObject(tab.url).hostname;
        let titleText;

        if (tab.title) {
            titleText = `${tab.title} (${hostName})`;
        } else {
            titleText = tab.url;
        }

        return (
            <li>
                <table className="tab-table">
                    <tbody>
                        <tr className={this.state.isDeletePrompt ? "deleting-row tab-row" : "tab-row"}>
                            { tab.favicon &&
                                <td className="favicon">
                                    <img src={tab.favicon} alt={titleText}/>
                                </td>
                            }
                            <td className="title">
                                <span onClick={this.openTab} title={titleText}>
                                    {tab.title ?
                                        <span>{tab.title}<span className="hostname"> ({hostName})</span></span> :
                                        <span>{tab.url}</span>
                                    }
                                </span>
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

function getUrlObject(url) {
    let a = document.createElement('a');
    a.href = url;
    return a;
}

export default Tab;