import React from 'react';
import { CatalogHeader } from '../common/Header';

const HomePage = () => (
  <div className="index-body">
    <CatalogHeader />
    <div className="container">
      <div className="info center-align">
        <h2 className="white-text">Welcome to More-Recipes</h2>
        <h4 className="white-text">A platform for sharing recipe ideas you invented or learnt.
                 Find innovative recipes or share one of your own.
        </h4>
        <div className="cta-buttons">
          <a href="catalog.html" className="waves-effect waves-light btn-large red darken-2">VIEW CATALOG</a>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
