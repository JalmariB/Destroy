import React from 'react';
import {Component} from 'react';


require('../sass/game-info.scss');

export default class GameWonInfo extends React.Component {

    constructor(props){
        super(props)
        this.state = ({

        })
    }

    render(){

        return (
            <section id="info-container">
                <div className="content">
                    <h1>Congratulations!</h1>
                    <h2>You have saved the city from the mean bots!</h2>
                    <button className="primary-button" onClick={this.props.restartGame}>TRY AGAIN</button>
                </div>     
            </section>
        )
    }
}