import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';
import { connect } from 'react-redux';
import Page from './FavouriteRecipesPage';
import * as recipeActions from '../../actions/RecipeActions';
import { pluginsInit } from '../../helpers/jqueryHelper';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired
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
    this.vote = this.vote.bind(this);
    this.removeFavourite = this.removeFavourite.bind(this);
  }

  /**
   * Method when component has finished mounting
   * @returns {*} undefined
   */
  componentDidMount() {
    pluginsInit();

    if (this.props.recipes.length === 0) {
      sessionService.loadSession()
        .then((token) => {
          this.props.actions.getFavourites(token);
        });
    }
  }

  /**
   * votes recipe
   * @param {*} event
   * @returns {*} null
   */
  vote(event) {
    event.persist();
    event.preventDefault();
    const { currentTarget } = event;
    sessionService.loadSession()
      .then((token) => {
        if (event.target.firstChild.nodeValue === 'thumb_up') {
          this.props.actions.upvoteRecipe(event.target.id, token);
          currentTarget.classList.toggle('green-text');
        } else {
          this.props.actions.downvoteRecipe(event.target.id, token);
          currentTarget.classList.toggle('black-text');
        }
      });
  }

  /**
   * Remove favourite
   * @param {*} event
   * @returns {*} null
   */
  removeFavourite(event) {
    event.persist();
    event.preventDefault();
    sessionService.loadSession()
      .then((token) => {
        this.props.actions.deleteFavourite(token, event.target.id);
      });
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
        userId={this.props.userId}
        onClickVote={this.vote}
        onClickFavourite={this.removeFavourite}
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
    userId: state.session.user.id,
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
    actions: bindActionCreators(recipeActions, dispatch)
  };
}

FavouriteRecipes.propTypes = propTypes;
FavouriteRecipes.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteRecipes);