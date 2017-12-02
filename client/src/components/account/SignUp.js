import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputField from '../common/InputField';
import Button from '../common/Button';
import SocialLoginButtons from './SocialLoginButtons';
import { signUp } from '../../actions/accountActions';

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
        confirmPassword: ''
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
    this.props.signUp(this.state.data);
  }

  /**
   * Handles input field value change
   * @param {*} event
   * @returns {*} new state
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
      <div>
        <InputField
          id="firstName"
          type="text"
          onChange={this.handleChange}
          value={this.state.data.firstName}
          label="First Name"
        />
        <InputField
          id="lastName"
          type="text"
          onChange={this.handleChange}
          value={this.state.data.lastName}
          label="Last Name"
        />
        <InputField
          id="email"
          type="email"
          onChange={this.handleChange}
          value={this.state.data.email}
          label="Email Address"
        />
        <InputField
          id="password"
          type="password"
          onChange={this.handleChange}
          value={this.state.data.password}
          label="Password"
        />
        <InputField
          id="confirmPassword"
          type="password"
          onChange={this.handleChange}
          value={this.state.data.confirmPassword}
          label="Confirm Password"
        />
        <Button
          onClick={this.onClickSave}
          className="btn waves-effect waves-light red darken-2"
          type="submit"
          name="action"
          materialIcon="send"
          buttonText="Submit"
        />
        <SocialLoginButtons
          isAMemberText="Already a member?"
          href="signin.html"
          hrefText="Sign In"
        />
      </div>
    );
  }
}


SignUp.propTypes = {
  signUp: PropTypes.func.isRequired
};

/**
 * mapStateToProps
 * @param {*} state
 * @param {*} ownProps
 * @returns {object} object
 */
function mapStateToProps(state, ownProps) {
  return {
    data: state.data
  };
}

/**
 * mapDispatchToProps
 * @param {*} dispatch
 * @returns {object} object
 */
function mapDispatchToProps(dispatch) {
  return {
    signUp: data => dispatch(signUp(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
