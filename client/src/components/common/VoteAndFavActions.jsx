import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Favorite from '@material-ui/icons/Favorite';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import {
  getIsUserAuthenticated,
  getHasUserVoted,
  getHasUserFavorited,
  useStoreContext
} from '../../hooks/globalStore';

export default function VoteAndFavActions({ recipe, favorites }) {
  const { upvoteRecipe, downvoteRecipe, favoriteRecipe } = useStoreContext();
  const isLoggedIn = getIsUserAuthenticated();
  const { hasUpvoted, hasDownvoted } = getHasUserVoted(recipe);
  const hasFavorited = getHasUserFavorited(recipe.id, favorites);

  const renderActions = () => {
    return (
      <CardActions disableSpacing>
        <IconButton
          aria-label="upvote recipe"
          onClick={() => upvoteRecipe(recipe)}
        >
          <ThumbUp htmlColor={hasUpvoted ? 'green' : null} />
        </IconButton>
        <IconButton
          aria-label="downvote recipe"
          onClick={() => downvoteRecipe(recipe)}
        >
          <ThumbDown htmlColor={hasDownvoted ? 'black' : null} />
        </IconButton>
        <IconButton
          aria-label="add to favorites"
          onClick={() => favoriteRecipe(recipe.id, hasFavorited)}
        >
          <Favorite htmlColor={hasFavorited ? '#ed2939' : null} />
        </IconButton>
      </CardActions>
    );
  };

  return isLoggedIn ? renderActions() : null;
}
