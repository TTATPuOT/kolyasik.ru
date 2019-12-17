import React from 'react';
import ReactDOM from 'react-dom';
import './css/normalize.css';
import './css/style.css';
import Leaders from './Leaders';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

const reducers = combineReducers({
    ranksState: (state = [], action = []) => (action.ranks) ? action.ranks : state,
    commandsState: (state = [], action) => (action.commands) ? action.commands : state,
    gamesState: (state = [], action) => (action.games) ? action.games : state,
});

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <Leaders />
    </Provider>,
    document.getElementById('root')
);