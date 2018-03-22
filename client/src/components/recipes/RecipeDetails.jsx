import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import toastr from 'toastr';
import * as recipeActions from '../../actions/RecipeActions';
import Page from './RecipeDetailsPage';
import { pluginsInit } from '../../helpers/jqueryHelper';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  profilePic: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
  userFavourites: PropTypes.arrayOf(PropTypes.object).isRequired,
  reviewsPaginationMeta: PropTypes.objectOf(PropTypes.any).isRequired
};

const defaultProps = {
  firstName: ''
};

/**
 * Container component for recipe details
 */
export class RecipeDetails extends React.Component {
  /**
     * Component constructor
     * @param {*} props
     * @param {*} context
     */
  constructor(props, context) {
    super(props, context);
    this.state = {
      review: '',
      recipe: {},
      upvoteClassName: 'thumb-up',
      downvoteClassName: 'thumb-down',
      favouriteClassName: 'favourite',
      hasMoreReviews: false,
      isLoadingReviews: false,
      notFound: false
    };
  }

  /**
   * Method when component has finished mounting
   *
   * @returns {undefined}
   */
  componentDidMount() {
    pluginsInit();

    let isRecipeAvailable = false;
    const { id } = this.props.match.params;
    const { reviewsPaginationMeta } = this.props;

    if (reviewsPaginationMeta.next) {
      // eslint-disable-next-line
      this.setState({ hasMoreReviews: true });
    }

    this.props.recipes.map((recipe) => {
      if (recipe.id === Number(id)) {
        isRecipeAvailable = true;
        this.upvoteVoteStatus(recipe, this.props.userId, this.props.userFavourites);
        this.props.actions.getRecipeReviews(id);
        this.setState({ recipe });
      }
    });
    if (!isRecipeAvailable) {
      this.props.actions.getRecipe(id)
        .then(() => this.props.actions.getRecipeReviews(id))
        .catch(() => this.setState({ notFound: true }));
    }
  }

  /**
   * Method called when component is receiving new props
   * @param {Object} nextProps
   *
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    nextProps.recipes.map((recipe) => {
      if (recipe.id === Number(this.props.match.params.id)) {
        this.upvoteVoteStatus(recipe, this.props.userId, this.props.userFavourites);
        this.setState({ recipe });
      }
    });

    if (nextProps.reviewsPaginationMeta.next) {
      this.setState({ hasMoreReviews: true });
    } else {
      this.setState({ hasMoreReviews: false });
    }
  }

  /**
   * ComponentDidUpdate lifecycle method
   *
   * @returns {undefined}
   */
  componentDidUpdate() {
    pluginsInit();
  }

  /**
   * Called when component is unmounting
   *
   * @returns {undefined}
  */
  componentWillUnmount() {
    const { id } = this.props.match.params;
    this.props.actions.clearReviews(id);
  }

  /**
   * Method to save review
   * @param {Object} event
   *
   * @returns {undefined}
   */
  onClickSaveReview = async (event) => {
    event.preventDefault();
    const { review } = this.state;
    if (review.trim().length === 0) {
      return toastr.error('Review is Required');
    }
    const { id } = this.props.match.params;
    const token = await sessionService.loadSession();
    if (token) {
      this.props.actions.addReview(id, token, this.state.review);
      this.setState({ review: '' });
    }
  }

  /**
   * onChange method for adding review
   * @param {Object} event
   *
   * @returns {undefined}
   */
  onAddReviewChange = (event) => {
    const { value } = event.target;
    this.setState({ review: value });
  }

  /**
   * Deletes review
   * @param {Number} reviewId
   *
   * @returns {undefined}
   */
  onConfirmReviewDelete = async (reviewId) => {
    const { id } = this.props.match.params;
    const token = await sessionService.loadSession();
    if (token) {
      this.props.actions.deleteReview(reviewId, id, token);
    }
  }


