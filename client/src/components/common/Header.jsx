import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  links: PropTypes.node.isRequired,
  navClassName: PropTypes.string
};

const mainHeaderPropTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string
};

const mainHeaderDefaultProps = {
  firstName: ''
};

const defaultProps = {
  navClassName: 'transparent z-depth-0'
};

const dropdownLinks = (
  <React.Fragment>
    <li><Link to="/profile">Profile</Link></li>
    <li><Link to="/my_recipes">My Recipes</Link></li>
    <li><Link to="/favourites">Favourite Recipes</Link></li>
    <li><Link to="/logout">Logout</Link></li>
  </React.Fragment>);

/**
 * Functional component for header for the sign up and sign in pages
 * @returns {*} jsx
 */
function Header({ links, navClassName }) {
  return (
    <div className="navbar-fixed">
      <nav className={navClassName}>
        <div className="container">
          <div className="nav-wrapper">
            <Link to="/catalog" className="brand-logo">More-Recipes</Link>
            <a href="#!" data-activates="mobile" className="button-collapse">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              {links}
            </ul>
            <ul className="side-nav" id="mobile">
              {links}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

/**
 * MainHeader component
 * @param {Object} props
 * @returns {Node} jsx
 */
function MainHeader({ isLoggedIn, firstName }) {
  if (isLoggedIn) {
    return (
      <header>
        <ul id="dropdown1" className="dropdown-content">
          {dropdownLinks}
        </ul>
        <ul id="dropdown2" className="dropdown-content">
          {dropdownLinks}
        </ul>
        <div className="navbar-fixed">
          <nav className="red darken-1">
            <div className="container">
              <div className="nav-wrapper">
                <Link to="/catalog" className="brand-logo">More-Recipes</Link>
                <a href="#!" data-activates="mobile" className="button-collapse">
                  <i className="material-icons">menu</i>
                </a>
                <ul className="right hide-on-med-and-down">
                  <li><Link to="/catalog">Catalog</Link></li>
                  <li>
                    <a className="dropdown-button" href="#!" data-activates="dropdown1">
                      {firstName}<i className="material-icons right">arrow_drop_down</i>
                    </a>
                  </li>
                </ul>
                <ul className="side-nav" id="mobile">
                  <li><Link to="/catalog">Catalog</Link></li>
                  <li>
                    <a className="dropdown-button" href="#!" data-activates="dropdown2">
                      {firstName}<i className="material-icons right">arrow_drop_down</i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    );
  }
  return (
    <Header
      navClassName="red darken-2"
      links={
        <React.Fragment>
          <li><Link to="/catalog">Catalog</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/signin">Sign In</Link></li>
        </React.Fragment>}
    />
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

MainHeader.propTypes = mainHeaderPropTypes;
MainHeader.defaultProps = mainHeaderDefaultProps;

export { Header, MainHeader };
