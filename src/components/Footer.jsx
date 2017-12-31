import React from 'react';
import { Component } from 'react';

require('../sass/footer.scss');

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer-container">
        <div className="copyright-text">
          <p>copyright 2017 Janne Berg</p>
        </div>
        <div className="some"></div>

      </footer>
      );
  }
}
