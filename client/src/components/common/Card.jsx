import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  image: PropTypes.string,
  id: PropTypes.number.isRequired,
  recipeName: PropTypes.string.isRequired,
  recipeDescription: PropTypes.string.isRequired,
  cardAction: PropTypes.node.isRequired
};

const defaultProps = {
  image: ''
};

/**
 * Formats recipe description based on length
 * @param {String} content
 * @returns {String} formatted content
 */
function formatContent(content) {
  if (content.length > 40) {
    return `${content.slice(0, 40)}...`;
  }
  return content;
}


/**
 * Card component
 * @param {Object} props
 * @returns {Node} jsx
 */
function Card({
  image, id, recipeName, recipeDescription, cardAction
}) {
  return (
    <div className="col s12 l4 m4">
      <div className="card recipe-card">
        <div className="card-image">
          <img src={image} alt="recipe" />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <Link to={`/recipe/${id}`}><span className="card-title">{formatContent(recipeName)}</span></Link>
            <p>{formatContent(recipeDescription)}</p>

          </div>
          {cardAction}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
