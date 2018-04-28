import React from 'react';
import { Component } from 'react';
import Soldier from './Soldier.jsx';
import Robot from './Robot.jsx';
import GameOverInfo from './GameOverInfo.jsx';
import Mothership from './Mothership.jsx';
import Background from './Background.jsx';
import Bullets from './Bullets.jsx';
import Moon from './Moon.jsx';

require('../sass/main.scss');
require('../sass/hit.scss');
require('../sass/hit-animation.scss')
require('../sass/background.scss')


export default class Game extends Component {


    constructor(props) {
        super(props);
        this.state = ({
            robotRender: true,
            gameOver:false,
            bullet:14,
            allRobotsAreDead:false,
            motherShipsRobots:0
        });
        this.fired = false;
    }

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
    //WIP
    setStateAllRobotsAreDead(){
       /*  console.log('set state') */
        this.setState({
            allRobotsAreDead:true,
            motherShipsRobots:this.state.motherShipsRobots + 1
            
        })
    }
    beamLightAnimation() {
        $('.beam-light-container').removeClass('beam-animation');
        setTimeout(function () {
            $('.beam-light-container').addClass('beam-animation');
        }, 10);
    }
    checkAreAllRobotsDead() {
        let howManyRobotsHasClassHeadShot = document.getElementsByClassName('headshot').length;
      
        if (howManyRobotsHasClassHeadShot === this.props.mainState.howManyRobots + this.state.motherShipsRobots - 1) {
            let self = this;
            this.beamLightAnimation();
            setTimeout(function(){
                self.setStateAllRobotsAreDead();
            }, 3500);
            
        }   
    }

    soldierDeath() {
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
            
          /*   self.checkCollision();  */

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
            if(angle < 60 && angle > -60) {

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

    countAngle(mouseXPosition, mouseYPosition){
        const torsoLeft = $('.torso').offset().left;
        const torsoTop = $('.torso').offset().top - 10;
        const neighboringSide = mouseXPosition - torsoLeft;
        const oppositeSide = mouseYPosition - torsoTop;
        var angle = oppositeSide / neighboringSide * 100;

        const radians = Math.atan2(oppositeSide, neighboringSide);
        angle = radians * 180/Math.PI;
        
        return angle;
        
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
    }
 
    removeHitAnimation(){
        $('.hit-1').removeClass('hit-animation-1')
        $('.hit-2').removeClass('hit-animation-2')
        $('.hit-3').removeClass('hit-animation-3')
        $('.hit-4').removeClass('hit-animation-4')
    }

    setAmmoState(){
      
        this.setState({
            bullet:this.state.bullet - 1

        })
    }
  

    shoot() {
        var audioElement = document.getElementById('audio');
        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.play();
        $('.gun-fire-container').addClass('gun-fire-animation');
        $('.chell').addClass('chell-animation')
        $('.hands-container').addClass('hands-animation-shooting');

        const lastBulletComponentId = $('.bullet').last()[0];
        
        this.setAmmoState();
        if (this.state.bullet == 0) {
            document.removeEventListener("mousedown", this.shoot.bind(this));
        }
        else {
            lastBulletComponentId.remove();
        }

        this.checkAreAllRobotsDead();
       
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

    renderRobotComponents(numberOfRobots) {
        
        let robotArray = [];

        for (var i = 0; i < numberOfRobots; i++) {
            /* let key = this.keyGenerator() + i; */
            let robotInitValues = {
                id: this.robotIdGenerator(),
                color: this.robotColorGenerator(),
                startPosition: !this.state.allRobotsAreDead ? this.robotStartPositionGenerator() : this.positionOfMotherShip(),
                speed: this.robotSpeedGenerator(),
               
            }
//AIM FUNCTION PASSAAMINEN TURHAA?
            robotArray.push(<Robot allRobotsAreDead={this.state.allRobotsAreDead}   aim={this.aim} robotInitValues={robotInitValues} />)
        }
        return [...robotArray];
    }

    positionOfMotherShip(){
        //let positionLeft = $('.beam-container').offset().left + $('.beam-container').width() / 2 - $('.robot-container').width() / 2;
        let positionLeft = 5450; 
        return positionLeft;
        
    }
    
    render() {
        const divStyle = {
            left: this.props.mainState.left,
        };
       
        

        return (
            <section style={divStyle} className="game-container">  
                <Bullets />
            <audio id="audio" ref="audio_tag" src="src/audio/shot.mp3" />
                {this.state.gameOver ? <GameOverInfo restartGame={this.restartGame.bind(this)} /> : null}
            <section className="background-container">
                <Background mainState={this.props.mainState} />
                <Background mainState={this.props.mainState} />
                <Background mainState={this.props.mainState} />
                <Background mainState={this.props.mainState} />
                <Moon />
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
                <Mothership />
                {(this.state.allRobotsAreDead || this.state.motherShipsRobots > 0 ? this.renderRobotComponents(this.state.motherShipsRobots) : null)} 
            </section>
        );
    }
}
