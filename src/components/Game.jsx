import React from 'react';
import { Component } from 'react';
import Soldier from './Soldier.jsx';
import Robot from './Robot.jsx'

require('../sass/main.scss');

export default class Game extends Component {

    renderRobotComponent() {
       
        $(".game-container").append('' + <Robot /> + '');
        return <Robot />;

    }
    renderRobotComponents(numberOfRobots) {
        var robotArray = [];

        for (var i = 0; i < numberOfRobots; i++) {
            robotArray.push(<Robot />)

        }

        return [...robotArray];
    }
    componentDidMount() {

    }
    render() {


        return (
            <section className="game-container">
                <Soldier />
                {this.renderRobotComponents(5)}
            </section>
        );
    }

}
