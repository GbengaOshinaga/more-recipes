import React from 'react';
import { sessionService } from 'redux-react-session';
import { Redirect } from 'react-router-dom';

/**
 * Class for signin out
 */
class SignOut extends React.Component {
  /**
     * Component constructor
     * @param {Object} props
     * @param {Object} context
     */
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }


  /**
     * Component render method
     *
     * @returns {Node} jsx
     */
  render() {
    sessionService.deleteSession();
    sessionService.deleteUser();
    return (
      <Redirect to={{ pathname: '/signin' }} />
    );
  }
}

export default SignOut;
