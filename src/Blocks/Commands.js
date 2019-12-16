import React, { Component } from 'react';
import Loader from "../Loader";

class Commands extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commands: props.commands
        };
    }

    shouldComponentUpdate(prevProps) {
        if (this.state.commands !== prevProps.commands) {
            this.setState({commands: prevProps.commands});
            return true;
        }
    }

    render() {
        if (this.state.commands) {
            const commands = this.state.commands.map(command => <p key={command.command}>
                <i>{command.command}</i> - {command.description}
            </p>);
            return <div className="commands">{commands}</div>
        } else{
            return <Loader />;
        }
    }
}

export default Commands;