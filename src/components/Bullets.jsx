import React, {Component} from 'react';
import Bullet from './Bullet.jsx';

require('style/bullets.scss');

export default class Bullets extends Component {
    constructor(props) {
        super(props)
       
    }


    renderBullets(){
        let bulletArray = [];
        const amounthOfBulletID = 15;

        for (var i = 0; i < amounthOfBulletID; i++) {
            const robotInitValues = {
                id: i,
            }

            bulletArray.push(<Bullet />)
        }
        return [...bulletArray];
    }

    render(){
        return (
            <section id="bullets">
                {this.renderBullets()}
            </section>

        );
    }

}