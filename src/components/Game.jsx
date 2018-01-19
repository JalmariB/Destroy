import React from 'react';
import { Component } from 'react';
import Soldier from './Soldier.jsx';
import Robot from './Robot.jsx'

require('../sass/main.scss');
require('../sass/hit.scss');
require('../sass/hit-animation.scss')

export default class Game extends Component {


    walk(key) {
        if (key.key == 'ArrowRight') {
            $('.right-leg-thigh').addClass('right-leg-thigh-animation')
            $('.right-leg-calf').addClass('right-leg-calf-animation')
            $('.right-leg-foot').addClass('right-leg-foot-animation')
            /* left leg */
            $('.left-leg-thigh').addClass('left-leg-thigh-animation')
            $('.left-leg-calf').addClass('left-leg-calf-animation')
            $('.left-leg-foot').addClass('left-leg-foot-animation')
        }
    }
    stopWalk(key) {
        if (key.key == 'ArrowRight') {
            $('.right-leg-thigh').removeClass('right-leg-thigh-animation')
            $('.right-leg-calf').removeClass('right-leg-calf-animation')
            $('.right-leg-foot').removeClass('right-leg-foot-animation')

            /* left leg */
            $('.left-leg-thigh').removeClass('left-leg-thigh-animation')
            $('.left-leg-calf').removeClass('left-leg-calf-animation')
            $('.left-leg-foot').removeClass('left-leg-foot-animation')
        }
    }

      aim() {
          console.log('aim')
        var degrees = 2;

        $('.hands-container, .head-container').css({
            left: -15,
            '-webkit-transform': 'rotate(' + degrees + 'deg)',
            '-moz-transform': 'rotate(' + degrees + 'deg)',
            '-ms-transform': 'rotate(' + degrees + 'deg)',
            '-o-transform': 'rotate(' + degrees + 'deg)',
            'transform': 'rotate(' + degrees + 'deg)',
        })
    }

    defaultAim() {
        var defaultDegrees = 14;
        $('.hands-container, .head-container').css({
            left: -30,
            '-webkit-transform': 'rotate(' + defaultDegrees + 'deg)',
            '-moz-transform': 'rotate(' + defaultDegrees + 'deg)',
            '-ms-transform': 'rotate(' + defaultDegrees + 'deg)',
            '-o-transform': 'rotate(' + defaultDegrees + 'deg)',
            'transform': 'rotate(' + defaultDegrees + 'deg)',
        })
    }


    hit(){
        $(document).on("mousemove", function (event) {
            var mouseXPosition = event.pageX;
            var mouseYPosition = event.pageY;
            $('.hit-container').css({
                 zIndex:99,
                top: mouseYPosition,
                left: mouseXPosition
            }) 
        });
        $('.fragment-one').addClass('fragment-one-animation');
        $('.fragment-two').addClass('fragment-two-animation');
        $('.fragment-tre').addClass('fragment-tre-animation');
        $('.fragment-four').addClass('fragment-four-animation');
        
    }
 
    removeHitAnimation(){
        console.log('stop')
        $('.fragment-one').removeClass('fragment-one-animation');
        $('.fragment-two').removeClass('fragment-two-animation');
        $('.fragment-tre').removeClass('fragment-tre-animation')
        $('.fragment-four').removeClass('fragment-four-animation')
        
    }


    shoot() {
        $('.hands-container').addClass('hands-animation-shooting')
        $('#shooter-container').addClass('shooting-lights')
        this.hit()


    }
    stopShooting() {
        $('.hands-container').removeClass('hands-animation-shooting')
        $('#shooter-container').removeClass('shooting-lights')
        this.removeHitAnimation()
    }


    componentDidMount() {
        document.addEventListener("keydown", this.walk.bind(this));
        document.addEventListener("keyup", this.stopWalk.bind(this));
        document.addEventListener("mousedown", this.shoot.bind(this));
        document.addEventListener("mouseup", this.stopShooting.bind(this));
    }

    renderRobotComponents(numberOfRobots) {
        var robotArray = [];

        for (var i = 0; i < numberOfRobots; i++) {
            robotArray.push(<Robot aim={this.aim} defaultAim={this.defaultAim} />)
        }
        return [...robotArray];
    }
    
    render() {
        return (
            <section className="game-container">
                <div className="hit-container">
                    <span className="fragment-one"></span>
                    <span className="fragment-two"></span>
                    <span className="fragment-tre"></span>
                    <span className="fragment-four"></span>
                </div>
                <Soldier />
                {this.renderRobotComponents(this.props.howManyRobots)}
            </section>
        );
    }

}
