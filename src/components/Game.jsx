import React from 'react';
import { Component } from 'react';
import Soldier from './Soldier.jsx';
import Robot from './Robot.jsx';
import Ground from './Ground.jsx';
import Background from './Background.jsx';

require('../sass/main.scss');
require('../sass/hit.scss');
require('../sass/hit-animation.scss')
require('../sass/background.scss')

export default class Game extends Component {

/*     renderRobotComponent() {
        $(".game-container").append('' + <Robot /> + '');
        return <Robot />;

    } */

    walk(key) {
        if (key.key == 'ArrowRight') {
            console.log('ArrowRight')
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
          var self = this;
          $(document).on("mousemove", function (event) {
              
              var mouseXPosition = event.pageX;
              var mouseYPosition = event.pageY;
              //HUOM! KUN TÄHDÄDÄÄN ROBOTTIA NIIN TULEE ERROR, LUULTAVASTI JOHTUU VAAN Z-INDEXISTÄ
              var angle = self.countAngle(mouseXPosition, mouseYPosition);
            if(angle < 40 && angle > -40) {

                $('.shooting-elements-container').css({
                    '-webkit-transform': 'rotate(' + angle + 'deg)',
                    '-moz-transform': 'rotate(' + angle + 'deg)',
                    '-ms-transform': 'rotate(' + angle + 'deg)',
                    '-o-transform': 'rotate(' + angle + 'deg)',
                    'transform': 'rotate(' + angle + 'deg)',
                })
            }       
          }); 
    }

    defaultAim() {
        var defaultDegrees = 0;
    
        $('.hands-container, .head-container').css({
            left: -30,
            '-webkit-transform': 'rotate(' + defaultDegrees + 'deg)',
            '-moz-transform': 'rotate(' + defaultDegrees + 'deg)',
            '-ms-transform': 'rotate(' + defaultDegrees + 'deg)',
            '-o-transform': 'rotate(' + defaultDegrees + 'deg)',
            'transform': 'rotate(' + defaultDegrees + 'deg)',
        })
    }

    countAngle(mouseXPosition, mouseYPosition){
        var offset = $('.shooting-elements-container').offset();
        /* console.log('offset left', offset.left) */
        var neighboringSide = mouseXPosition - 119 ;
        var oppositeSide = mouseYPosition - 554;
        var angle = oppositeSide / neighboringSide * 100;
        console.log('Angle', angle)
        return angle;
        
    }

    hit(){
       var self = this; 
        $(document).on("mousemove", function (event) {
            var mouseXPosition = event.pageX;
            var mouseYPosition = event.pageY;
            self.countAngle(mouseXPosition, mouseYPosition);
            
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
        $('.fragment-one').removeClass('fragment-one-animation');
        $('.fragment-two').removeClass('fragment-two-animation');
        $('.fragment-tre').removeClass('fragment-tre-animation')
        $('.fragment-four').removeClass('fragment-four-animation')
        
    }


    shoot() {
       /*  $('.hands-container').addClass('hands-animation-shooting') */
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
        document.addEventListener("mousemove", this.aim.bind(this));
        
    }

    renderRobotComponents(numberOfRobots) {
        var robotArray = [];

        for (var i = 0; i < numberOfRobots; i++) {
            robotArray.push(<Robot aim={this.aim} />)
        }
        return [...robotArray];
    }
    
    render() {
        return (
            <section className="game-container">
            <Background />
                <div className="hit-container">
                    <span className="fragment-one"></span>
                    <span className="fragment-two"></span>
                    <span className="fragment-tre"></span>
                    <span className="fragment-four"></span>
                </div>
                <Soldier />
                {this.renderRobotComponents(this.props.howManyRobots)} 
                <Ground />
            </section>
        );
    }

}
