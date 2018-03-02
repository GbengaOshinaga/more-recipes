import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Card from './Card';
import { VoteCardAction, UserCardAction } from './CardAction';
import { updateVoteClassName, updateFavouriteClassName } from '../../helpers/functionHelpers';


/**
 * Component for displaying recipes
 * @param {Object} props
 *
 * @returns {Node} recipes
 */
export default function RecipesDisplay({
  recipes, onClickVote, onClickFavourite, isLoggedIn,
  userId, favourites, getId, getIdForEdit
}) {
  const chunkedRecipes = _.chunk(recipes, 3);
  if (recipes === undefined || recipes.length === 0) {
    return 'No Recipe Available';
  }
  return chunkedRecipes.map((chunk, index) => (
    <div className="row" key={index}>
      {chunk.map((recipe) => {
           const {
               upvoteClassName,
               downvoteClassName
              } = updateVoteClassName(recipe, userId);

          let favouriteClassName;
          if (favourites) {
              favouriteClassName = updateFavouriteClassName(recipe, favourites);
          } else {
              favouriteClassName = 'favourite red-text';
          }

            return (<Card
              key={recipe.id}
              id={recipe.id}
              image={recipe.image}
              recipeName={recipe.name}
              recipeDescription={recipe.description}
              cardAction={<VoteCardAction
                id={recipe.id}
                onClickVote={onClickVote}
                isLoggedIn={isLoggedIn}
                upvoteClassName={upvoteClassName}
                downvoteClassName={downvoteClassName}
                favouriteClassName={favouriteClassName}
                onClickFavourite={onClickFavourite}
              />}
            />);
          })}
    </div>
  ));
}

