import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from './Card';
import Preloader from './Preloader';
import { VoteCardAction, UserCardAction } from './CardAction';
import updateClassName from '../../helpers/functionHelpers';

const propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickVote: PropTypes.func,
  onClickFavourite: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  userId: PropTypes.number,
  favourites: PropTypes.arrayOf(PropTypes.object),
  hasSearchValue: PropTypes.bool,
  getId: PropTypes.func,
  getIdForEdit: PropTypes.func,
  next: PropTypes.func,
  hasMore: PropTypes.bool
};

const defaultProps = {
  onClickVote: undefined,
  onClickFavourite: undefined,
  isLoggedIn: true,
  userId: 0,
  favourites: undefined,
  hasSearchValue: false,
  getId: undefined,
  getIdForEdit: undefined,
  next: undefined,
  hasMore: false
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
 * Displays recipes
 * @param {Array} recipes
 * @param {func} onClickVote
 * @param {func} onClickFavourite
 * @param {bool} isLoggedIn
 * @param {Number} userId
 * @param {Array} favourites
 * @param {bool} hasSearchValue
 * @param {func} getId
 * @param {func} getIdForEdit
 *
 * @returns {Node} recipes
 */
function displayRecipes(
  recipes, onClickVote, onClickFavourite, isLoggedIn,
  userId, favourites, hasSearchValue, getId, getIdForEdit
) {
  const chunkedRecipes = _.chunk(recipes, 3);
  if (hasSearchValue && recipes.length === 0) {
    return <h5>No Result(s) Found</h5>;
  }
  if (recipes === undefined || recipes.length === 0) {
    return <div style={{ marginTop: '50px' }}><Preloader /></div>;
  }
  return chunkedRecipes.map(chunk => (
    <div className="row" key={chunk[0].id}>
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

/**
 * Component for displaying recipes
 * @param {Object} props
 *
 * @returns {Node} recipes
 */
function RecipesDisplay({
  recipes, onClickVote, onClickFavourite, isLoggedIn,
  userId, favourites, hasSearchValue, getId, getIdForEdit, next, hasMore
}) {
  return (
    <InfiniteScroll
      next={next}
      hasMore={hasMore}
      loader={<Preloader />}
    >
      {displayRecipes(
        recipes, onClickVote, onClickFavourite, isLoggedIn,
        userId, favourites, hasSearchValue, getId, getIdForEdit
        )}
    </InfiniteScroll>
  );
}

RecipesDisplay.propTypes = propTypes;
RecipesDisplay.defaultProps = defaultProps;

export default RecipesDisplay;
