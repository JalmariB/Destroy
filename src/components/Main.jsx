import React from 'react';
import { Component } from 'react';
import Soldier from './Soldier.jsx';
import Robot from './Robot.jsx'

require('../sass/main.scss');

export default class Main extends Component {
  render() {
    return (
     <section className="game-container">
    {/*    <Soldier/> */}
        <Robot />

     </section>
      );
  }
}
