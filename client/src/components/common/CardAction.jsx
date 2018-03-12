import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const voteCardActionPropTypes = {
  id: PropTypes.number.isRequired,
  onClickVote: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  upvoteClassName: PropTypes.string.isRequired,
  downvoteClassName: PropTypes.string.isRequired,
  favouriteClassName: PropTypes.string.isRequired,
  onClickFavourite: PropTypes.func.isRequired
};

const userCardActionPropTypes = {
  id: PropTypes.number.isRequired,
  getId: PropTypes.func.isRequired,
  getIdForEdit: PropTypes.func.isRequired
};


/**
 * Component for displaying card
 * @param {*} props
 * @returns {*} jsx
 */
export function VoteCardAction({
  onClickVote, isLoggedIn, upvoteClassName, downvoteClassName,
  favouriteClassName, onClickFavourite, id
}) {
  return (
    <div>
      {isLoggedIn &&
        <div className="card-action">
          <div className="recipe-icons">
            <a
              id="upvote-button"
              href="#!"
              className={upvoteClassName}
              onClick={onClickVote}
            >
              <i id={id} className="material-icons">thumb_up</i>
            </a>
            <a
              id="downvote-button"
              href="#!"
              className={downvoteClassName}
              onClick={onClickVote}
            >
              <i id={id} className="material-icons">thumb_down</i>
            </a>
            <a
              id="favourite-button"
              href="#!"
              className={favouriteClassName}
              onClick={onClickFavourite}
            >
              <i id={id} className="material-icons">favorite</i>
            </a>
          </div>
        </div>}
    </div>
  );
}

/**
 * Component for displaying card actions
 * @param {Object} props
 * @returns {Node} jsx
 */
export function UserCardAction({
  id, getId, getIdForEdit
}) {
  return (
    <div className="card-action">
      <Link to={`/recipe/${id}`} className="btn-floating waves-effect waves-light green">
        <i id="desc" className="material-icons">description</i>
      </Link>
      <a
        className="modal-trigger btn-floating waves-effect waves-light blue icons"
        href="#edit-modal"
        onClick={getIdForEdit}
      >
        <i id={id} className="material-icons">edit</i>
      </a>
      <a
        className="modal-trigger btn-floating waves-effect waves-light red icons"
        href="#confirm-modal"
        onClick={getId}
      >
        <i id={id} className="material-icons">delete</i>
      </a>
    </div>
  );
}


VoteCardAction.propTypes = voteCardActionPropTypes;

UserCardAction.propTypes = userCardActionPropTypes;
