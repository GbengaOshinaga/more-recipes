import React from 'react';
import { Link } from 'react-router-dom';


const style = {
  marginTop: '10%',
  padding: '30px'
};

const linkStyle = {
  marginTop: '45px',
  textDecoration: 'underline'
};

/**
 * Component displayed for unknown routes
 *
 * @returns {Node} page
*/
export default function NotFound() {
  return (
    <div className="container">
      <div style={style} className="center-align">
        <h2>404</h2>
        <h5>This page doesn&apos;t exist, or some other horrible event has occurred
        </h5>
        <h5 style={linkStyle}>
          <Link to="/catalog" className="red-text darken-1">
            GO TO CATALOG
          </Link>
        </h5>
      </div>
    </div>
  );
}
