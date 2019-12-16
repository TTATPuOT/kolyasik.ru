import React, { Component } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Tab from "./Tab";
import Table from "./Blocks/Table";
import Ranks from "./Blocks/Ranks";
import Tokens from "./Blocks/Tokens";
import Commands from "./Blocks/Commands";
import NotFound from "./Blocks/NotFound";
import Profile from "./Blocks/Profile";

class Tabs extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            tabs: [
                {
                    name: 'Рейтинг',
                    url: "/",
                }, {
                    name: 'Ранги',
                    url: "/ranks",
                }, {
                    name: 'Как получить токены?',
                    url: "/tokens",
                }, {
                    name: 'Команды',
                    url: "/commands",
                }
            ],
            index: 0,
            ranks: undefined,
            commands: undefined
        };

        this.getRanks = this.getRanks.bind(this);
        this.getCommands = this.getCommands.bind(this);
    }

    getRanks() {
        if (!this.state.ranks) {
            fetch('/api/ranks')
                .then(results => results.json()).then(data => {
                    this.setState({
                        ranks: data
                    });
            });
        } else{
            return this.state.ranks;
        }
    }

    getCommands() {
        if (!this.state.commands) {
            fetch('/api/commands')
                .then(results => results.json()).then(data => {
                this.setState({
                    commands: data
                });
            });
        } else{
            return this.state.commands;
        }
    }

    handleClick(index) {
        this.setState({
            index: index
        });
    }

    render() {
        return <div className="page">
            <div className="tabs">
                <ul>
                    {this.state.tabs.map(tab =>
                        <Tab
                            key={tab.url}
                            name={tab.name}
                            url={tab.url}
                        />
                    )}
                </ul>
            </div>
            <div className="content">
                <Switch>
                    <Route exact path="/">
                        <Table users={this.props.users} />
                    </Route>
                    <Route path="/ranks">
                        <Ranks ranks={this.getRanks()} />
                    </Route>
                    <Route path="/commands">
                        <Commands commands={this.getCommands()} />
                    </Route>
                    <Route path="/tokens" component={Tokens} />
                    <Route path="/profile/:id" component={Profile} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
        </div>
    }
}

export default Tabs;