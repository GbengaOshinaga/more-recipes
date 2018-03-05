import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Card from './Card';
import { VoteCardAction, UserCardAction } from './CardAction';
import updateClassName from '../../helpers/functionHelpers';

const propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickVote: PropTypes.func,
  onClickFavourite: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  userId: PropTypes.number,
  favourites: PropTypes.arrayOf(PropTypes.object),
  getId: PropTypes.func,
  getIdForEdit: PropTypes.func
};

const defaultProps = {
  onClickVote: undefined,
  onClickFavourite: undefined,
  isLoggedIn: true,
  userId: 0,
  favourites: undefined,
  getId: undefined,
  getIdForEdit: undefined
};

/**
 * Get correct card action
 * @param {Object} recipe
 * @param {func} onClickVote
 * @param {func} onClickFavourite
 * @param {bool} isLoggedIn
 * @param {Number} userId
 * @param {Array} favourites
 * @param {func} getId
 * @param {func} getIdForEdit
 *
 * @returns {Node} card action
 */
function getCardAction(
  recipe, onClickVote, onClickFavourite, isLoggedIn,
  userId, favourites, getId, getIdForEdit
) {
  let cardAction;
  if (onClickVote) {
    const {
      upvoteClassName,
      downvoteClassName,
      favouriteClassName
    } = updateClassName(recipe, userId, favourites);

    cardAction = (<VoteCardAction
      id={recipe.id}
      onClickVote={onClickVote}
      isLoggedIn={isLoggedIn}
      upvoteClassName={upvoteClassName}
      downvoteClassName={downvoteClassName}
      favouriteClassName={favouriteClassName}
      onClickFavourite={onClickFavourite}
    />);
  } else {
    cardAction = (<UserCardAction
      id={recipe.id}
      getId={getId}
      getIdForEdit={getIdForEdit}
    />);
  }
  return cardAction;
}

/**
 * Component for displaying recipes
 * @param {Object} props
 *
 * @returns {Node} recipes
 */
function RecipesDisplay({
  recipes, onClickVote, onClickFavourite, isLoggedIn,
  userId, favourites, getId, getIdForEdit
}) {
  const chunkedRecipes = _.chunk(recipes, 3);
  if (recipes === undefined || recipes.length === 0) {
    return <h3>No Recipe Available</h3>;
  }
  return chunkedRecipes.map((chunk, index) => (
    <div className="row" key={index}>
      {chunk.map(recipe => (<Card
        key={recipe.id}
        id={recipe.id}
        image={recipe.image}
        recipeName={recipe.name}
        recipeDescription={recipe.description}
        cardAction={getCardAction(
          recipe, onClickVote, onClickFavourite,
          isLoggedIn, userId, favourites, getId, getIdForEdit
          )}
      />))}
    </div>
  ));
}

RecipesDisplay.propTypes = propTypes;
RecipesDisplay.defaultProps = defaultProps;

export default RecipesDisplay;
