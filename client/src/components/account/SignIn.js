import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputField from '../common/InputField';
import Button from '../common/Button';
import SocialLoginButtons from './SocialLoginButtons';
import { signIn } from '../../actions/accountActions';

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

  /**
   * Saves input
   * @returns {*} nothing
   */
  onClickSave() {
    this.props.signIn(this.state.credentials);
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
      <div>
        <InputField
          id="email"
          type="email"
          onChange={this.handleChange}
          value={this.state.credentials.email}
          label="Email Address"
        />
        <InputField
          id="password"
          type="password"
          onChange={this.handleChange}
          value={this.state.credentials.password}
          label="Password"
        />
        <Button
          onClick={this.onClickSave}
          className="btn waves-effect waves-light red darken-2"
          type="submit"
          name="action"
          materialIcon="arrow_forward"
          buttonText="Sign In"
        />
        <SocialLoginButtons
          isAMemberText="Not a member?"
          href="signup.html"
          hrefText="Sign Up"
        />
      </div>
    );
  }
}


SignIn.propTypes = {
  signIn: PropTypes.func.isRequired
};

/**
 * mapStateToProps
 * @param {*} state
 * @param {*} ownProps
 * @returns {object} object
 */
function mapStateToProps(state, ownProps) {
  return {
    credentials: state.credentials
  };
}

/**
 * mapDispatchToProps
 * @param {*} dispatch
 * @returns {object} object
 */
function mapDispatchToProps(dispatch) {
  return {
    signIn: credentials => dispatch(signIn(credentials))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
