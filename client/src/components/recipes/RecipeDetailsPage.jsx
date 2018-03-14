import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { MainHeader } from '../common/Header';
import TextArea from '../common/TextArea';
import Preloader from '../common/Preloader';

const propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
  profilePic: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  onClickSaveReview: PropTypes.func.isRequired,
  onAddReviewChange: PropTypes.func.isRequired,
  newReview: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  onClickVote: PropTypes.func.isRequired,
  onClickFavourite: PropTypes.func.isRequired,
  upvoteClassName: PropTypes.string.isRequired,
  downvoteClassName: PropTypes.string.isRequired,
  favouriteClassName: PropTypes.string.isRequired,
  hasMoreReviews: PropTypes.bool.isRequired,
  fetchReviews: PropTypes.func.isRequired,
  isLoadingReviews: PropTypes.bool.isRequired
};

const defaultProps = {
  recipe: {},
  profilePic: '',
  firstName: ''
};

const reviewPropTypes = {
  review: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired
};

const addReviewPropTypes = {
  profilePic: PropTypes.string,
  onClickSaveReview: PropTypes.func.isRequired,
  onAddReviewChange: PropTypes.func.isRequired,
  newReview: PropTypes.string.isRequired
};

const addReviewDefaultProps = {
  profilePic: ''
};

const defaultUserAvatar = 'http://res.cloudinary.com/king-more-recipes/image/upload/v1518031651/Expert-tutor-placeholder_cg9wet.jpg';

/**
 * Function to display reviews
 * @param {Array} reviews
 *
 * @returns {Node} jsx
 */
function displayReviews(reviews) {
  if (reviews === undefined || reviews.length === 0) {
    return 'No Reviews';
  }
  return reviews.map(review =>
    (<Review
      key={review.id}
      review={review.review}
      profilePic={review.User.profilePic}
    />));
}

/**
 * Function to display ingredients
 * @param {Array} ingredients
 *
 * @returns {Node} jsx
 */
function displayIngredients(ingredients) {
  if (ingredients === undefined || ingredients.length === 0) {
    return;
  }
  return ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>);
}

/**
 * Functional component for recipe details page
 *
 * @returns {Node} jsx
 */
function RecipeDetailsPage({
  recipe, isLoggedIn, firstName, onClickSaveReview, onAddReviewChange,
  newReview, location, profilePic, onClickVote, onClickFavourite, isLoadingReviews,
  upvoteClassName, downvoteClassName, favouriteClassName, hasMoreReviews, fetchReviews
}) {
  if (recipe === undefined || Object.keys(recipe).length === 0) {
    return (
      <div>
        <MainHeader
          isLoggedIn={isLoggedIn}
          firstName={firstName}
        />
        <div style={{ marginTop: '20%' }} className="container">
          <Preloader />
        </div>
      </div>
    );
  }
  return (
    <div className="details">
      <MainHeader
        isLoggedIn={isLoggedIn}
        firstName={firstName}
      />
      <div className="container">
        <div className="details-box">
          <div className="row">
            <div className="col s12 center-align">
              <img className="responsive-img details-img" src={recipe.image} alt="recipe" />
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="container">
                <div className="details-content">
                  <h4>{recipe.name}</h4>
                  <p>{recipe.description}</p>
                  <ul>{displayIngredients(recipe.ingredients)}</ul>
                  {isLoggedIn &&
                  <div id="vote">
                    <a
                      href="#!"
                      id="details-thumb-up"
                      className={upvoteClassName}
                      onClick={onClickVote}
                    >
                      <i className="small material-icons">thumb_up</i>
                    </a>
                    <span id="upvotes">{recipe.upvotes.length}</span>
                    <a
                      href="#!"
                      id="details-thumb-down"
                      className={downvoteClassName}
                      onClick={onClickVote}
                    >
                      <i className="small material-icons">thumb_down</i>
                    </a>
                    <span id="downvotes">{recipe.downvotes.length}</span>
                    <a
                      href="#!"
                      id="details-favourite"
                      className={favouriteClassName}
                      onClick={onClickFavourite}
                    >
                      <i className="small material-icons">favorite</i>
                    </a>
                  </div>}
                </div>
                <div className="review">
                  <h5>Reviews</h5>
                  {displayReviews(recipe.Reviews)}
                  {hasMoreReviews &&
                  <p>
                    <a
                      className="center-align"
                      href="#!"
                      onClick={fetchReviews}
                    >
                    Load More Reviews
                    </a>
                  </p>}
                  {isLoadingReviews && <Preloader />}
                  {isLoggedIn &&
                  <AddReview
                    onClickSaveReview={onClickSaveReview}
                    onAddReviewChange={onAddReviewChange}
                    newReview={newReview}
                    profilePic={profilePic}
                  />}
                  {!isLoggedIn &&
                  <div>
                    <p><Link to={{ pathname: '/signin', state: { from: location } }}>Sign In</Link> To Add Review</p>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Functional component for review
 * @param {Object} props
 *
 * @returns {Node} jsx
 */
function Review({ review, profilePic }) {
  let profilePicture;
  profilePic === '' ? profilePicture = defaultUserAvatar : profilePicture = profilePic;
  return (
    <div className="row">
      <div className="card horizontal review-card">
        <div className="card-image">
          <img alt="profile" src={profilePicture} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{review}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Add review component
 * @param {Object} props
 *
 * @returns {Node} jsx
 */
function AddReview({
  profilePic, onClickSaveReview, onAddReviewChange, newReview
}) {
  return (
    <div className="row">
      <div className="card horizontal review-card">
        <div className="card-image">
          <img alt="profile" src={profilePic} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <form>
              <TextArea
                id="review-textarea"
                label="Add Review"
                onChange={onAddReviewChange}
                value={newReview}
              />
              <Button
                className="btn waves-effect waves-light"
                type="submit"
                buttonText="Submit"
                onClick={onClickSaveReview}
              />
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

RecipeDetailsPage.propTypes = propTypes;
RecipeDetailsPage.defaultProps = defaultProps;
Review.propTypes = reviewPropTypes;
AddReview.propTypes = addReviewPropTypes;
AddReview.defaultProps = addReviewDefaultProps;

export default RecipeDetailsPage;
