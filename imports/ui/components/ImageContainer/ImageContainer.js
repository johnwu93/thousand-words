import React from 'react';
import { Image } from 'react-bootstrap';
import './ImageContainer.scss';

const ImageContainer = ({ className, url, type }) => {

  return (
    <div className="ImageContainer">
      <Image className={className} src={url} />
      <p>{type}</p>
    </div>
  )
}

export default ImageContainer;
