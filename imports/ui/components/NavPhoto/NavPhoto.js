import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import React from 'react';

import './NavPhoto.scss';


const NavPhoto = ({ url, isHighlighted }) => {
  let className = 'photo-fit py2 size';
  if (isHighlighted) {
    className += ' fade';
  }
  return <div className="NavPhoto"><Image className={className} src={url} /></div>;
};

NavPhoto.propTypes = {
  url: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool,
};

NavPhoto.defaultProps = {
  isHighlighted: true,
};


export default NavPhoto;
