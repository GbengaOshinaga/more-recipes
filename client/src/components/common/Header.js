import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Functional component for header for the index page
 * @returns {*} jsx
 */
export function IndexHeader() {
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

/**
 * Functional component for header for the sign up and sign in pages
 * @returns {*} jsx
 */
export function SignInAndSignUpHeader() {
  return (
    <nav className="transparent z-depth-0">
      <div className="container">
        <div className="nav-wrapper">
          <a href="catalog.html" className="brand-logo">More-Recipes</a>
          <a href="#!" data-activates="mobile" className="button-collapse">
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
}

/**
 * Functional component for header with user detalis
 * @param {*} name
 * @returns {*} jsx
 */
function loggedInHeader(name) {
  return (
    <header>
      <ul id="dropdown1" className="dropdown-content">
        <li><a href="profile.html">Profile</a></li>
        <li><a href="#!">My Recipes</a></li>
        <li><a href="favourite_recipes.html">Favourite Recipes</a></li>
        <li><a href="#!">Logout</a></li>
      </ul>
      <ul id="dropdown2" className="dropdown-content">
        <li><a href="profile.html">Profile</a></li>
        <li><a href="#!">My Recipes</a></li>
        <li><a href="favourite_recipes.html">Favourite Recipes</a></li>
        <li><a href="#!">Logout</a></li>
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
                <li><a href="catalog.html">Catalog</a></li>
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
        <li><a href="catalog.html">Catalog</a></li>
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
export function Header({ isLoggedIn, firstName }) {
  return (
    mapStateToHeader(isLoggedIn, firstName)
  );
}
