import React from 'react';
import { Component } from 'react';
import Game from './Game.jsx'

require('../sass/main.scss');
require('../sass/game-start.scss')

export default class GameStart extends Component {
   
  

    howManyRobotsWillBeRendered(numberOfRobots){
        this.props.handleClickFromGameStart(numberOfRobots)
    }

    render() {


        return (
            <section className="game-start">
                <section className="presentation-container">
                    <h1>DESTROY</h1>
                    <span></span>
                </section>
                <section className="difficult-level-container">
                    <h2>Select difficulty level</h2>
                    <button onClick={() => this.howManyRobotsWillBeRendered(1)} className="primary-button">EASY</button>
                    <button onClick={() => this.howManyRobotsWillBeRendered(5)} className="primary-button">NORMAL</button>
                    <button onClick={() => this.howManyRobotsWillBeRendered(10)} className="primary-button">FUCKED UP</button>
                </section>
            </section>
            
        );
    }

}