  /**
   * Get id of recipe
   * @param {Object} event
   *
   * @returns {undefined}
   */
  getId = (event) => {
    event.persist();
    event.preventDefault();
    swal({
      title: 'Delete this review?',
      text: 'This review will be permanently deleted',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.onConfirmReviewDelete(event.target.id);
        }
      });
  }

  /**
   * Update vote status
   * @param {Object} recipe
   * @param {Object} userId
   * @param {Array} userFavourites
   *
   * @returns {Object} new state
   */
  upvoteVoteStatus = (recipe, userId, userFavourites) => {
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
   * Fetch paginated reviews
   * @param {Object} event
   *
   * @returns {undefined}
  */
  fetchReviews = (event) => {
    this.setState({ isLoadingReviews: true });
    event.preventDefault();
    const { id } = this.props.match.params;
    const { reviewsPaginationMeta } = this.props;
    if (reviewsPaginationMeta.next) {
      this.props.actions.getRecipeReviews(id, reviewsPaginationMeta.next)
        .then(() => this.setState({ isLoadingReviews: false }));
    } else {
      this.props.actions.getRecipeReviews(id)
        .then(() => this.setState({ isLoadingReviews: false }));
    }
  }

  /**
   * votes recipe
   * @param {Object} event
   *
   * @returns {undefined}
   */
  vote = async (event) => {
    event.persist();
    event.preventDefault();
    const { currentTarget } = event;
    const token = await sessionService.loadSession();
    if (token) {
      if (event.target.firstChild.nodeValue === 'thumb_up') {
        this.props.actions.upvoteRecipe(this.props.match.params.id, token);
        currentTarget.classList.toggle('green-text');
      } else {
        this.props.actions.downvoteRecipe(this.props.match.params.id, token);
        currentTarget.classList.toggle('black-text');
      }
    }
  }

  /**
   * Add recipe to favourite
   * @param {Object} event
   *
   * @returns {undefined}
   */
  addFavourite = async (event) => {
    event.persist();
    event.preventDefault();
    const { currentTarget } = event;
    const token = await sessionService.loadSession();
    if (token) {
      currentTarget.classList.value === 'favourite' ?
        this.props.actions.addFavourite(token, this.props.match.params.id) :
        this.props.actions.deleteFavourite(token, this.props.match.params.id);

      currentTarget.classList.toggle('red-text');
    }
  }

  /**
   * Component render method
   *
   * @returns {Node} jsx
   */
  render() {
    if (this.state.notFound) {
      return <Redirect to="/not-found" />;
    }
    return (
      <Page
        isLoggedIn={this.props.isLoggedIn}
        firstName={this.props.firstName}
        recipe={this.state.recipe}
        onClickSaveReview={this.onClickSaveReview}
        onAddReviewChange={this.onAddReviewChange}
        newReview={this.state.review}
        location={this.props.location.pathname}
        profilePic={this.props.profilePic}
        onClickVote={this.vote}
        onClickFavourite={this.addFavourite}
        upvoteClassName={this.state.upvoteClassName}
        downvoteClassName={this.state.downvoteClassName}
        favouriteClassName={this.state.favouriteClassName}
        hasMoreReviews={this.state.hasMoreReviews}
        fetchReviews={this.fetchReviews}
        isLoadingReviews={this.state.isLoadingReviews}
        userId={this.props.userId}
        getId={this.getId}
        onConfirmReviewDelete={this.onConfirmReviewDelete}
      />
    );
  }
}

RecipeDetails.propTypes = propTypes;
RecipeDetails.defaultProps = defaultProps;

/**
 * Maps state to component properties
 * @param {Object} state
 *
 * @returns {object} object
 */
function mapStateToProps(state) {
  return {
    isLoggedIn: state.session.authenticated,
    firstName: state.session.user.firstName,
    profilePic: state.session.user.profilePic,
    userId: state.session.user.id,
    recipe: state.recipe,
    recipes: state.recipes,
    userFavourites: state.userFavourites,
    reviewsPaginationMeta: state.reviewsPaginationMeta
  };
}

/**
   * Maps actions to component properties
   * @param {func} dispatch
   *
   * @returns {Object} actions
   */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(recipeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
