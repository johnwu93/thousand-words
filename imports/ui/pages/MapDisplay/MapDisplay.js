import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Image, Row } from 'react-bootstrap';

import Map from '../../components/Map/Map';

import './MapDisplay.scss';

const data1 = {
  id: 1,
  lat: 34.412269,
  long: -119.853971,
  type: 'Sports',
  url: 'https://scontent.cdninstagram.com/vp/c69639ead3498f11795bb76440bf22a9/5A661B3D/t51.2885-15/s320x320/e15/25018724_318566785309272_6481657784889769984_n.jpg',
};

const data2 = {
  id: 2,
  lat: 34.412092,
  long: -119.849937,
  type: 'Coffee',
  url: 'https://scontent.cdninstagram.com/vp/8df1d4d946d467bd1454622b8ddfd373/5A66342A/t51.2885-15/s320x320/e15/22430471_298987133919169_4631210793726115840_n.jpg',
};

const data3 = {
  id: 3,
  lat: 34.412819,
  long: -119.847095,
  type: 'Music',
  url: 'https://scontent.cdninstagram.com/vp/8df1d4d946d467bd1454622b8ddfd373/5A66342A/t51.2885-15/s320x320/e15/22430471_298987133919169_4631210793726115840_n.jpg',
};

const MapRow = ({ imgUrl1, imgUrl2 }) => (
  <div className="py2">
    <Row>
      <Image className="photo-fit py2" src={imgUrl1} />
      <Image className="photo-fit py2" src={imgUrl2} />
    </Row>
  </div>
);

MapRow.propTypes = {
  imgUrl1: PropTypes.string.isRequired,
  imgUrl2: PropTypes.string.isRequired,
};

const NavPhoto = ({ imgUrl }) => (
  <Image className="photo-fit py2" src={imgUrl} />
);

NavPhoto.propTypes = {
  imgUrl: PropTypes.string.isRequired,
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
      // TODO
      // check if user exists
      // and load data from fi rebase
      // if not, redirect to index page
    } else {
      // load data for Meteor.userId() from firebase
    }
  }

  setHoverKey(key) {
    this.setState({ hoverKey: key });
  }

  render() {
    return (
      <Grid>
        <Row className="MapDisplay">
          <Col className="Col" xs={12} sm={6}>
            <NavPhoto imgUrl={data1.url} />
            <NavPhoto imgUrl={data2.url} />
            <NavPhoto imgUrl={data1.url} />
            <NavPhoto imgUrl={data3.url} />
          </Col>


          <Col className="Col" xs={12} sm={6}>
            <Map className="py2" data={[data1, data2, data3]} setHoverKey={this.setHoverKey} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

MapDisplay.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default MapDisplay;
