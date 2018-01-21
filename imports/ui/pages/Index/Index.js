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
        <Col xs={6} xsOffset={3} sm={4} smOffset={4} className="Index" >
          <h1>Getting Started</h1>
          <p>Bring past experiences to life</p>
          <div className="Signup">
            <Row>
              <Col xs={12}>
                <OAuthLoginButtons
                  history={this.props.history}
                  services={['instagram', 'facebook']}
                />
              </Col>
            </Row>
          </div>
          {this.redirect()}
        </Col>
      </Row>
    );
  }
}

Index.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Index;
