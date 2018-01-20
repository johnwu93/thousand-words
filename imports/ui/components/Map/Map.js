import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';

import './Map.scss';
import Marker from './Marker';
import { K_SIZE } from './MarkerStyle.js';

const API_KEY = 'AIzaSyB5iietztYKIpB-vD81e0mCpAgofaIayHY';

class Map extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Map">
        <GoogleMap
          bootstrapURLKeys={{
            key: API_KEY,
            language: 'en',
            region: 'en',
          }}
          hoverDistance={K_SIZE / 2}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.data.map((item) => <Marker
            lat={item.lat} lng={item.long} text={item.type}/>)}
        </GoogleMap>
      </div>
    );
  }
}

Map.defaultProps = {
  center: [34.411773, -119.847126],
  zoom: 15,
};

Map.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
};

export default Map;
