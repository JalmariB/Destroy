import React, {Component} from 'react';

require('style/mothership.scss');
require('style/mothership-animations.scss')

export default class Mothership extends Component {
    constructor(props){
        super(props)

        this.lightDestroy = this.lightDestroy.bind(this)
        this.checkIfAllLightAreDestroyed = this.checkIfAllLightAreDestroyed.bind(this)

    }

    lightDestroy(e){
        let target = $(e.target);
            target.addClass('ship-light-destroyed-animation');
            this.checkIfAllLightAreDestroyed();
    }

    crash(){
        $('#mothership').addClass('crash-animation');
        $('.beam-cannon').addClass('beam-cannon-down-animation');
        $('.beam-light-container').removeClass('beam-animation');

    }

    checkIfAllLightAreDestroyed(){
        let animationClassLenght = $('.ship-light-destroyed-animation').length
        if(animationClassLenght === 3) {
            this.crash();
            this.props.setStateExplode();
            let self = this;
            setTimeout(function(){
                self.props.showGameWonInfo()
            },17000);
        }
    }

    render(){

        return (
            <section id="mothership" >
                 <div className="flight-deck"></div>
                 <div className="ship-torso" >
                    <div className="light-left">
                        <div className='light' onClick={this.lightDestroy}></div>
                    </div>
                    <div className="light-center">
                        <div className='light' onClick={this.lightDestroy}></div>
                    </div>
                    <div className="light-right">
                        <div className='light' onClick={this.lightDestroy}></div>
                    </div>
                 </div>
                <div className="beam-container">
                    <div className="beam-cannon"></div>
                    <div className="beam-light-container">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </section>
        );

    }
}