import React, { Component } from 'react';
import Loader from "../Loader";
import { connect } from 'react-redux';

class Ranks extends Component {
    constructor(props) {
        super(props);
        this.getRanks();
    }

    getRanks() {
        if (!this.props.ranks.length) {
            fetch('/api/ranks')
                .then(results => results.json())
                .then(data => this.props.ranksUpdated(data));
        }
    }

    render() {
        if (this.props.ranks.length) {
            return <div className="ranks">
                <p>За полученные токены вы автоматически получаете роли:</p>
                <br/>
                <div className="levels">
                    {this.props.ranks.map((role, index) => {
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

export default connect(
    state => ({
        ranks: state.ranksState
    }),
    dispatch => ({
        ranksUpdated: (ranks) => dispatch({type: "NEW", ranks: ranks})
    })
)(Ranks);