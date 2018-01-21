import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { greatPlaceStyle, greatPlaceStyleHover } from './MarkerStyle.js';

import './Marker.scss';

class Marker extends Component {
  render() {
    const style = this.props.$hover ? greatPlaceStyleHover : greatPlaceStyle;

    return (
      <div className="Marker">

        <div className="positioning">
          <img className="marker-size" src="/marker.png">
          </img>
        </div>
      </div>
    );
  }
}

Marker.propTypes = {
  $hover: PropTypes.bool,
  text: PropTypes.string,
};

export default Marker;
