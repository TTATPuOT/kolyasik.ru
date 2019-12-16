import React, {Component} from "react";
import {NavLink} from "react-router-dom";

class Tab extends Component {
    render() {
        return (
            <li>
                <NavLink exact to={this.props.url} activeClassName="active">
                    {this.props.name}
                </NavLink>
            </li>
        )
    }
}

export default Tab;