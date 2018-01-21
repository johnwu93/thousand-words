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
  category, latitude, longitude, url, name,
}) {
  return {
    category,
    lat: latitude,
    long: longitude,
    url,
    name,
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
            <Col className="Col" xs={12} sm={8} md={9} lg={10}>
              <Map data={formattedPhotos} setHoverKey={this.setHoverKey} shortenUrl={this.props.shortenUrl} />
            </Col>

            <Col className="Col" xs={12} sm={4} md={3} lg={2}>
              <Scrollbars style={{ height: 'calc(100vh - 50px)' }}>
                <NavPhotoList photos={formattedPhotos} hoverKey={this.state.hoverKey} />

              </Scrollbars>
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
