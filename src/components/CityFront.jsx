import React from 'react';
import { Component } from 'react'

require('../sass/background.scss');


export default class CityFront extends Component {

    renderWindows(){
       
    }
    componentDidMount(){
        //this.renderWindows();
    }


    render() {

        return (
            <section className="city-front-container">
                <div className="building-1"></div>
                <div className="building-2">
                   {/*  <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li> */}
                </div>
                <div className="building-3"></div>
                <div className="building-4"></div>
                <div className="building-5"></div>
                <div className="building-6"></div>
                <div className="building-7"></div>

                <div className="building-8"></div>
                <div className="building-9"></div>
                <div className="building-10"></div>
                <div className="building-11"></div>
                <div className="building-12"></div>
            </section>

        );
    }

}