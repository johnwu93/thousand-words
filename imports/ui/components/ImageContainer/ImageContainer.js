import React from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './ImageContainer.scss';

const ImageContainer = ({ className, name, url, type, clickPhoto }) => {
  const mouseOver = (event) => {
    console.dir(event.target);
  }

  return (
    <div className="ImageContainer">
      <Image className={className} src={url} onClick={clickPhoto} />
      <p onClick={clickPhoto}>{name}</p>
      <div onMouseOver={mouseOver} onClick={clickPhoto}>{type}</div>
    </div>
  )
}

ImageContainer.propTypes = {
  clickPhoto: PropTypes.func.isRequired
}

export default ImageContainer;
