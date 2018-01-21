import React from 'react';
import { Image } from 'react-bootstrap';
import './ImageContainer.scss';

const ImageContainer = ({ className, caption, url, type }) => {
  const mouseOver = (event) => {
    console.dir(event.target);
  }

  return (
    <div className="ImageContainer">
      <Image className={className} src={url} />
      <p>{caption}</p>
      <div onMouseOver={mouseOver}>{type}</div>
    </div>
  )
}

export default ImageContainer;
