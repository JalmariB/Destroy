import React, {Component} from 'react';

require('style/bullets.scss');

export default class Bullet extends Component {

    render(){

        return (
            <section className="bullet">
                <div className="bullet-head"></div>
                <div className="bullet-torso"></div>
                <div className="bullet-bottom"></div>
            </section>

        );
    }
}