import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';

import './Index.scss';

class Index extends Component {
  redirect() {
    if (Meteor.user()) {
      return (
        <Redirect to="/map" />
      );
    }
    return <div />;
  }

  render() {
    return (
      <div className="Index">
        <h1>Thousand Words</h1>
        <p>Bring your past experiences to life</p>
        <div className="Signup">
          <Row>
            <Col xs={12}>
              <OAuthLoginButtons history={this.props.history} services={['instagram', 'facebook']} />
            </Col>
          </Row>
        </div>
        {this.redirect()}
      </div>
    );
  }
}

Index.propTypes = {
  history: PropTypes.object.isRequired,
};


export default Index;
