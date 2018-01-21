import React from 'react';
import { Component } from 'react';
import CityBack from './CityBack.jsx';


require('../sass/background.scss');

export default class Background extends Component {

    render () {

        return(
            <section className="game-background">
            
            <CityBack />
            
            </section>
        );
    }

}
