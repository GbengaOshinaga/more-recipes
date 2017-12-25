import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Functional component for header for the index page
 * @returns {*} jsx
 */
export default function IndexHeader() {
  return (
    <div className="navigation">
      <header>
        <nav className="transparent z-depth-0">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">More-Recipes</a>
            <a href="#!" data-activates="mobile" className="button-collapse">
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
}
