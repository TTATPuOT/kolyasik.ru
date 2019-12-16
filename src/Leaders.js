import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Tabs from "./Tabs";
import Loader from "./Loader";

class Leaders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        fetch('/api/heroes').then(results => results.json()).then(data => this.setState({ users: data }));
    }

    ReturnPedestal(user, index) {
        let class_name = 'top-' + index;
        return(
            <div className={'user ' + class_name} key={index}>
                <div className={"avatar " + ((index === 1) ? "winner" : "")} style={{backgroundImage: 'url(' + user.avatar + ')'}} />
                <div className="nick">{user.name}<span>#{user.discriminator}</span></div>
                <div className={'pedestal ' + class_name}>
                    <img src={"/img/top-" + index + ".svg"} alt=""/>
                    <div className="rank">#{index}</div>
                </div>
            </div>
        )
    }

    render() {
        if (this.state.users.length > 0) {
            let top = [];
            if (this.state.users.length > 3) {
                top.push(this.ReturnPedestal(this.state.users[1], 2));
                top.push(this.ReturnPedestal(this.state.users[0], 1));
                top.push(this.ReturnPedestal(this.state.users[2], 3));
            }

            return <Router>
                <section className="leaders">
                    <div className="container">
                        {top}
                    </div>
                </section>
                <section className="main">
                    <div className="container">
                        {(this.state.users.length > 0) ? <Tabs users={this.state.users} /> : ''}
                    </div>
                </section>
            </Router>
        } else{
            return <Loader />
        }
    }
}

export default Leaders;
