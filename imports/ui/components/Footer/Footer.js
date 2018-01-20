import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { year } from '../../../modules/dates';

import './Footer.scss';

const copyrightYear = () => {
  const currentYear = year();
  return currentYear === '2017' ? '2017' : `2017-${currentYear}`;
};

const Footer = () => (
  <div className="Footer">
    <Grid>
      <p className="pull-left">&copy; {copyrightYear()} Thousand Words</p>
    </Grid>
  </div>
);

Footer.propTypes = {};

export default Footer;
