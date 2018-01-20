import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { greatPlaceStyle, greatPlaceStyleHover } from './MarkerStyle.js';

class Marker extends Component {
  render() {
    const style = this.props.$hover ? greatPlaceStyleHover : greatPlaceStyle;

    return (
      <div style={style}>
        {this.props.text}
      </div>
    );
  }
}

Marker.propTypes = {
  $hover: PropTypes.bool,
  text: PropTypes.string,
}

export default Marker;
