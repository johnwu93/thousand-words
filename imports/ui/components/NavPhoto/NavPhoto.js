import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import React from 'react';

import './NavPhoto.scss';


const NavPhoto = ({ url, isHighlighted }) => {
  let className = 'photo-fit py2';
  if (isHighlighted) {
    className += ' fade';
  }
  return <Image className={className} src={url} />;
};

NavPhoto.propTypes = {
  url: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool,
};

NavPhoto.defaultProps = {
  isHighlighted: true,
};


export default NavPhoto;
