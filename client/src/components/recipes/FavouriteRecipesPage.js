import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Header from '../common/Header/Header';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired
};

const cardPropTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  recipeName: PropTypes.string.isRequired,
  recipeDescription: PropTypes.string.isRequired,
  onClickVote: PropTypes.func.isRequired
};

const defaultProps = {
  firstName: ''
};

const cardDefaultProps = { image: '' };

/**
 * Displays recipes in cards
 * @param {*} recipes
 * @param {func} onDelete
 * @returns {*} jsx
 */
function displayRecipes(recipes) {
  const chunkedRecipes = _.chunk(recipes, 3);
  chunkedRecipes.map((chunk) => chunk.map(recipe => console.log(recipe.id)));
  if (recipes === undefined || recipes.length === 0) {
    return 'No Recipe Available';
  }
  return chunkedRecipes.map((chunk, index) => (
    <div className="row" key={index}>
      {chunk.map(recipe => (
        <Card
          key={recipe.id}
          id={recipe.id}
          image={recipe.image}
          recipeName={recipe.name}
          recipeDescription={recipe.description}
        />
    ))}
    </div>
  ));
}

/**
 * Functional component for favourite recipes page
 * @param {*} props
 * @returns {*} jsx
 */
function FavouriteRecipesPage({ isLoggedIn, firstName, recipes }) {
  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        firstName={firstName}
      />
      <div className="container">
        <div className="favorited-reviews">
          <h4>Favorited Recipes</h4>
          <hr />
          {displayRecipes(recipes)}
        </div>
      </div>

    </div>
  );
}

/**
 * Component for displaying card
 * @param {*} param0
 * @returns {*} jsx
 */
function Card({
  id, image, recipeName, recipeDescription, onClickVote
}) {
  return (
    <div className="col s12 l4 m4">
      <div className="card">
        <div className="card-image">
          <img src={image} alt="recipe" />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <Link to={`/recipe/${id}`}><span className="card-title">{recipeName}</span></Link>
            <p>{recipeDescription}</p>

          </div>
          <div className="card-action">
            <div className="recipe-icons">
              <a
                href="#!"
                className="upvotes"
                onClick={onClickVote}
              >
                <i id={id} className="material-icons">thumb_up</i>
              </a>
              <a
                href="#!"
                className="downvotes"
                onClick={onClickVote}
              >
                <i id={id} className="material-icons">thumb_down</i>
              </a>
              <a href="#!" className="favourite red-text">
                <i className="material-icons">favorite</i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

FavouriteRecipesPage.propTypes = propTypes;
FavouriteRecipesPage.defaultProps = defaultProps;

Card.propTypes = cardPropTypes;
Card.defaultProps = cardDefaultProps;

export default FavouriteRecipesPage;

