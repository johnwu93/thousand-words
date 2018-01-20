import React from 'react';
import { Row, Col } from 'react-bootstrap';
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';

import './Index.scss';

const Index = () => (
  <div className="Index">
    <h1>Thousand Words</h1>
    <p>Bring your past experiences to life</p>
    <div className="Signup">
      <Row>
        <Col xs={12}>
          <OAuthLoginButtons services={['instagram', 'facebook']} />
        </Col>
      </Row>
    </div>
  </div>
);

export default Index;
