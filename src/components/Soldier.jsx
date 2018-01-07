import React from 'react';
import { component } from 'react';


require('../sass/soldier.scss');
require('../sass/animation.scss');


export default class Soldier extends React.Component {

    render() {

       
        return (
            
            <section id="shooter-container">
                <section className="shooting-elements-container">
                    <div className="head-container">
                        <div className="helmet">
                            <div className="glasses"></div>
                        </div>
                        <div className="head">
                            <div className="mask"></div>
                        </div>
                    </div>
                    <div className="hands-container">
                        <div className="right-hand"></div>
                        <div className="gun">
                            <div className="gun-pipe"></div>
                            <div className="gun-magazine">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className="left-hand"></div>
                    </div>
                </section>
                <section className="torso">
                    <div className="body-armor-belt">
                        <div className="health-pack">
                            <div className="health-pack-top"></div>
                        </div>
                        <div className="magazine-holster">
                            <div className="magazine"></div>
                        </div>
                    </div>
                </section>
                <section className="legs-container">
                    <div className="belt"></div>
                    <section className="right-leg-container">
                        <div className="right-leg-thigh">
                            <div className="leg-belt">
                                <div className="hand-gun-container">
                                    <div className="gun-grip"></div>
                                    <div className="hand-gun-pipe"></div>
                                </div>
                                <div className="gun-holster"></div>
                            </div>
                        </div>
                        <div className="right-leg-calf">
                            <div className="right-leg-foot"></div>
                        </div>
                    </section>
                </section>
                <section className="left-leg-container">
                    <div className="left-leg-thigh"></div>
                    <div className="left-leg-calf">
                        <div className="left-leg-foot"></div>
                    </div>
                </section>
            </section>
        );
    }
}
