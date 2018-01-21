import React from 'react';
import PropTypes from 'prop-types';
import NavPhoto from '../NavPhoto/NavPhoto';
import '../NavPhoto/NavPhoto.scss';


const NavPhotoList = ({ photos, hoverKey }) => {
  const navPhotos = photos.map((photo) => {
    const isHighlighted = hoverKey === photo.id;
    return <NavPhoto caption={photo.caption} name={photo.name} url={photo.url} isHighlighted={isHighlighted} key={photo.id} />;
  });
  return (
    <div>
      {navPhotos}
    </div>
  );
};

NavPhotoList.defaultProps = {
  hoverKey: undefined,
};

NavPhotoList.propTypes = {
  photos: PropTypes.arrayOf(Object).isRequired,
  hoverKey: PropTypes.string,
};

export default NavPhotoList;
