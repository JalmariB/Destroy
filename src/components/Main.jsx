import React from 'react';
import { Component } from 'react';
import Footer from './Footer.jsx';
import Introduction from './Introduction.jsx';

require('../sass/main.scss');

export default class Main extends Component {
  render() {
    return (
     <section className="portfolio-app-container">
        <Introduction/>
        <Footer/>
     </section>
      );
  }
}
