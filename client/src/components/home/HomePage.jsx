import React from 'react';
import { Link } from 'react-router-dom';
import IndexHeader from '../common/Header/IndexHeader';

/**
 * Functional component for homepage
 * @returns {*} jsx
 */
function HomePage() {
  return (
    <div className="index-body">
      <IndexHeader />
      <div className="container">
        <div className="info center-align">
          <h2 className="white-text">Welcome to More-Recipes</h2>
          <h4 className="white-text">A platform for sharing recipe ideas you invented or learnt.
                  Find innovative recipes or share one of your own.
          </h4>
          <div className="cta-buttons">
            <Link to="/catalog" className="waves-effect waves-light btn-large red darken-2">
              VIEW CATALOG
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
