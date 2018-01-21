import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Marker.scss';

const computePath = function computePath(photoName) {
  return `/markers/${photoName}`;
};
const MUSEUM = computePath('museum.png');
const BAKERY = computePath('bread-location.png');
const BED = computePath('bed.png');
const DRINKS = computePath('drinks.png');
const MOVIE_ICON = computePath('movie.png');
const REGULAR_MARKER = computePath('regular-marker.png');

class Marker extends Component {
  isContained(inputCategories) {
    const inputCategoriesSet = new Set(inputCategories);
    return this.props.categories.filter(x => inputCategoriesSet.has(x)).length > 0;
  }

  findCategories() {
    if (this.isContained(['lodging'])) {
      return BED;
    } else if (this.isContained(['night club', 'beer'])) {
      return DRINKS;
    } else if (this.isContained(['museum', 'local_government_office', 'political', 'locality'])) {
      return MUSEUM;
    } else if (this.isContained(['stadium', 'locality', 'store'])) {
      return MOVIE_ICON;
    } else if (this.isContained(['food', 'bakery', 'cafe'])) {
      return BAKERY;
    }
    return REGULAR_MARKER;
  }

  render() {
    const imagePath = this.findCategories();
    return (
      <div className="Marker">
        <img className="marker-size" src={imagePath} alt="A marker" />
      </div>
    );
  }
}

Marker.propTypes = {
  $hover: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.string),
};

export default Marker;
