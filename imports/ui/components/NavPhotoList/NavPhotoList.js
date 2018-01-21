import React from 'react';
import PropTypes from 'prop-types';
import NavPhoto from '../NavPhoto/NavPhoto';
import '../NavPhoto/NavPhoto.scss';


const NavPhotoList = ({ photos, hoverKey }) => {
  const navPhotos = photos.map((photo) => {
    const isHighlighted = hoverKey === photo.id;
    return <NavPhoto className="NavPhoto" url={photo.url} isHighlighted={isHighlighted} key={photo.id} />;
  });
  return (
    <div>
      {navPhotos}
    </div>
  );
};

NavPhotoList.propTypes = {
  photos: PropTypes.oneOf([null, PropTypes.arrayOf(NavPhoto)]).isRequired,
  hoverKey: PropTypes.string.isRequired,
};

export default NavPhotoList;
