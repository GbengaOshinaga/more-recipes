/* eslint-disable no-empty */
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { sessionService } from 'redux-react-session';
import { Header } from '../common/Header';


/**
 * HomePage component
 */
class HomePage extends React.Component {
  /**
   * Component constructor
   * @param {Object} props
   * @param {Object} context
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      isAuthenticated: false
    };
  }

  /**
   * Componentwillmount
   *
   * @returns {undefined}
   */
  async componentWillMount() {
    try {
      const token = await sessionService.loadSession();
      if (token) {
        this.setState({ isAuthenticated: true });
      }
    } catch (error) {}
  }

  /**
   * ComponentDidMount
   *
   * @returns {undefined}
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
  }

  /**
   * Component render method
   *
   * @returns {Node} jsx
  */
  render() {
    if (this.state.isAuthenticated) {
      return (<Redirect to="/catalog" />);
    }

    return (
      <div className="index-body">
        <Header
          mainLinks={
            <React.Fragment>
              <li><Link to="/signin"> Sign In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </React.Fragment>}
        />
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
}

export default HomePage;
