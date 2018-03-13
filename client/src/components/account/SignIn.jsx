import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { sessionService } from 'redux-react-session';
import { signIn } from '../../actions/accountActions';
import SignInForm from './SignInForm';

const propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired
};

/**
 * Class component for signing in
 */
class SignIn extends React.Component {
/**
 * constructor method
 * @param {*} props
 * @param {*} context
 */
  constructor(props, context) {
    super(props, context);
    this.state = {
      credentials: {
        email: '',
        password: ''
      }
    };

    toastr.options = {
      closeButton: true,
      positionClass: 'toast-top-right'
    };
  }

  /**
   * Signs in
   *
   * @returns {undefined}
   */
  onClickSave = () => {
    signIn(this.state.credentials)
      .then((response) => {
        if (response.status === 'success') {
          sessionService.saveSession(response.data.token);
          sessionService.saveUser(response.data.user);
          this.redirect();
        } else {
          toastr.error(response.data.message || response.data.errors);
        }
      })
      .catch((error) => { toastr.error(error); });
  }

  /**
   * Method to handle on google login success
   * @param {Object} response
   *
   * @returns {undefined}
   */
  onGoogleLoginSuccess = (response) => {
    this.setState({ credentials: { email: response.profileObj.email, password: 'google-login' } });
    signIn(this.state.credentials)
      .then((serverResponse) => {
        if (serverResponse.status === 'success') {
          sessionService.saveSession(serverResponse.data.token);
          sessionService.saveUser(serverResponse.data.user);
          this.redirect();
        } else {
          toastr.error(serverResponse.data.message || serverResponse.data.errors);
        }
      })
      .catch((error) => { toastr.error(error); });
  }

  /**
   * Method to handle on google login failure
   *
   * @returns {undefined}
   */
  onGoogleLoginFailure = () => {
  }

  /**
   * Redirects to catalog page after successfully signing in
   *
   * @returns {undefined}
   */
  redirect = () => {
    if (this.props.location.state) {
      const { from } = this.props.location.state;
      this.context.router.history.push(from);
    } else {
      this.context.router.history.push('/catalog');
    }
  }

  /**
   * Handles input field value change
   * @param {Object} event
   *
   * @returns {undefined}
   */
  handleChange = (event) => {
    const data = this.state.credentials;
    data[event.target.type] = event.target.value;
    this.setState({ credentials: data });
  }

  /**
   * component render method
   *
   * @returns {Node} jsx
   */
  render() {
    return (
      <SignInForm
        onChange={this.handleChange}
        email={this.state.credentials.email}
        password={this.state.credentials.password}
        onClickSave={this.onClickSave}
        onSuccess={this.onGoogleLoginSuccess}
        onFailure={this.onGoogleLoginFailure}
      />
    );
  }
}


SignIn.propTypes = propTypes;

SignIn.contextTypes = {
  router: PropTypes.object
};

/**
 * mapStateToProps
 * @param {Object} state
 * @param {Object} ownProps
 *
 * @returns {object} object
 */
function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.location
  };
}

/**
 * Map dispatch to props
 * @param {*} dispatch
 * @returns {Object} object
 */
function mapDispatchToProps(dispatch) {
  return {
    signIn: credentials => dispatch(signIn(credentials))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
