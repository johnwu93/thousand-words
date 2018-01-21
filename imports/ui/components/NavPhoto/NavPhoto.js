import PropTypes from 'prop-types';
import React from 'react';

import './NavPhoto.scss';
import ImageContainer from '../ImageContainer/ImageContainer';

const NavPhoto = ({ caption, name, url, isHighlighted, type }) => {
  let className = 'photo-fit py2 size';
  if (isHighlighted) {
    className += ' fade';
  }
  return (
    <div className="NavPhoto">
      <ImageContainer className={className} name={name} url={url} />
    </div>);
};

NavPhoto.propTypes = {
  url: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

NavPhoto.defaultProps = {
  isHighlighted: true,
};


export default NavPhoto;
