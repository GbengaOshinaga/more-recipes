import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { signIn } from '../../actions/accountActions';
import SignInForm from './SignInForm';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired
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

    this.onClickSave = this.onClickSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    if (nextProps.isLoggedIn) {
      this.redirect();
    }
  }

  /**
   * Saves input
   * @returns {*} nothing
   */
  onClickSave() {
    this.props.signIn(this.state.credentials);
    debugger;
    if (this.props.isLoggedIn) {
      this.redirect();
    }
  }

  /**
   * Method to handle on google login success
   * @param {*} response
   * @returns {*} null
   */
  onGoogleLoginSuccess(response) {
    this.setState({ credentials: { email: response.profileObj.email, password: 'google-login' } });
    this.props.signIn(this.state.credentials)
      .then(() => this.redirect())
      .catch(error => toastr.error(error));
  }

  /**
   * Method to handle on google login failure
   * @returns {*} null
   */
  onGoogleLoginFailure() {
    toastr.error('An error occured');
  }

  /**
   * Redirects to catalog page after successfully signing in
   * @returns {null} if there are errors
   */
  redirect() {
    this.context.router.history.push('/catalog');
  }

  /**
   * Handles input field value change
   * @param {*} event
   * @returns {*} new state
   */
  handleChange(event) {
    const data = this.state.credentials;
    data[event.target.type] = event.target.value;
    this.setState({ credentials: data });
  }

  /**
   * component render method
   * @returns {jsx} markup
   */
  render() {
    return (
      <SignInForm
        onChange={this.handleChange}
        email={this.state.credentials.email}
        password={this.state.credentials.password}
        onClickSave={this.onClickSave}
        onSuccess={this.onGoogleLoginSuccess}
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
 * @param {*} state
 * @returns {object} object
 */
function mapStateToProps(state) {
  return {
    isLoggedIn: state.account.isLoginSuccessful
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
