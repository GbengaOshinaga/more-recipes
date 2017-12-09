import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn } from '../../actions/accountActions';
import SignInForm from './SignInForm';

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
    this.props.signIn(this.state.credentials)
      .then(() => this.redirect());
  }

  /**
   * Redirects to catalog page after successfully signing in
   * @returns {null} if there are errors
   */
  redirect() {
    if (this.props.errors.length > 0) {
      return null;
    }
    this.context.router.history.push('/my_recipes');
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
        errors={this.props.errors}
      />
    );
  }
}


SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  errors: PropTypes.any
};

SignIn.contextTypes = {
  router: PropTypes.object
};

/**
 * mapStateToProps
 * @param {*} state
 * @param {*} ownProps
 * @returns {object} object
 */
function mapStateToProps(state, ownProps) {
  return {
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
    signIn: credentials => dispatch(signIn(credentials))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
