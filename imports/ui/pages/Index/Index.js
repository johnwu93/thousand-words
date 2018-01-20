import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Index.scss';

const Index = () => (
  <div className="Index">
    <h1>Thousand Words</h1>
    <p>Bring your past experiences to life</p>
    <div>
      <Button href="/signup">Sign Up</Button>
    </div>
  </div>
);

export default Index;
