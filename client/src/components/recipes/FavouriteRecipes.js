import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';
import { connect } from 'react-redux';
import Page from './FavouriteRecipesPage';
import * as userActions from '../../actions/userActions';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  actions: PropTypes.object.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired
};

const defaultProps = {
  firstName: ''
};

/**
 * Container component for favourite recipes
 */
class FavouriteRecipes extends React.Component {
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
    if (this.props.recipes.length === 0) {
      sessionService.loadSession()
        .then((token) => {
          this.props.actions.getFavourites(token);
        });
    }
  }

  /**
   * Component render function
   * @returns {*} jsx
   */
  render() {
    return (
      <Page
        isLoggedIn={this.props.isLoggedIn}
        firstName={this.props.firstName}
        recipes={this.props.recipes}
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
    recipes: state.userFavourites
  };
}

/**
     * Maps actions to component properties
     * @param {*} dispatch
     * @returns {*} actions
     */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

FavouriteRecipes.propTypes = propTypes;
FavouriteRecipes.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteRecipes);
