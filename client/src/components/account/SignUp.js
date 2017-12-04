import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUp } from '../../actions/accountActions';
import SignUpForm from './SignUpForm';

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
      },
      errors: []
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
      <SignUpForm
        onChange={this.handleChange}
        onClickSave={this.onClickSave}
        firstName={this.state.data.firstName}
        lastName={this.state.data.lastName}
        email={this.state.data.email}
        password={this.state.data.password}
        confirmPassword={this.state.data.confirmPassword}
        errors={this.props.errors}
      />
    );
  }
}


SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  errors: PropTypes.any
};

/**
 * mapStateToProps
 * @param {*} state
 * @param {*} ownProps
 * @returns {object} object
 */
function mapStateToProps(state, ownProps) {
  return {
    data: state.account.data,
    errors: state.account.errors
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
