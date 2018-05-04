import React from 'react';
import {Component} from 'react';


require('../sass/explosion.scss');

export default class Explosion extends React.Component {

    constructor(props){
        super(props)
        this.state = ({

        })
    }

    render(){

        return (
            <section id="explosion-container">
            <div className="ex-line"></div>
            <div className="center-ex">
                <div></div>
            </div>
            <span></span>
            <span></span>
            </section>
        )
    }
}