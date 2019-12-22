import React from 'react';

export default function VoteCardAction({
  onClickVote,
  isLoggedIn,
  upvoteClassName,
  downvoteClassName,
  favouriteClassName,
  onClickFavourite,
  id
}) {
  return (
    <div>
      {isLoggedIn && (
        <div className="card-action">
          <div className="recipe-icons">
            <a
              id="upvote-button"
              href="#!"
              className={upvoteClassName}
              onClick={onClickVote}
            >
              <i id={id} className="material-icons">
                thumb_up
              </i>
            </a>
            <a
              id="downvote-button"
              href="#!"
              className={downvoteClassName}
              onClick={onClickVote}
            >
              <i id={id} className="material-icons">
                thumb_down
              </i>
            </a>
            <a
              id="favourite-button"
              href="#!"
              className={favouriteClassName}
              onClick={onClickFavourite}
            >
              <i id={id} className="material-icons">
                favorite
              </i>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
