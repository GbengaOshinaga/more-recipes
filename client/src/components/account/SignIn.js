import React from 'react';

/**
 * Class component for signing in
 */
export default class SignIn extends React.Component {
/**
 * constructor method
 * @param {*} props
 * @param {*} context
 */
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      password: ''
    };
    this.onClickSave = this.onClickSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Saves input
   * @returns {*} nothing
   */
  onClickSave() {
    alert(`${this.state.email} and ${this.state.password}`);
  }

  /**
   * Handles input field value change
   * @param {*} event
   * @returns {*} new state
   */
  handleChange(event) {
    this.setState({ [event.target.type]: event.target.value });
  }

  /**
   * component render method
   * @returns {jsx} markup
   */
  render() {
    return (
      <div>
        <div className="row">
          <div className="input-field col s12">
            <input id="email" type="email" className="validate" onChange={this.handleChange} value={this.state.email} />
            {/* <label htmlFor="email">Email Address</label> */}
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="password" type="password" className="validate" onChange={this.handleChange} value={this.state.password} />
            {/* <label htmlFor="password">Password</label> */}
          </div>
        </div>
        <button onClick={this.onClickSave} className="btn waves-effect waves-light red darken-2" type="submit" name="action">Sign in
          <i className="material-icons right">arrow_forward</i>
        </button>
        <div className="row">
          <p>OR</p>
        </div>
        <div>
          <div className="fb-login-button social-login" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" 	data-auto-logout-link="false" data-use-continue-as="false" />
          <div id="my-signin2" className="social-login" align="center" />
        </div>
        <p>Not a member? <a href="index.html">Sign Up</a></p>
      </div>
    );
  }
}
