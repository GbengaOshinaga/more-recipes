import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui';
import Button from '../common/Button';
import Header from '../common/Header/Header';

const propTypes = {
  image: PropTypes.string,
  recipeName: PropTypes.string.isRequired,
  recipeDescription: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  views: PropTypes.number.isRequired,
  upvotes: PropTypes.number.isRequired,
  downvotes: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  userImage: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  onClickSaveReview: PropTypes.func.isRequired
};

const defaultProps = {
  image: '',
  userImage: '',
  firstName: ''
};

const reviewPropTypes = {
  review: PropTypes.string.isRequired
};

const addReviewPropTypes = {
  userImage: PropTypes.string,
  onClickSaveReview: PropTypes.func.isRequired
};

const addReviewDefaultProps = {
  userImage: ''
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
  return reviews.map(review => <Reviews key={review.id} review={review.review} />);
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
  image, recipeName, recipeDescription, ingredients, views, upvotes, downvotes, reviews, userImage,
  isLoggedIn, firstName, onClickSaveReview
}) {
  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        firstName={firstName}
      />
      <div className="container">
        <div className="details-box">
          <div className="row">
            <div className="col s12 center-align">
              <img className="responsive-img" src={image} alt="recipe" />
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="container">
                <div className="details-content">
                  <h4>{recipeName}</h4>
                  <p>{recipeDescription}</p>
                  <ul>{displayIngredients(ingredients)}</ul>
                  <p className="grey-text">{views} views</p>
                  <div id="vote">
                    <a href="#!" id="details-thumb-up" className="thumb-up">
                      <i className="small material-icons">thumb_up</i>
                    </a>
                    <span id="upvotes">{upvotes}</span>
                    <a href="#!" id="details-thumb-down" className="thumb-down">
                      <i className="small material-icons">thumb_down</i>
                    </a>
                    <span id="downvotes">{downvotes}</span>
                    <a href="#!" id="details-favourite" className="details-favourite">
                      <i className="small material-icons">favorite</i>
                    </a>
                    <span id="favorites">0</span>
                  </div>
                </div>
                <div className="review">
                  {displayReviews(reviews)}
                  <AddReview userImage={userImage} onClickSaveReview={onClickSaveReview} />
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
function Reviews({ review }) {
  return (
    <div>
      <h5>Reviews</h5>
      <div className="row">
        <div className="col s2">
          <a href="profile.html">
            <img src="img/profile-pic.jpg" className="circle responsive-img" alt="user" />
          </a>
        </div>
        <div className="col s10">
          <div className="review-container">
            <p>{review}</p>
          </div>
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
function AddReview({ userImage, onClickSaveReview }) {
  return (
    <div className="row">
      <div className="col s2">
        <a href="profile.html">
          <img src={userImage} className="circle responsive-img" alt="user" />
        </a>
      </div>
      <div className="col s10">
        <form>
          <div className="input-field">
            <textarea id="review-textarea" className="materialize-textarea" />
            <label htmlFor="review-textarea">Add Review</label>
          </div>
          <Button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
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
