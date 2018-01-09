import React from 'react';
import { Component } from 'react';
import Game from './Game.jsx'

require('../sass/main.scss');

export default class GameStart extends Component {


    render() {


        return (
            <section className="game-start">
               
                <button onClick={this.props.handleClickFromGameStart} className="primary-button">START</button>
            
            </section>
            
        );
    }

}
