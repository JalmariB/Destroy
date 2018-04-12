import React from 'react';
import { Component } from 'react';
import Soldier from './Soldier.jsx';
import Robot from './Robot.jsx';
import GameOverInfo from './GameOverInfo.jsx'

import Background from './Background.jsx';

require('../sass/main.scss');
require('../sass/hit.scss');
require('../sass/hit-animation.scss')
require('../sass/background.scss')


export default class Game extends Component {


    constructor(props) {
        super(props);
        this.state = ({
            robotRender: true,
            gameOver:false
        });
        this.fired = false;
    }

//vaihda function nimi
    count() {
        var newStateLeft =  this.props.mainState.left - 10000
        this.props.handleMovementState(newStateLeft)

    }
    showGameOverInfo() {

        this.setState({
            gameOver: true
        })
    }

    restartGame() {
        this.props.handleRestartGame();
    }
    //deal with this
    checkAreAllRobotsDead() {
        if ($('.robot-container').length === 0) {
        }
    }
    soldierDeath(){
        let self = this;
        $('#shooter-container').addClass('soldier-death')
        setTimeout(function(){
            self.showGameOverInfo();
        },2000);
        
    }
    checkCollision(){
        let self = this;
        $(".robot-container").each(function () {

            if ($(this).offset().left < 130) {
                self.soldierDeath();
            }
        });
    }
    gameLoop() {
        let self = this;
        setInterval(function () {
            self.checkAreAllRobotsDead();
            self.checkCollision();

        }, 20);
    }

    gameStartCount() {
       setTimeout(function () { 
            $('.robot-container').css({ left: 60 })
        }, 2000); 
        
    }
    
    walk(key) {
       
        if (key.key == 'd') {
            if (!this.fired) {
                this.fired = true;
                this.count();
            }
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
        this.fired = false;
        let stopWalkPosition = $('.game-container').offset().left;
        this.props.handleMovementState(stopWalkPosition)
        if (key.key == 'd') {
            
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
        var neighboringSide = mouseXPosition - 119 ;
        var oppositeSide = mouseYPosition - 554;
        var angle = oppositeSide / neighboringSide * 100;
        return angle;
        
    }

    hit(){
       var self = this; 
        $(document).on("mousemove", function (e) {
            var mouseXPosition = e.pageX;
            var mouseYPosition = e.pageY;
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
       /*  $('.blast').addClass('blast-animation')    */
    }
 
    removeHitAnimation(){
        $('.hit-1').removeClass('hit-animation-1')
        $('.hit-2').removeClass('hit-animation-2')
        $('.hit-3').removeClass('hit-animation-3')
        $('.hit-4').removeClass('hit-animation-4')
       /*  $('.blast').removeClass('blast-animation') */
    }


    shoot() {
        var audioElement = document.getElementById('audio');
        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.play();
        $('.gun-fire-container').addClass('gun-fire-animation');
        $('.chell').addClass('chell-animation')
        $('.hands-container').addClass('hands-animation-shooting');
       /*  this.showGameOverInfo() */
    }
    stopShooting() {
       $('.hands-container').removeClass('hands-animation-shooting') 
        $('.gun-fire-container').removeClass('gun-fire-animation');
        $('.chell').removeClass('chell-animation');
    }
   
    componentDidMount() {
        document.addEventListener("keydown", this.walk.bind(this));
        document.addEventListener("keyup", this.stopWalk.bind(this));
        document.addEventListener("mousedown", this.shoot.bind(this));
        document.addEventListener("mouseup", this.stopShooting.bind(this));
        document.addEventListener("mousemove", this.aim.bind(this));
        console.log('mount')
        
        this.gameStartCount();
        this.gameLoop();
    }
  
    robotIdGenerator(){
        let d = new Date();
        let id = d.getTime();
        return id;
    }
    keyGenerator() {
        let d = new Date();
        let key = d.getTime();
        return key;
    }
    robotColorGenerator(){
        let colors = ['#4d4d4d', '#cc33ff', '#3366ff', '#00ffcc'];
        let randomNumber = Math.floor((Math.random() * colors.length) + 1);
        let color = colors[randomNumber]
        return color;
    }
    robotStartPositionGenerator() {
        let randomNumber = Math.floor((Math.random() * 4000) + 1000);
        return randomNumber;
    }
    robotSpeedGenerator(){
        let randomNumber = Math.floor((Math.random() * 50) + 1);

        return randomNumber;
    }
    /* speedGenerator(){
        let randomNumber = Math.floor((Math.random() * 10) + 1);
        return randomNumber;
    } */

    renderRobotComponents(numberOfRobots) {
        let robotArray = [];

        for (var i = 0; i < numberOfRobots; i++) {
            /* let key = this.keyGenerator() + i; */
            let robotInitValues = {
                id: this.robotIdGenerator(),
                color: this.robotColorGenerator(),
                startPosition: this.robotStartPositionGenerator(),
                speed: this.robotSpeedGenerator(),

            }

            robotArray.push(<Robot  aim={this.aim} robotInitValues={robotInitValues} />)
        }
        return [...robotArray];
    }

    collisionCheck(){
       
    }
   
   
    
    render() {
        this.collisionCheck()
        const divStyle = {
            left: this.props.mainState.left,
        };

        return (
            <section style={divStyle} className="game-container">    
            <audio id="audio" ref="audio_tag" src="src/audio/shot.mp3" />
                {this.state.gameOver ? <GameOverInfo restartGame={this.restartGame.bind(this)} /> : null}
            <section className="background-container">
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
                {(this.state.robotRender ? this.renderRobotComponents(this.props.mainState.howManyRobots) : null)} 
            </section>
        );
    }

}
