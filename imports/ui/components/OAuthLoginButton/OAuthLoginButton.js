import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Icon from '../Icon/Icon';

import './OAuthLoginButton.scss';

const handleLogin = (service, callback) => {
  const options = {
    facebook: {
      requestPermissions: ['email'],
      loginStyle: 'popup',
    },
    github: {
      requestPermissions: ['user:email'],
      loginStyle: 'popup',
    },
    instagram: {
      requestPermissions: ['basic'],
      loginStyle: 'popup',
    },
    google: {
      requestPermissions: ['email', 'profile'],
      requestOfflineToken: true,
      loginStyle: 'popup',
    },
  }[service];

  return {
    facebook: Meteor.loginWithFacebook,
    github: Meteor.loginWithGithub,
    google: Meteor.loginWithGoogle,
    instagram: Meteor.loginWithInstagram,
  }[service](options, callback);
};

const serviceLabel = {
  facebook: (
    <span>
      <Icon icon="facebook-official" /> LOG IN WITH FACEBOOK
    </span>
  ),
  github: (
    <span>
      <Icon icon="github" /> LOG IN WITH GITHUB
    </span>
  ),
  google: (
    <span>
      <Icon icon="google" /> LOG IN WIHT GOOGLE
    </span>
  ),
  instagram: (
    <span>
      <Icon icon="instagram" /> LOG IN WITH INSTAGRAM
    </span>
  ),
};

const OAuthLoginButton = ({ service, callback }) => (
  <button
    className={`OAuthLoginButton OAuthLoginButton-${service}`}
    type="button"
    onClick={() => handleLogin(service, callback)}
  >
    {serviceLabel[service]}
  </button>
);

OAuthLoginButton.defaultProps = {
  callback: error => {
    if (error) Bert.alert(error.message, 'danger');
  },
};

OAuthLoginButton.propTypes = {
  service: PropTypes.string.isRequired,
  callback: PropTypes.func,
};

export default OAuthLoginButton;
