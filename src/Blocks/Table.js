import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: props.users
        };
    }

    render() {
        return <div className="users-table">
            {this.state.users.map((user, key) => {
                return <div className="user-row" key={user.id}>
                    <div className="position">
                        <b>#{key + 1}</b>
                    </div>
                    <div className="avatar">
                        <img src={user.avatar} alt={user.name}/>
                    </div>
                    <div className="name">
                        <Link to={"/profile/" + user.id}>{user.name}<span>#{user.discriminator}</span></Link>
                    </div>
                    <div className="rating">
                        <i>{user.rating}</i> рейтинг <small>{user.balance} токенов</small>
                    </div>
                </div>
            })}
        </div>
    }
}

export default Table;