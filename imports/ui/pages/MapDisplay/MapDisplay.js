import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import * as firebase from 'firebase';

import Map from '../../components/Map/Map';

import './MapDisplay.scss';
import NavPhotoList from '../../components/NavPhotoList/NavPhotoList';

const formatSimpleData = function formatSimpleData({
  category, latitude, longitude, url,
}) {
  return {
    category,
    lat: latitude,
    long: longitude,
    url,
  };
};

const formatFetchedData = function formatFetchedData(fetchedPhotosDict) {
  return Object.keys(fetchedPhotosDict).map((fetchedPhotoId) => {
    const fetchedPhoto = fetchedPhotosDict[fetchedPhotoId];
    const formattedData = formatSimpleData(fetchedPhoto);
    formattedData.id = fetchedPhotoId;
    return formattedData;
  });
};

const data1 = {
  id: '1',
  lat: 34.412269,
  long: -119.853971,
  type: 'Sports',
  caption: 'This defines the default behaviour for how flex items are laid out along the cross axis on the current line. Think of it as the justify-content version for the cross-axis (perpendicular to the main-axis).',
  name: 'National Stadium, Singapore Sports Hub',
  url: 'https://scontent.cdninstagram.com/vp/c69639ead3498f11795bb76440bf22a9/5A661B3D/t51.2885-15/s320x320/e15/25018724_318566785309272_6481657784889769984_n.jpg',
};

const data2 = {
  id: '2',
  lat: 34.412092,
  long: -119.849937,
  type: 'Coffee',
  caption: 'This defines the default behaviour for how flex items are laid out along the cross axis on the current line. Think of it as the justify-content version for the cross-axis (perpendicular to the main-axis).',
  name: 'InterContinental Singapore',
  url: 'https://scontent.cdninstagram.com/vp/8df1d4d946d467bd1454622b8ddfd373/5A66342A/t51.2885-15/s320x320/e15/22430471_298987133919169_4631210793726115840_n.jpg',
};

const data3 = {
  id: '3',
  lat: 34.412819,
  long: -119.847095,
  type: 'Music',
  caption: 'This defines the default behaviour for how flex item',
  url: 'https://scontent.cdninstagram.com/vp/8df1d4d946d467bd1454622b8ddfd373/5A66342A/t51.2885-15/s320x320/e15/22430471_298987133919169_4631210793726115840_n.jpg',
}

const data4 = {
  id: '4',
  lat: 34.412819,
  long: -119.847095,
  type: 'Music',
  caption: 'This defines the default behaviour for how flex items are laid out along the cross axis on the current line. Think of it as the justify-content version for the cross-axis (perpendicular to the main-axis).',
  name: 'InterContinental Singapore',
  url: 'https://scontent.cdninstagram.com/vp/8df1d4d946d467bd1454622b8ddfd373/5A66342A/t51.2885-15/s320x320/e15/22430471_298987133919169_4631210793726115840_n.jpg',
};


class MapDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { hoverKey: null };
    this.setHoverKey = this.setHoverKey.bind(this);
  }

  componentDidMount() {
    const { match, history } = this.props;
    if (match.params.id) {
      Meteor.call('users.findId', match.params.id, (error, userId) => {
        if (userId) {
          this.fetchData(userId);
        } else {
          history.push('/');
        }
      });
    } else if (Meteor.userId()) {
      this.fetchData(Meteor.userId());
    }
  }

  setHoverKey(key) {
    this.setState({ hoverKey: key });
  }

  fetchData(userId) {
    firebase.database().ref(`LatLong/${userId}`).once('value').then((snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({ photos: snapshot.val() });
      }
    });
  }

  render() {
    if (this.state.photos !== undefined) {
      const formattedPhotos = formatFetchedData(this.state.photos);
      console.log(formattedPhotos);
      return (
        <Grid>
          <Row className="MapDisplay">
            <Col className="Col" xs={12} sm={6}>
              <NavPhotoList photos={formattedPhotos} hoverKey={this.state.hoverKey} />
            </Col>

            <Col className="Col" xs={12} sm={6}>
              <Map data={formattedPhotos} setHoverKey={this.setHoverKey} shortenUrl={this.props.shortenUrl} />
            </Col>
          </Row>
        </Grid>
      );
    }
    return (
      <Grid>
        <Row className="MapDisplay">
          <Col className="Col" xs={12} sm={6} />
          <Col className="Col" xs={12} sm={6} />
        </Row>
      </Grid>
    );
  }
}

MapDisplay.defaultProps = {
  shortenUrl: undefined,
};

MapDisplay.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  shortenUrl: PropTypes.string,
};

export default MapDisplay;
