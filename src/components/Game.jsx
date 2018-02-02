import React from 'react';
import { Component } from 'react';
import Soldier from './Soldier.jsx';
import Robot from './Robot.jsx';

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
    
  /*   moveBackground() {
        
        var step = 2;
        $('.game-background').addClass('move-background');
    } */

    count() {
        var newStateRight =  this.props.mainState.right + 5
        this.props.handleMovementState(newStateRight)
    }  
    generateNewBackground() {
      
        if(this.props.mainState.right === 5){
            console.log('5 on')


        }
    }

    walk(key) {
        
        if (key.key == 'ArrowRight') {
            $('.right-leg-thigh').addClass('right-leg-thigh-animation')
            $('.right-leg-calf').addClass('right-leg-calf-animation')
            $('.right-leg-foot').addClass('right-leg-foot-animation')
            /* left leg */
            $('.left-leg-thigh').addClass('left-leg-thigh-animation')
            $('.left-leg-calf').addClass('left-leg-calf-animation')
            $('.left-leg-foot').addClass('left-leg-foot-animation')

            
            this.count()
            this.generateNewBackground()

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
        console.log('mousex', mouseXPosition)
        var offset = $('.shooting-elements-container').offset();
        var neighboringSide = mouseXPosition - 119 ;
        var oppositeSide = mouseYPosition - 554;
        var angle = oppositeSide / neighboringSide * 100;
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
        $('.hit-1').addClass('hit-animation-1')
        $('.hit-2').addClass('hit-animation-2')
        $('.hit-3').addClass('hit-animation-3')
        $('.hit-4').addClass('hit-animation-4')
        $('.blast').addClass('blast-animation')
        
    }
 
    removeHitAnimation(){
        $('.hit-1').removeClass('hit-animation-1')
        $('.hit-2').removeClass('hit-animation-2')
        $('.hit-3').removeClass('hit-animation-3')
        $('.hit-4').removeClass('hit-animation-4')
        $('.blast').removeClass('blast-animation')
    }


    shoot() {
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

        const divStyle = {
            right: this.props.mainState.right,
        };

        return (
            <section className="game-container">
            <section style={divStyle} className="background-container">
                <Background mainState={this.props.mainState} />
                <Background mainState={this.props.mainState} />
                <Background mainState={this.props.mainState} />
                
            </section> 
                <div className="hit-container">
                    <div className="hit-1"></div>
                    <div className="hit-2"></div>
                    <div className="blast"></div>
                    <div className="hit-3"></div>
                    <div className="hit-4"></div>
                </div>
                <Soldier />
                {this.renderRobotComponents(this.props.mainState.howManyRobots)} 
                
            </section>
        );
    }

}
