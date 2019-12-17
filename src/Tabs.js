import React, { Component } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Tab from "./Tab";
import Table from "./Blocks/Table";
import Ranks from "./Blocks/Ranks";
import Tokens from "./Blocks/Tokens";
import Commands from "./Blocks/Commands";
import Games from "./Blocks/Games";
import NotFound from "./Blocks/NotFound";
import Profile from "./Blocks/Profile";

class Tabs extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            tabs: [
                { name: 'Рейтинг', url: "/" },
                { name: 'Ранги', url: "/ranks" },
                { name: 'Как получить токены?', url: "/tokens" },
                { name: 'Команды', url: "/commands" },
                { name: 'Ключи Steam', url: "/games" },
            ],
            index: 0
        };
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
                    <Route path="/ranks" component={Ranks} />
                    <Route path="/commands" component={Commands} />
                    <Route path="/tokens" component={Tokens} />
                    <Route path="/games" component={Games} />
                    <Route path="/profile/:id" component={Profile} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
        </div>
    }
}

export default Tabs;