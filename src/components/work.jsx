import React from 'react';
import {Component} from 'react';


require('../sass/work.scss');



export default class Work extends Component {

    dockPosition() {
        console.log('doc')
        $('.console-container').toggleClass('dock-right');
    }

    render(){
        return (
            <section className="console-container">
                <div className="top-bar">
                    <h1 className="top-bar-title">ARTER CODING CHALLENGE</h1>
                    <div className="top-bar-button-container">
                        <button onClick={this.dockPosition} className="dock-side-button"></button>
                        <button className="hide-console-button"></button>  
                    </div>
                </div> 
                <div className="console-content-container">
                   {/* <div className="instructions"></div> */}
                    <div className="editor-view">
                       { /* editor here */}
                    </div>
                </div>
                <div className="console-button-container">
                    <button className="secondary-button"><i></i>attempt</button> 
                    <button className="primary-button">submit answer</button>                   
                </div>     
            </section>
        );
    }



}