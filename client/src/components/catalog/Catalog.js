import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';
import CatalogPage from './CatalogPage';
import * as recipeActions from '../../actions/RecipeActions';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  actions: PropTypes.object.isRequired,
  allRecipes: PropTypes.arrayOf(PropTypes.object).isRequired
};

const defaultProps = {
  firstName: ''
};

/**
 * Class component for catalog page
 */
class Catalog extends React.Component {
  /**
     * Component constructor
     * @param {*} props
     * @param {*} context
     */
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  /**
   * Method when component has finished mounting
   * @returns {*} undefined
   */
  componentDidMount() {
    this.props.actions.getAllRecipes();
  }

  /**
   * Component render function
   * @returns {*} jsx
   */
  render() {
    return (
      <CatalogPage
        isLoggedIn={this.props.isLoggedIn}
        firstName={this.props.firstName}
        allRecipes={this.props.allRecipes}
      />
    );
  }
}

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
    allRecipes: state.recipes
  };
}

/**
 * Maps actions to component properties
 * @param {*} dispatch
 * @returns {*} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(recipeActions, dispatch)
  };
}


Catalog.propTypes = propTypes;
Catalog.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);

