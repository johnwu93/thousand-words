import React from 'react';
import { Image } from 'react-bootstrap';
import './ImageContainer.scss';

const ImageContainer = ({ className, url, type }) => {
  const mouseOver = (event) => {
    console.dir(event.target);
  }

  return (
    <div className="ImageContainer">
      <Image className={className} src={url} />
      <div onMouseOver={mouseOver}>{type}</div>
    </div>
  )
}

export default ImageContainer;
