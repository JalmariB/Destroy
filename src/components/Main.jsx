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
      howManyRobots: 0,
    }
    
    

  }


  handleClickFromGameStart() {
   
   this.setState({
     showGameStartComponent: false,
     showGameComponent: true,
     
     
   });
  }

  render() {
    console.log('handler')

    return (
     <section className="main-container">
        {this.state.showGameStartComponent ? <GameStart handleClickFromGameStart={this.handleClickFromGameStart.bind(this)}/> : null}
        {this.state.showGameComponent ? <Game /> : null}
     </section>
      );
  }

}
