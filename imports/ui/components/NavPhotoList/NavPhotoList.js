import React from 'react';
import PropTypes from 'prop-types';
import NavPhoto from '../NavPhoto/NavPhoto';
import '../NavPhoto/NavPhoto.scss';


const NavPhotoList = ({ photos, hoverKey, changeCenter }) => {

  const getCoords = (photoId) => {
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].id === photoId) {
        return [photos[i].lat, photos[i].long];
      }
    }
    return null;
  }

  const navPhotos = photos.map((photo) => {
    const isHighlighted = hoverKey === photo.id;
    return <NavPhoto caption={photo.caption} name={photo.name} url={photo.url} isHighlighted={isHighlighted} key={photo.id} getCoords={getCoords} changeCenter={changeCenter} id={photo.id} />;
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
  changeCenter: PropTypes.func.isRequired,
  hoverKey: PropTypes.string,
};

export default NavPhotoList;
