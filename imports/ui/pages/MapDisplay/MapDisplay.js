import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import Loading from '../../components/Loading/Loading';

import './MapDisplay.scss';

class Map extends Component {
  render() {
    return (
      <div>
        Put Map Here
      </div>
    );
  }
}

export default Map;
