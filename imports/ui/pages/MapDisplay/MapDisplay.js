import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';

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

class MapDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { hoverKey: null };
    this.setHoverKey = this.setHoverKey.bind(this);
  }

  setHoverKey(key) {
    this.setState({ hoverKey: key });
  }

  render() {
    return (
      <Row className="MapDisplay">
        <Col className="Col" xs={12} md={8} >
          <Map data={[data1, data2, data3]} setHoverKey={this.setHoverKey} />
        </Col>
        <Col className="Col" xs={12} md={4} >
          <Image src={data1.url} />
          <Image src={data2.url} />
          <Image src={data3.url} />
        </Col>
      </Row>
    );
  }
}

export default MapDisplay;
