import React, { Component } from 'react';
import Loader from "../Loader";
import {connect} from "react-redux";

class Commands extends Component {
    constructor(props) {
        super(props);
        this.getCommands();
    }

    getCommands() {
        if (!this.props.commands.length) {
            fetch('/api/commands')
                .then(results => results.json())
                .then(data => this.props.commandsUpdated(data));
        }
    }

    render() {
        if (this.props.commands.length) {
            const commands = this.props.commands.map(command => <p key={command.command}>
                <i>{command.command}</i> - {command.description}
            </p>);
            return <div className="commands">{commands}</div>
        } else{
            return <Loader />;
        }
    }
}

export default connect(
    state => ({
        commands: state.commandsState
    }),
    dispatch => ({
        commandsUpdated: (commands) => dispatch({type: "NEW", commands: commands})
    })
)(Commands);