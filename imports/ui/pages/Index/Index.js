import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';

import './Index.scss';
import '../../components/DesktopPhoto/DesktopPhoto.scss';

class Index extends Component {
  redirect() {
    if (Meteor.user()) {
      return <Redirect to="/map" />;
    }
    return <div />;
  }

  render() {
    return (

      <Row className="row_landing">
        <div className="Index" >
          <h1>Thousand Words</h1>
          <p>Bring past experiences to life</p>
          <div className="text-center Signup">
            <Row>
              <Col xs={12}>
                <OAuthLoginButtons
                  history={this.props.history}
                  services={['instagram', 'facebook']}
                />
              </Col>
            </Row>
          </div>
          <h6>By continuing, you agree to ThousandWord&apos;s Terms of Service, Privacy Policy</h6>
          {this.redirect()}
        </div>
      </Row>
    );
  }
}

Index.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Index;
