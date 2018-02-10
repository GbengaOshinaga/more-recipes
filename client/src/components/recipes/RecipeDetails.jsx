import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';
import { connect } from 'react-redux';
import $ from 'jquery';
import '../../../../node_modules/materialize-css/dist/js/materialize';
import * as recipeActions from '../../actions/RecipeActions';
import Page from './RecipeDetailsPage';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  profilePic: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
  userFavourites: PropTypes.arrayOf(PropTypes.object).isRequired
};

const defaultProps = {
  firstName: ''
};

/**
 * Container component for recipe details
 */
class RecipeDetails extends React.Component {
  /**
     * Component constructor
     * @param {*} props
     * @param {*} context
     */
  constructor(props, context) {
    super(props, context);
    this.state = {
      newReview: '',
      recipe: {},
      upvoteClassName: 'thumb-up',
      downvoteClassName: 'thumb-down',
      favouriteClassName: 'favourite'
    };

    this.onAddReviewChange = this.onAddReviewChange.bind(this);
    this.onClickSaveReview = this.onClickSaveReview.bind(this);
    this.vote = this.vote.bind(this);
    this.addFavourite = this.addFavourite.bind(this);
  }

  /**
   * Method when component has finished mounting
   * @returns {*} undefined
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
    $('.dropdown-button').dropdown();

    let isRecipeAvailable = false;

    this.props.recipes.map((recipe) => {
      if (recipe.id === Number(this.props.match.params.id)) {
        isRecipeAvailable = true;
        this.upvoteVoteStatus(recipe, this.props.userId, this.props.userFavourites);
        this.setState({ recipe });
      }
    });
    if (!isRecipeAvailable) {
      this.props.actions.getRecipe(this.props.match.params.id);
    }
  }

  /**
   * Method called when component is receiving new props
   * @param {Object} nextProps
   * @returns {*} null
   */
  componentWillReceiveProps(nextProps) {
    nextProps.recipes.map((recipe) => {
      if (recipe.id === Number(this.props.match.params.id)) {
        this.upvoteVoteStatus(recipe, this.props.userId, this.props.userFavourites);
        this.setState({ recipe });
      }
    });
  }

  /**
   * Method to save review
   * @param {Object} event
   * @returns {*} null
   */
  onClickSaveReview(event) {
    event.preventDefault();
    const { id } = this.props.match.params;
    sessionService.loadSession()
      .then((token) => {
        this.props.actions.addReview(id, token, this.state.newReview);
        this.setState({ newReview: '' });
      });
  }

  /**
   * onChange method for adding review
   * @param {Object} event
   * @returns {Object} new state
   */
  onAddReviewChange(event) {
    const { value } = event.target;
    this.setState({ newReview: value });
  }

  /**
   * Update vote status
   * @param {Object} recipe
   * @param {Object} userId
   * @param {Array} userFavourites
   * @returns {Object} new state
   */
  upvoteVoteStatus(recipe, userId, userFavourites) {
    recipe.upvotes.map((upvote) => {
      if (upvote === userId) {
        this.setState({ upvoteClassName: 'thumb-up green-text' });
        if (this.state.downvoteClassName === 'thumb-down black-text') {
          this.setState({ downvoteClassName: 'thumb-down' });
        }
      }
    });
    recipe.downvotes.map((downvote) => {
      if (downvote === userId) {
        this.setState({ downvoteClassName: 'thumb-down black-text' });
        if (this.state.upvoteClassName === 'thumb-up green-text') {
          this.setState({ upvoteClassName: 'thumb-up' });
        }
      }
    });

    userFavourites.map((favourite) => {
      if (recipe.id === favourite.Favourites.RecipeId) {
        this.setState({ favouriteClassName: 'favourite red-text' });
      }
    });
  }


  /**
   * votes recipe
   * @param {Object} event
   * @returns {*} null
   */
  vote(event) {
    event.persist();
    event.preventDefault();
    const { currentTarget } = event;
    sessionService.loadSession()
      .then((token) => {
        if (event.target.firstChild.nodeValue === 'thumb_up') {
          this.props.actions.upvoteRecipe(this.props.match.params.id, token);
          currentTarget.classList.toggle('green-text');
        } else {
          this.props.actions.downvoteRecipe(this.props.match.params.id, token);
          currentTarget.classList.toggle('black-text');
        }
      });
  }

  /**
   * Add recipe to favourite
   * @param {Object} event
   * @returns {*} null
   */
  addFavourite(event) {
    event.persist();
    event.preventDefault();
    const { currentTarget } = event;
    sessionService.loadSession()
      .then((token) => {
        currentTarget.classList.value === 'favourite' ?
          this.props.actions.addFavourite(token, this.props.match.params.id) :
          this.props.actions.deleteFavourite(token, this.props.match.params.id);

        currentTarget.classList.toggle('red-text');
      });
  }


  /**
   * Component render method
   * @returns {Node} jsx
   */
  render() {
    return (
      <Page
        isLoggedIn={this.props.isLoggedIn}
        firstName={this.props.firstName}
        recipe={this.state.recipe}
        onClickSaveReview={this.onClickSaveReview}
        onAddReviewChange={this.onAddReviewChange}
        newReview={this.state.newReview}
        location={this.props.location.pathname}
        profilePic={this.props.profilePic}
        onClickVote={this.vote}
        onClickFavourite={this.addFavourite}
        upvoteClassName={this.state.upvoteClassName}
        downvoteClassName={this.state.downvoteClassName}
        favouriteClassName={this.state.favouriteClassName}
      />
    );
  }
}

RecipeDetails.propTypes = propTypes;
RecipeDetails.defaultProps = defaultProps;

/**
 * Maps state to component properties
 * @param {Object} state
 * @param {Object} ownProps
 * @returns {object} object
 */
function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.session.authenticated,
    firstName: state.session.user.firstName,
    profilePic: state.session.user.profilePic,
    userId: state.session.user.id,
    recipe: state.recipe,
    recipes: state.recipes,
    userFavourites: state.userFavourites
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

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
