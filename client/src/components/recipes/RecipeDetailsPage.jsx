import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'material-ui';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { MainHeader } from '../common/Header';
import TextArea from '../common/TextArea';

const propTypes = {
  recipe: PropTypes.object,
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
  favouriteClassName: PropTypes.string.isRequired
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

/**
 * Function to display reviews
 * @param {*} reviews
 * @returns {*} jsx
 */
function displayReviews(reviews) {
  if (reviews === undefined || reviews.length === 0) {
    return 'No Reviews';
  }
  return reviews.map(review =>
    (<Reviews
      key={review.id}
      review={review.review}
      profilePic={review.User.profilePic}
    />));
}

/**
 * Function to display ingredients
 * @param {*} ingredients
 * @returns {*} jsx
 */
function displayIngredients(ingredients) {
  if (ingredients === undefined || ingredients.length === 0) {
    return;
  }
  return ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>);
}

/**
 * Functional component for recipe details page
 * @returns {*} jsx
 */
function RecipeDetailsPage({
  recipe, isLoggedIn, firstName, onClickSaveReview, onAddReviewChange,
  newReview, location, profilePic, onClickVote, onClickFavourite,
  upvoteClassName, downvoteClassName, favouriteClassName
}) {
  if (recipe === undefined || Object.keys(recipe).length === 0) {
    return 'Waiting for recipe...';
  }
  return (
    <div>
      <MainHeader
        isLoggedIn={isLoggedIn}
        firstName={firstName}
      />
      <div className="container">
        <div className="details-box">
          <div className="row">
            <div className="col s12 center-align">
              <img className="responsive-img" src={recipe.image} alt="recipe" />
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
                    <span id="favorites">0</span>
                  </div>}
                </div>
                <div className="review">
                  <h5>Reviews</h5>
                  {displayReviews(recipe.Reviews)}
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
 * @param {*} props
 * @returns {*} jsx
 */
function Reviews({ review, profilePic }) {
  return (
    <div className="row">
      <div className="col s2">
        <Avatar src={profilePic} size={80} />
      </div>
      <div className="col s10">
        <div className="review-container">
          <p>{review}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Add review component
 * @param {*} props
 * @returns {*} jsx
 */
function AddReview({
  profilePic, onClickSaveReview, onAddReviewChange, newReview
}) {
  return (
    <div className="row">
      <div className="col s2">
        <a href="profile.html">
          <Avatar src={profilePic} size={80} />
        </a>
      </div>
      <div className="col s10">
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
  );
}

RecipeDetailsPage.propTypes = propTypes;
RecipeDetailsPage.defaultProps = defaultProps;
Reviews.propTypes = reviewPropTypes;
AddReview.propTypes = addReviewPropTypes;
AddReview.defaultProps = addReviewDefaultProps;

export default RecipeDetailsPage;
