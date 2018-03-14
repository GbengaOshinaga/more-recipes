
/**
 * Updates recipe depending on if user has voted
 * @param {Object} recipe
 * @param {Integer} userId
 *
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
 * Updates recipe depending on if user has favourited
 * @param {Object} recipe
 * @param {Array} favourites
 *
 * @returns {Object} updated recipe
 */
function updateFavouriteState(recipe, favourites) {
  let hasFavourited = false;
  favourites.map((favourite) => {
    if (recipe.id === favourite.Favourites.RecipeId) {
      hasFavourited = true;
    }
  });
  return hasFavourited;
}

/**
 * Updates vote class names
 * @param {Object} recipe
 * @param {Number} userId
 * @param {Array} favourites
 *
 * @returns {Object} className
 */
function updateVoteClassName(recipe, userId) {
  const voteStatus = updateRecipeVoteState(recipe, userId);

  let upvoteClassName = 'upvotes';
  let downvoteClassName = 'downvotes';

  if (voteStatus === 'upvoted') {
    upvoteClassName = 'upvotes green-text';
  } else if (voteStatus === 'downvoted') {
    downvoteClassName = 'downvotes black-text';
  }


  return { upvoteClassName, downvoteClassName };
}

/**
 * Updates favourite class name
 * @param {Object} recipe
 * @param {Array} favourites
 *
 * @returns {String} class name
 */
function updateFavouriteClassName(recipe, favourites) {
  const favouriteStatus = updateFavouriteState(recipe, favourites);

  let favouriteClassName = 'favourite';

  if (favouriteStatus) {
    favouriteClassName = 'favourite red-text';
  }

  return favouriteClassName;
}

/**
 * Updates class names for actions
 * @param {Object} recipe
 * @param {Number} userId
 * @param {Array} favourites
 *
 * @returns {Object} classnames
 */
export default function updateClassName(recipe, userId, favourites) {
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

  return { upvoteClassName, downvoteClassName, favouriteClassName };
}

