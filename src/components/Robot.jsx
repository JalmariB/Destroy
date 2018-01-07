import React from 'react';
import { component } from 'react';


require('../sass/robot.scss');
require('../sass/robot-animations.scss');


export default class Robot extends React.Component {





    render() {


        return (

            <section id="robot-container">
                <div className="rb-head-container">
                    <div className="rb-head">
                        <div className="rb-eye">
                            <div className="eye-light"></div>
                        </div>
                        <div className="rb-circle"></div>
                    </div>
                    <div className="rb-head-occipital"></div>
                    <div className="rb-head-chin"></div>
                </div>

                <div className="rb-neck"></div>




                <div className="rb-right-shoulder"> </div>
                <section className="right-arm-container">
                    
                
                    <div className="arm"></div>
                    <div className="arm-joint"></div>
                    <div className="arm-bottom"></div>
                    <div className="hand-container">
                        <div className="hand"></div>
                        <div className="fingers-container">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        
                    </div>
                  
               
                </section>
                    










                <div className="rb-torso"></div>

                <div className="rb-stomach"></div>


                <div className="rb-pelvis"></div>
                <div className="rb-right-leg">
                    <div className="pelvis-joint"></div>
                    <div className="thight"></div>
                    <div className="thight-joint"></div>
                    <section className="calf-container"></section>
                        <div className="calf">

                        <div className="find-container">
                            <div className="find"></div>
                            <div className="find"></div>
                            <div className="find"></div>
                        </div>
                        
                        </div>
                       

                </div>
                
  
            </section>
        );
    }
}
