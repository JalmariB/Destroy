import React from 'react';
import { Component } from 'react';
import Soldier from './Soldier.jsx';
import Robot from './Robot.jsx';
import GameOverInfo from './GameOverInfo.jsx';
import GameWonInfo from './GameWonInfo.jsx';
import Mothership from './Mothership.jsx';
import Background from './Background.jsx';
import Bullets from './Bullets.jsx';
import Moon from './Moon.jsx';
import Explosion from './Explosion.jsx';

require('../sass/main.scss');
require('../sass/hit.scss');
require('../sass/hit-animation.scss')
require('../sass/background.scss')


export default class Game extends Component {


    constructor(props) {
        super(props);
        this.state = ({
            robotRender: true,
            gameOver: false,
            gameWon: false,
            bullet: 14,
            allRobotsAreDead: false,
            motherShipsRobots: 0,
            explode: false,
            motherShipsDestroyed:false,
            outOfammo: false
        });
        this.fired = false;
    }

    count() {
        var newStateLeft = this.props.mainState.left - 10000
        this.props.handleMovementState(newStateLeft)
    }

    setStateExplode() {
        this.setState({
            explode: true
        });
    }
    showGameOverInfo() {

        this.setState({
            gameOver: true
        });
    }
    showGameWonInfo() {
        this.setState({
            gameWon: true
        });
    }
    

    mothershipDestroyed(){
        this.setState({
            motherShipsDestroyed:true,
            robotRender: false
        })
    }

    restartGame() {
        this.props.handleRestartGame();
    }

    setStateAllRobotsAreDead() {
        this.setState({
            allRobotsAreDead: true,
            motherShipsRobots: this.state.motherShipsRobots + 1

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
            !this.state.motherShipsDestroyed ? this.beamLightAnimation() : null;
            setTimeout(function () {
                self.setStateAllRobotsAreDead();
            }, 3500);

        }
    }

    soldierDeath() {
        let self = this;
        $('#shooter-container').addClass('soldier-death')
        setTimeout(function () {
            self.showGameOverInfo();
        }, 2000);

    }

    checkCollision() {
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
            var angle = self.countAngle(mouseXPosition, mouseYPosition);
            if (angle < 60 && angle > -60) {

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

    countAngle(mouseXPosition, mouseYPosition) {
        const torsoLeft = $('.torso').offset().left;
        const torsoTop = $('.torso').offset().top - 10;
        const neighboringSide = mouseXPosition - torsoLeft;
        const oppositeSide = mouseYPosition - torsoTop;
        var angle = oppositeSide / neighboringSide * 100;

        const radians = Math.atan2(oppositeSide, neighboringSide);
        angle = radians * 180 / Math.PI;

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


    hit() {
        var self = this;
        $(document).on("mousemove", function (e) {
            var mouseXPosition = e.pageX;
            var mouseYPosition = e.pageY;
            self.countAngle(mouseXPosition, mouseYPosition);

            $('.hit-container').css({
                zIndex: 99,
                top: mouseYPosition,
                left: mouseXPosition
            })
        });
    }

    setAmmoState() {

        this.setState({
            bullet: this.state.bullet - 1
        })
    }
    setOutOfAmmo(){
        this.setState({
            outOfammo:true
        })
    }
    handleShoot(){
        this.state.bullet > -1 ? this.shoot() : this.setOutOfAmmo();

    }
    shellFly(){
      const buttetFlyRandomDirectionAngle = Math.floor((Math.random() * 90) + 1);  
     
      $('.shell-container').append('<div class="shell shell-animation"></div>');
      $('.shell-animation').css({
        '-webkit-transform': 'rotate(' + buttetFlyRandomDirectionAngle + 'deg)',
        '-moz-transform': 'rotate(' + buttetFlyRandomDirectionAngle + 'deg)',
        '-ms-transform': 'rotate(' + buttetFlyRandomDirectionAngle + 'deg)',
        '-o-transform': 'rotate(' + buttetFlyRandomDirectionAngle + 'deg)',
        'transform': 'rotate(' + buttetFlyRandomDirectionAngle + 'deg)',
      })

    }

    shoot() {
        var audioElement = document.getElementById('audio');
        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.play();
        $('.gun-fire-container').addClass('gun-fire-animation');
        this.shellFly();
        $('.hands-container').addClass('hands-animation-shooting');
        const lastBulletComponentId = $('.bullet').last()[0];
        this.setAmmoState();
        lastBulletComponentId.remove();
        this.checkAreAllRobotsDead();
    }
   
    stopShooting() {
        $('.hands-container').removeClass('hands-animation-shooting')
        $('.gun-fire-container').removeClass('gun-fire-animation');
    }

    componentDidMount() {
        document.addEventListener("keydown", this.walk.bind(this));
        document.addEventListener("keyup", this.stopWalk.bind(this));
        document.addEventListener("mousedown", this.handleShoot.bind(this));
        document.addEventListener("mouseup", this.stopShooting.bind(this));
        document.addEventListener("mousemove", this.aim.bind(this));
        this.gameStartCount();
        this.gameLoop();
    }

    robotIdGenerator() {
        let d = new Date();
        let id = d.getTime();
        return id;
    }
    keyGenerator() {
        let d = new Date();
        let key = d.getTime();
        return key;
    }
    robotColorGenerator() {
        let colors = ['#4d4d4d', '#cc33ff', '#3366ff', '#00ffcc'];
        let randomNumber = Math.floor((Math.random() * colors.length) + 1);
        let color = colors[randomNumber]
        return color;
    }
    robotStartPositionGenerator() {
        let randomNumber = Math.floor((Math.random() * 4000) + 1000);
        return randomNumber;
    }
    robotSpeedGenerator() {
        let randomNumber = Math.floor((Math.random() * 50) + 1);
        return randomNumber;
    }

    renderRobotComponents(numberOfRobots) {

        let robotArray = [];

        for (var i = 0; i < numberOfRobots; i++) {
            let robotInitValues = {
                id: this.robotIdGenerator(),
                color: this.robotColorGenerator(),
                startPosition: !this.state.allRobotsAreDead ? this.robotStartPositionGenerator() : this.positionOfMotherShip(),
                speed: this.robotSpeedGenerator(),

            }
            robotArray.push(<Robot outOfammo={this.state.outOfammo} allRobotsAreDead={this.state.allRobotsAreDead}  robotInitValues={robotInitValues} />)
        }
        return [...robotArray];
    }

    positionOfMotherShip() {
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
                {this.state.gameWon ? <GameWonInfo restartGame={this.restartGame.bind(this)} /> : null}
                <section className="background-container">
                    <Background mainState={this.props.mainState} />
                    <Background mainState={this.props.mainState} />
                    <Background mainState={this.props.mainState} />
                    <Background mainState={this.props.mainState} />
                    <Moon />
                </section>
                <Soldier />
                {(this.state.robotRender ? this.renderRobotComponents(this.props.mainState.howManyRobots) : null)}
                <Mothership mothershipDestroyed={this.mothershipDestroyed.bind(this)} checkAreAllRobotsDead={this.checkAreAllRobotsDead} beamLightAnimation={this.beamLightAnimation} setStateExplode={this.setStateExplode.bind(this)} showGameWonInfo={this.showGameWonInfo.bind(this)} />
                {(this.state.allRobotsAreDead || this.state.motherShipsRobots > 0 ? this.renderRobotComponents(this.state.motherShipsRobots) : null)}
                {(this.state.explode ? <Explosion /> : null)}
            </section>
        );
    }
}
