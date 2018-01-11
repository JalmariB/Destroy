import React from 'react';
import { Component } from 'react';
import GameStart from './GameStart.jsx';
import Game from './Game.jsx';

require('../sass/main.scss');

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showGameStartComponent: true,
      showGameComponent: false,
      howManyRobots: 5,
    }
    
    

  }


  handleClickFromGameStart(numbersOfRobots) {
   console.log('number of robots', numbersOfRobots)
   
   this.setState({
     showGameStartComponent: false,
     showGameComponent: true,
     howManyRobots: numbersOfRobots
     
     
   });
  }

  render() {
    

    return (
     <section className="main-container">
        {this.state.showGameStartComponent ? <GameStart handleClickFromGameStart={this.handleClickFromGameStart.bind(this)}/> : null}
        {this.state.showGameComponent ? <Game howManyRobots={this.state.howManyRobots} /> : null}
     </section>
      );
  }

}
