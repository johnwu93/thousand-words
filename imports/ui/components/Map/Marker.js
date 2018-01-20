import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { greatPlaceStyle } from './MarkerStyle.js';

class Marker extends Component {
  render() {
    return (
       <div style={ greatPlaceStyle }>
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
