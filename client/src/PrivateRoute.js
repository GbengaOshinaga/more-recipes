import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import { sessionService } from 'redux-react-session';

const propTypes = {
  component: PropTypes.func.isRequired
};

/**
 * Component for private route
 */
class PrivateRoute extends React.Component {
  /**
   * Component constructor
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authenticated: false
    };
  }

  /**
   * Check auth before component mounts
   * @returns {*} null
   */
  async componentWillMount() {
    try {
      const response = await sessionService.loadSession();
      this.setState({
        authenticated: true,
        loading: false
      });
    } catch (e) {
      this.setState({
        loading: false
      });
    }
  }

  /**
   * Component render method
   * @returns {*} jsx
   */
  render() {
    let componentToMount;
    const { component: Component, ...rest } = this.props;
    if (this.state.loading) {
      componentToMount = <div>Loading ....</div>;
    } else if (this.state.authenticated === true) {
      componentToMount = (<Route
        {...rest}
        render={props =>
          <div> <Component {...props} /> </div>}
      />);
    } else {
      componentToMount = (<Route render={props =>
      (<div><Redirect to={{ pathname: '/signin', state: { from: props.location.pathname } }} /></div>)}
      />);
    }
    return (
      <div>
        {componentToMount}
      </div>
    );
  }
}

PrivateRoute.propTypes = propTypes;

export default PrivateRoute;
