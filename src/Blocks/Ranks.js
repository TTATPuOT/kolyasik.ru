import React, { Component } from 'react';
import Loader from "../Loader";

class Ranks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ranks: props.ranks
        };
    }

    shouldComponentUpdate(prevProps) {
        if (this.state.ranks !== prevProps.ranks) {
            this.setState({ranks: prevProps.ranks});
            return true;
        }
    }

    render() {
        if (this.state.ranks) {
            return <div className="ranks">
                <p>За полученные токены вы автоматически получаете роли:</p>
                <br/>
                <div className="levels">
                    {this.state.ranks.map((role, index) => {
                        return (
                            <div className="level" key={'role-' + index}>
                                Роль {role.name}
                                <span>За {role.tokens} токенов, {role.reward} награда</span>
                            </div>
                        )
                    })}
                </div>
                <p>Роли назначаются автоматически ботом-бухгалтером</p>
            </div>
        } else{
            return <Loader />;
        }
    }
}

export default Ranks;