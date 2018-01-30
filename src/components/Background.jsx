import React from 'react';
import { Component } from 'react';
import CityBack from './CityBack.jsx';
import CityFront from './CityFront.jsx';
import Ground from './Ground.jsx';


require('../sass/background.scss');

export default class Background extends Component {


    


    render () {
    
        return(
            <section  className="game-background">
            
                <CityBack />
                <CityFront />
                <Ground />
            
            </section>
        );
    }

}
