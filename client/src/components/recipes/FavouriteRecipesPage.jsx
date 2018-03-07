import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { MainHeader } from '../common/Header';
import RecipesDisplay from '../common/RecipesDisplay';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
  onClickVote: PropTypes.func.isRequired,
  onClickFavourite: PropTypes.func.isRequired
};

const defaultProps = {
  firstName: ''
};

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
      <MainHeader
        isLoggedIn={isLoggedIn}
        firstName={firstName}
      />
      <div className="container">
        <div className="favorited-reviews">
          <h4>Favorited Recipes</h4>
          <hr />
          <RecipesDisplay
            recipes={recipes}
            userId={userId}
            onClickVote={onClickVote}
            onClickFavourite={onClickFavourite}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>

    </div>
  );
}

FavouriteRecipesPage.propTypes = propTypes;
FavouriteRecipesPage.defaultProps = defaultProps;

export default FavouriteRecipesPage;

