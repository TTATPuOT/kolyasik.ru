import React, { Component } from 'react';
import Loader from "../Loader";
import { connect } from 'react-redux';

class Games extends Component {
    constructor(props) {
        super(props);
        this.getGames();
    }

    getGames() {
        if (!this.props.games.length) {
            fetch('/api/games')
                .then(results => results.json())
                .then(data => this.props.gamesUpdated(data));
        }
    }

    render() {
        if (this.props.games.length) {
            const games = this.props.games.map(game => <div
                key={game.name}
                className="game"
                style={{backgroundImage: `url(${game.thumbnail})`}}
                onClick={() => window.open(game.steam, "_blank")}
            >
                <div className="name">{game.name}</div>
                <div className="price">{game.price} руб.</div>
            </div>);
            return <div>
                <p className="text-center">Эти игры можно получить за токены:</p>
                <div className="games">
                    {games}
                </div>
            </div>
        } else{
            return <Loader />;
        }
    }
}

export default connect(
    state => ({
        games: state.gamesState
    }),
    dispatch => ({
        gamesUpdated: (games) => dispatch({type: "NEW", games: games})
    })
)(Games);