import React from 'react';

const HomePage = () => (
  <div>
    <div className="navigation">
      <header>
        <nav className="transparent z-depth-0">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">More-Recipes</a>
            <a href="#" data-activates="mobile" className="button-collapse">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li><a href="signin.html">Sign In</a></li>
              <li><a href="signup.html">Sign Up</a></li>
            </ul>
            <ul className="side-nav" id="mobile">
              <li><a href="signin.html">Sign In</a></li>
              <li><a href="signup.html">Sign In</a></li>
            </ul>
          </div>
        </nav>
      </header>
    </div>

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
