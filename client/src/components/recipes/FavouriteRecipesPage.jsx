import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Header from '../common/Header/Header';
import Card from '../common/Card';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
  onClickVote: PropTypes.func.isRequired,
  onClickFavourite: PropTypes.func.isRequired
};

const cardActionPropTypes = {
  id: PropTypes.number.isRequired,
  onClickVote: PropTypes.func.isRequired,
  upvoteClassName: PropTypes.string.isRequired,
  downvoteClassName: PropTypes.string.isRequired,
  onClickFavourite: PropTypes.func.isRequired
};

const defaultProps = {
  firstName: ''
};

/**
 * Updates recipe depending on if user has voted
 * @param {Object} recipe
 * @param {Integer} userId
 * @returns {Object} updated recipe
 */
function updateRecipeVoteState(recipe, userId) {
  let hasVoted;
  recipe.upvotes.map((upvote) => {
    if (upvote === userId) {
      hasVoted = 'upvoted';
    }
  });
  recipe.downvotes.map((downvote) => {
    if (downvote === userId) {
      hasVoted = 'downvoted';
    }
  });
  return hasVoted;
}

/**
 * Displays recipes in cards
 * @param {Array} recipes
 * @param {Number} userId
 * @param {func} onClickVote
 * @param {func} onClickFavourite
 * @returns {Node} jsx
 */
function displayRecipes(recipes, userId, onClickVote, onClickFavourite) {
  const chunkedRecipes = _.chunk(recipes, 3);
  if (recipes === undefined || recipes.length === 0) {
    return 'No Recipe Available';
  }
  return chunkedRecipes.map((chunk, index) => (
    <div className="row" key={index}>
      {chunk.map((recipe) => {
        const voteStatus = updateRecipeVoteState(recipe, userId);

        let upvoteClassName = 'upvotes';
        let downvoteClassName = 'downvotes';

        if (voteStatus === 'upvoted') {
          upvoteClassName = 'upvotes green-text';
        } else if (voteStatus === 'downvoted') {
          downvoteClassName = 'downvotes black-text';
        }

        return (<Card
          key={recipe.id}
          id={recipe.id}
          image={recipe.image}
          recipeName={recipe.name}
          recipeDescription={recipe.description}
          cardAction={<CardAction
            id={recipe.id}
            upvoteClassName={upvoteClassName}
            downvoteClassName={downvoteClassName}
            onClickVote={onClickVote}
            onClickFavourite={onClickFavourite}
          />}
        />);
      })}
    </div>
  ));
}

/**
 * Functional component for favourite recipes page
 * @param {Object} props
 * @returns {Node} jsx
 */
function FavouriteRecipesPage({
  isLoggedIn, firstName, recipes, userId, onClickVote, onClickFavourite
}) {
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
          {displayRecipes(recipes, userId, onClickVote, onClickFavourite)}
        </div>
      </div>

    </div>
  );
}


/**
 * Component for displaying card actions
 * @param {Object} props
 * @returns {Node} jsx
 */
function CardAction({
  id, onClickVote, upvoteClassName, downvoteClassName, onClickFavourite,
}) {
  return (
    <div className="card-action">
      <div className="recipe-icons">
        <a
          href="#!"
          className={upvoteClassName}
          onClick={onClickVote}
        >
          <i id={id} className="material-icons">thumb_up</i>
        </a>
        <a
          href="#!"
          className={downvoteClassName}
          onClick={onClickVote}
        >
          <i id={id} className="material-icons">thumb_down</i>
        </a>
        <a
          href="#!"
          className="favourite red-text"
          onClick={onClickFavourite}
        >
          <i id={id} className="material-icons">favorite</i>
        </a>
      </div>
    </div>
  );
}

FavouriteRecipesPage.propTypes = propTypes;
FavouriteRecipesPage.defaultProps = defaultProps;

CardAction.propTypes = cardActionPropTypes;

export default FavouriteRecipesPage;

