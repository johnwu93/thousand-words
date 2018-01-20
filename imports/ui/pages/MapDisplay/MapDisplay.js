import React, { Component } from 'react';

import Map from '../../components/Map/Map';

import './MapDisplay.scss';

class MapDisplay extends Component {
  render() {
    return (
      <div className="MapDisplay">
        <Map />
      </div>
    );
  }
}

export default MapDisplay;
