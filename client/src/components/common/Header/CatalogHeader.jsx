import React from 'react';
import { Link } from 'react-router-dom';


/**
   * Header for logged in users
   * @param {*} name
   * @param {*} onChange
   * @param {*} value
   * @returns {*} jsx
   */
function loggedInHeader(name, onChange, value) {
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
        <nav id="nav" className="transparent z-depth-0">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo">More-Recipes</a>
              <a href="#!" data-activates="mobile" className="button-collapse">
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                <li id="search-nav" className="hide">
                  <div className="center row">
                    <div className="col s12 " >
                      <div className="row" id="topbarsearch">
                        <div className="input-field col s6 s12 white-text">
                          <i className="white-text material-icons prefix">search</i>
                          <input
                            type="text"
                            placeholder="search"
                            id="autocomplete-input"
                            className="autocomplete white-text"
                            onChange={onChange}
                            value={value}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li><Link to="/catalog">Catalog</Link></li>
                <li>
                  <a
                    className="dropdown-button"
                    href="#!"
                    data-activates="dropdown1"
                  >
                    {name}
                    <i className="material-icons right">arrow_drop_down</i>
                  </a>
                </li>
              </ul>

            </div>
          </div>
        </nav>
      </div>

      <ul className="side-nav" id="mobile">
        <li>
          <div className="center row">
            <div className="col s12 " >
              <div className="row" id="topbarsearch">
                <div className="input-field col s6 s12 black-text">
                  <i className="black-text material-icons prefix">search</i>
                  <input
                    type="text"
                    placeholder="search"
                    id="autocomplete-input"
                    className="autocomplete black-text"
                    onChange={onChange}
                    value={value}
                  />
                </div>
              </div>
            </div>
          </div>
        </li>
        <li><Link to="/catalog">Catalog</Link></li>
        <li>
          <a
            className="dropdown-button"
            href="#!"
            data-activates="dropdown2"
          >
            {name}
            <i className="material-icons right">arrow_drop_down</i>
          </a>
        </li>
      </ul>
    </header>

  );
}

/**
 * Header for logged out users
 * @param {*} onChange
 * @param {*} value
 * @returns {*} jsx
 */
function loggedOutHeader(onChange, value) {
  return (
    <header>
      <div className="navbar-fixed">
        <nav id="nav" className="transparent z-depth-0">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo">More-Recipes</a>
              <a href="#!" data-activates="mobile" className="button-collapse">
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                <li id="search-nav" className="hide">
                  <div className="center row">
                    <div className="col s12 " >
                      <div className="row" id="topbarsearch">
                        <div className="input-field col s6 s12 white-text">
                          <i className="white-text material-icons prefix">search</i>
                          <input
                            type="text"
                            placeholder="search"
                            id="autocomplete-input"
                            className="autocomplete white-text"
                            onChange={onChange}
                            value={value}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li><Link to="/catalog">Catalog</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/signin">Sign In</Link></li>
              </ul>

            </div>
          </div>
        </nav>
      </div>

      <ul className="side-nav" id="mobile">
        <li>
          <div className="center row">
            <div className="col s12 " >
              <div className="row" id="topbarsearch">
                <div className="input-field col s6 s12 black-text">
                  <i className="black-text material-icons prefix">search</i>
                  <input
                    type="text"
                    placeholder="search"
                    id="autocomplete-input"
                    className="autocomplete black-text"
                    onChange={onChange}
                    value={value}
                  />
                </div>
              </div>
            </div>
          </div>
        </li>
        <li><Link to="/catalog">Catalog</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/signin">Sign In</Link></li>
      </ul>
    </header>

  );
}

/**
 * Catalog header
 * @returns {*} jsx
 */
export default function catalogHeader({
  isLoggedIn, firstName, onChange, value
}) {
  if (isLoggedIn) {
    return loggedInHeader(firstName, onChange, value);
  }
  return loggedOutHeader(onChange, value);
}
