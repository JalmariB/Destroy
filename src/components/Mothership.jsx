import React, {Component} from 'react';

require('style/mothership.scss');


export default class Mothership extends Component {

    render(){

        return (
            <section id="mothership">
                 <div className="flight-deck"></div>
                 <div className="ship-torso">
                    <div className="light-left">
                        <div className='light'></div>
                    </div>
                    <div className="light-center">
                        <div className='light'></div>
                    </div>
                    <div className="light-right">
                        <div className='light'></div>
                    </div>
                 </div>
                <div className="beam-container">
                    <div className="beam-cannon"></div>
                    <div className="beam-light-container">
                        <div className="beam-inner-light"></div>
                        <div className="beam-inner-light"></div>
                        <div className="beam-inner-light"></div>
                        

                    </div>
                </div>
            </section>
        );

    }


}