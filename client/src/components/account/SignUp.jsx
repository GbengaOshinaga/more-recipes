import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { sessionService } from 'redux-react-session';
import { signUp } from '../../actions/accountActions';
import SignUpForm from './SignUpForm';

const defaultUserAvatar = 'http://res.cloudinary.com/king-more-recipes/image/upload/v1518031651/Expert-tutor-placeholder_cg9wet.jpg';

/**
 * Class component for signing in
 */
class SignUp extends React.Component {
/**
 * constructor method
 * @param {*} props
 * @param {*} context
 */
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePic: defaultUserAvatar
      }
    };
    this.onClickSave = this.onClickSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onGoogleLoginSuccess = this.onGoogleLoginSuccess.bind(this);
    toastr.options = {
      closeButton: true,
      positionClass: 'toast-top-right'
    };
  }

  /**
   * Saves input
   * @returns {func} redirect
   */
  onClickSave() {
    signUp(this.state.data)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          sessionService.saveSession(response.data.token);
          sessionService.saveUser(response.data.user);
          this.redirect();
        } else {
          if (response.data.errors) {
            return response.data.errors.map(error => toastr.error(error));
          }
          toastr.error(response.data.message);
        }
      })
      .catch((error) => { toastr.error([...error]); });
  }

  /**
   * Method to handle on google login success
   * @param {Object} response
   * @returns {*} null
   */
  onGoogleLoginSuccess(response) {
    const credentials = {
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      email: response.profileObj.email,
      password: 'google-login',
      confirmPassword: 'google-login',
      profilePic: response.profileObj.imageUrl
    };
    signUp(credentials)
      .then(serverResponse => serverResponse.json())
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
   * @returns {*} null
   */
  onGoogleLoginFailure() {
    toastr.error('An error occured');
  }


  /**
   * Redirects to catalog page after successfully signing in
   * @returns {null} null
   */
  redirect() {
    this.context.router.history.push('/catalog');
  }


  /**
   * Handles input field value change
   * @param {Object} event
   * @returns {Object} new state
   */
  handleChange(event) {
    const entries = this.state.data;
    entries[event.target.id] = event.target.value;
    this.setState({ data: entries });
  }

  /**
   * component render method
   * @returns {jsx} markup
   */
  render() {
    return (
      <SignUpForm
        onChange={this.handleChange}
        onClickSave={this.onClickSave}
        firstName={this.state.data.firstName}
        lastName={this.state.data.lastName}
        email={this.state.data.email}
        password={this.state.data.password}
        confirmPassword={this.state.data.confirmPassword}
        onSuccess={this.onGoogleLoginSuccess}
        onFailure={this.onGoogleLoginFailure}
      />
    );
  }
}

SignUp.contextTypes = {
  router: PropTypes.object
};

export default SignUp;
