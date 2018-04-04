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
      left:0
    }
  }


  handleClickFromGameStart(numbersOfRobots) {
   
   this.setState({
     showGameStartComponent: false,
     showGameComponent: true,
     howManyRobots: numbersOfRobots    
   });
  }
  handleRestartGame(){
    
    this.setState({
      showGameStartComponent: true,
      showGameComponent: false,
    })
  }
  handleMovementState(r) {

    this.setState({
      left: r
    });
  }

  render() {
    

    return (
     <section className="main-container">
        {this.state.showGameStartComponent ? <GameStart handleClickFromGameStart={this.handleClickFromGameStart.bind(this)}/> : null}
        {this.state.showGameComponent ? <Game handleRestartGame={this.handleRestartGame.bind(this)} mainState={this.state} handleMovementState={this.handleMovementState.bind(this)} /> : null}
     </section>
      );
  }

}
