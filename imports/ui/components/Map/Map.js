import React, { Component } from 'react';
import controllable from 'react-controllables';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import ShareModal from '../ShareModal/ShareModal';

import './Map.scss';
import Marker from './Marker';
import { K_SIZE } from './MarkerStyle.js';

const API_KEY = 'AIzaSyB5iietztYKIpB-vD81e0mCpAgofaIayHY';

class Map extends Component {
  constructor(props) {
    super(props);
    this.onChildClick = this.onChildClick.bind(this);
    this.onChildMouseEnter = this.onChildMouseEnter.bind(this);
    // this.onChildMouseLeave = this.onChildMouseLeave.bind(this);
  }

  onChildClick(key, childProps) {
    this.props.onCenterChange([childProps.lat, childProps.lng]);
    this.props.setHoverKey(key);
  }

  onChildMouseEnter(key) {
    this.props.setHoverKey(key);
  }

  render() {
    const Markers = this.props.data &&
      this.props.data.map(item => (
        <Marker
          key={item.id}
          lat={item.lat}
          lng={item.long}
          text={item.type}
          hover={this.props.hoverKey === item.id}
        />
      ));

    return (
      <div className="Map">

        <GoogleMap
          bootstrapURLKeys={{
            key: API_KEY,
            language: 'en',
            region: 'en',
          }}
          onChildClick={this.onChildClick}
          hoverDistance={K_SIZE / 2}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
          center={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {Markers}
        </GoogleMap>
        <ShareModal />
      </div>
    );
  }
}

Map.defaultProps = {
  center: [34.411773, -119.847126],
  zoom: 15,
  data: [],
  hoverKey: undefined,
};

Map.propTypes = {
  data: PropTypes.array,
  center: PropTypes.array,
  zoom: PropTypes.number,
  hoverKey: PropTypes.string,
  setHoverKey: PropTypes.func.isRequired,
  onCenterChange: PropTypes.func,
};

export default controllable(Map, ['center', 'data', 'clickKey']);
