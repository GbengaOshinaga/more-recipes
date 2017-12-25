import React from 'react';


/**
   * Header for logged in users
   * @param {*} name
   * @returns {*} jsx
   */
function loggedInHeader(name) {
  return (
    <header>
      <ul id="dropdown1" className="dropdown-content">
        <li><a href="profile.html">Profile</a></li>
        <li><a href="my_recipes.html">My Recipes</a></li>
        <li><a href="favourite_recipes.html">Favourite Recipes</a></li>
        <li><a href="#!">Logout</a></li>
      </ul>
      <ul id="dropdown2" className="dropdown-content">
        <li><a href="profile.html">Profile</a></li>
        <li><a href="my_recipes.html">My Recipes</a></li>
        <li><a href="favourite_recipes.html">Favourite Recipes</a></li>
        <li><a href="#!">Logout</a></li>
      </ul>
      <div className="navbar-fixed">
        <nav id="nav" className="transparent z-depth-0">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo">More-Recipes</a>
              <a href="#" data-activates="mobile" className="button-collapse">
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                <li id="search-nav" className="hide">
                  <div className="center row">
                    <div className="col s12 " >
                      <div className="row" id="topbarsearch">
                        <div className="input-field col s6 s12 white-text">
                          <i className="white-text material-icons prefix">search</i>
                          <input type="text" placeholder="search" id="autocomplete-input" className="autocomplete white-text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li><a href="#">Catalog</a></li>
                <li><a className="dropdown-button" href="#!" data-activates="dropdown1">{name}<i className="material-icons right">arrow_drop_down</i></a></li>
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
                  <input type="text" placeholder="search" id="autocomplete-input" className="autocomplete black-text" />
                </div>
              </div>
            </div>
          </div>
        </li>
        <li><a href="#">Catalog</a></li>
        <li><a className="dropdown-button" href="#!" data-activates="dropdown2">{name}<i className="material-icons right">arrow_drop_down</i></a></li>
      </ul>
    </header>

  );
}

/**
 * Header for logged out users
 * @returns {*} jsx
 */
function loggedOutHeader() {
  return (
    <header>
      <div className="navbar-fixed">
        <nav id="nav" className="transparent z-depth-0">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo">More-Recipes</a>
              <a href="#" data-activates="mobile" className="button-collapse">
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                <li id="search-nav" className="hide">
                  <div className="center row">
                    <div className="col s12 " >
                      <div className="row" id="topbarsearch">
                        <div className="input-field col s6 s12 white-text">
                          <i className="white-text material-icons prefix">search</i>
                          <input type="text" placeholder="search" id="autocomplete-input" className="autocomplete white-text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li><a href="#">Catalog</a></li>
                <li><a href="signup.html">Sign Up</a></li>
                <li><a href="signin.html">Sign In</a></li>
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
                  <input type="text" placeholder="search" id="autocomplete-input" className="autocomplete black-text" />
                </div>
              </div>
            </div>
          </div>
        </li>
        <li><a href="#">Catalog</a></li>
        <li><a href="index.html">Sign Up</a></li>
        <li><a href="signin.html">Sign In</a></li>
      </ul>
    </header>

  );
}

/**
 * Catalog header
 * @returns {*} jsx
 */
export default function catalogHeader({ isLoggedIn, firstName }) {
  if (isLoggedIn) {
    return loggedInHeader(firstName);
  }
  return loggedOutHeader();
}
