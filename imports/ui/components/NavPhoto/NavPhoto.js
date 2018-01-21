import PropTypes from 'prop-types';
import React from 'react';

import './NavPhoto.scss';
import ImageContainer from '../ImageContainer/ImageContainer';

const NavPhoto = ({ caption, name, url, isHighlighted, type, changeCenter, getCoords, id }) => {
  let className = 'photo-fit py2 size';
  if (isHighlighted) {
    className += ' fade';
  }

  const clickPhoto = () => {
    const coords = getCoords(id);
    if (!coords) return;
    changeCenter(coords);
  };

  return (
    <div className="NavPhoto">
      <ImageContainer className={className} name={name} url={url} clickPhoto={clickPhoto} />
    </div>);
};

NavPhoto.propTypes = {
  url: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool,
  name: PropTypes.string.isRequired,
  changeCenter: PropTypes.func.isRequired,
  getCoords: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

NavPhoto.defaultProps = {
  isHighlighted: true,
};


export default NavPhoto;
