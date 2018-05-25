import React from 'react';
import { component } from 'react';


require('../sass/robot.scss');
require('../sass/robot-animations.scss');


export default class Robot extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            id: this.props.robotInitValues.id,
            color: this.props.robotInitValues.color,
            speed:this.props.robotInitValues.speed,
            startPosition: this.props.robotInitValues.startPosition
        })
        this.occipitalColor = '#ce3a3a';
    }

    handleRobotDeath(e) {
        !this.props.outOfAmmo ? this.headShot(e) : null;
    }

    headShot(e) {
        var $current = $(e.currentTarget);
        if (!$current.hasClass('headshot')) {
            $current.addClass('headshot');
            $current.parent('.robot-container').addClass('robot-down').css({
                animationIterationCount: 1,
                left: $current.offset().left
            })
            $current.parent('.robot-container').find('.wind-container').hide();
            $current.parent('.robot-container').find('.calf').addClass('calf-rotate');
        }
        setTimeout(() => {
            $current.parent().remove();
        }, 6000);
        
    }

    render() {
        const robotSpeedStyle = {
            transition: this.state.speed + 's all linear',
            left: this.state.startPosition
        }
      
        let color = {
            backgroundColor: this.state.color
        }

        return (
            <section id={this.state.id} style={robotSpeedStyle} className="robot-container" onMouseEnter={this.props.aim} onMouseLeave={this.props.defaultAim} onMouseDown={this.props.shoot} onMouseUp={this.props.stopShooting}>
                <div className="rb-head-container" onClick={this.handleRobotDeath.bind(this)} >
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
                <div style={color} className="rb-right-shoulder"> </div>
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
                <div style={color} className="rb-pelvis"></div>
                <div className="rb-right-leg">
                    <div className="pelvis-joint"></div>
                    <div className="thight"></div>
                    <div className="thight-joint"></div>
                    <section className="calf-container"></section>
                    <div className="calf">
                        <div className="wind-container">
                            <div className="wind"></div>
                            <div className="wind"></div>
                            <div className="wind"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
