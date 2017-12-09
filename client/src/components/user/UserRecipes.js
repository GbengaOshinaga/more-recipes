import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Page from './UserRecipesPage';

/**
 * Class component for user recipes actions
 */
class UserRecipes extends React.Component {
  /**
     * Component constructor
     * @param {*} props
     * @param {*} context
     */
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoggedIn: false
    };
  }

  /**
   * Component render method
   * @returns {jsx} markup
   */
  render() {
    return (
      <Page
        isLoggedIn={this.props.isLoggedIn}
        firstName={this.props.firstName}
      />
    );
  }
}

UserRecipes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string
};

/**
 * Maps state to component properties
 * @param {*} state
 * @param {*} ownProps
 * @returns {object} object
 */
function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.session.authenticated,
    firstName: state.session.user.firstName,
  };
}

export default connect(mapStateToProps)(UserRecipes);
