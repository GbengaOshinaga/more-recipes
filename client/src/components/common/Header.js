import React from 'react';
import { Link } from 'react-router-dom';

export const CatalogHeader = () => (
  <div className="navigation">
    <header>
      <nav className="transparent z-depth-0">
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo">More-Recipes</a>
          <a href="#" data-activates="mobile" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/signin"> Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
          <ul className="side-nav" id="mobile">
            <li><Link to="/signin"> Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>

      </nav>
    </header>
  </div>
);

export const SignInAndSignUpHeader = () => (
  <nav className="transparent z-depth-0">
    <div className="container">
      <div className="nav-wrapper">
        <a href="catalog.html" className="brand-logo">More-Recipes</a>
        <a href="#" data-activates="mobile" className="button-collapse">
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/catalog">Catalog</Link></li>
        </ul>
        <ul className="side-nav" id="mobile">
          <li><Link to="/catalog">Catalog</Link></li>
        </ul>
      </div>
    </div>
  </nav>
);
