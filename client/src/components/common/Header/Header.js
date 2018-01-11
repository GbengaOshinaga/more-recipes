import React from 'react';
import { Link } from 'react-router-dom';


/**
 * Functional component for header with user detalis
 * @param {*} name
 * @returns {*} jsx
 */
function loggedInHeader(name) {
  return (
    <header>
      <ul id="dropdown1" className="dropdown-content">
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/my_recipes">My Recipes</Link></li>
        <li><Link to="/favourites">Favourite Recipes</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
      <ul id="dropdown2" className="dropdown-content">
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/my_recipes">My Recipes</Link></li>
        <li><Link to="/favourites">Favourite Recipes</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
      <div className="navbar-fixed">
        <nav className="grey darken-2">
          <div className="container">
            <div className="nav-wrapper">
              <a href="catalog.html" className="brand-logo">More-Recipes</a>
              <a href="#" data-activates="mobile" className="button-collapse">
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                <li><Link to="/catalog">Catalog</Link></li>
                <li>
                  <a className="dropdown-button" href="#!" data-activates="dropdown1">
                    {name}<i className="material-icons right">arrow_drop_down</i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </div>
      <ul className="side-nav" id="mobile">
        <li><Link to="/catalog">Catalog</Link></li>
        <li>
          <a className="dropdown-button" href="#!" data-activates="dropdown2">
            {name}<i className="material-icons right">arrow_drop_down</i>
          </a>
        </li>
      </ul>

    </header>
  );
}

/**
 * Functional component for header without user details
 * @returns {*} jsx
 */
function loggedOutHeader() {
  return (
    <header>
      <div className="navbar-fixed">
        <nav className="grey darken-2">
          <div className="container">
            <div className="nav-wrapper">
              <Link to="/catalog" className="brand-logo">More-Recipes</Link>
              <a href="#" data-activates="mobile" className="button-collapse">
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                <li><Link to="/catalog">Catalog</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/signin">Sign In</Link></li>
              </ul>
            </div>
          </div>
        </nav>

      </div>
      <ul className="side-nav" id="mobile">
        <li><Link to="/catalog">Catalog</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/signin">Sign In</Link></li>
      </ul>

    </header>
  );
}

/**
 * Function returns header depending on if user is logged in or not
 * @param {*} isLoggedIn
 * @param {*} firstName
 * @returns {func} function
 */
function mapStateToHeader(isLoggedIn, firstName) {
  if (isLoggedIn) {
    return loggedInHeader(firstName);
  }
  return loggedOutHeader();
}

/**
 * Functional component for header displaying user details
 * @param {*} props
 * @returns {*} func
 */
export default function Header({ isLoggedIn, firstName }) {
  return (
    mapStateToHeader(isLoggedIn, firstName)
  );
}
