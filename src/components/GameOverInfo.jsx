import React from 'react';
import {Component} from 'react';


require('../sass/game-over-info.scss');

export default class GameOverInfo extends React.Component {

    constructor(props){
        super(props)
        this.state = ({

        })
    }

    render(){

        return (
            <section id="game-over-info-container">
                <div className="content">
                    <h1>GAME OVER</h1>
                    <button className="primary-button" onClick={this.props.restartGame}>TRY AGAIN</button>
                </div>     
            </section>

        )
    }
}