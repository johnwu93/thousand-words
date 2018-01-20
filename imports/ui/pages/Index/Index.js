import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';

import './Index.scss';

const Index = () => {
  const handleSubmit = () => {};

  return (
    <div className="Index">
      <h1>Thousand Words</h1>
      <p>Bring your past experiences to life</p>
      <div className="Signup">
        <Row>
          <Col xs={12}>
            <OAuthLoginButtons
              services={['facebook', 'github', 'google', 'instagram']}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
