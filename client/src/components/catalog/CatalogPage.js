import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import CatalogHeader from '../common/Header/CatalogHeader';
import backgroundImage from '../../assets/img/bg-search.jpg';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  allRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  mostFavouritedRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickVote: PropTypes.func.isRequired
};

const cardPropTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  recipeName: PropTypes.string.isRequired,
  recipeDescription: PropTypes.string.isRequired,
  onClickVote: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

const defaultProps = {
  firstName: ''
};

const cardDefaultProps = { image: '' };

/**
 * Displays recipes in cards
 * @param {*} recipes
 * @param {func} onClickVote
 * @param {bool} isLoggedIn
 * @returns {*} jsx
 */
function displayRecipes(recipes, onClickVote, isLoggedIn) {
  const chunkedRecipes = _.chunk(recipes, 3);
  if (recipes === undefined || recipes.length === 0) {
    return 'No Recipe Available';
  }
  return chunkedRecipes.map((chunk, index) => (
    <div className="row" key={index}>
      {chunk.map(recipe => (
        <Card
          key={recipe.id}
          id={recipe.id}
          image={recipe.image}
          recipeName={recipe.name}
          recipeDescription={recipe.description}
          onClickVote={onClickVote}
          isLoggedIn={isLoggedIn}
        />
    ))}
    </div>
  ));
}


/**
 * Functional component for catalog page
 * @param {*} props
 * @returns {*} jsx
 */
export default function CatalogPage({
  isLoggedIn, firstName, allRecipes, mostFavouritedRecipes, onClickVote
}) {
  return (
    <div>
      <div className="parallax-container">
        <CatalogHeader
          isLoggedIn={isLoggedIn}
          firstName={firstName}
        />
        <div className="parallax"><img src={backgroundImage} alt="parallax" /></div>
        <div className="search-form">
          <div className="container">
            <form>
              <div className="input-field">
                <i className="white-text material-icons prefix">search</i>
                <input
                  placeholder="Search Catalog"
                  id="autocomplete-input"
                  className="autocomplete white-text"
                />
              </div>
            </form>
          </div>
        </div>

      </div>

      <div className="section">
        <div className="row pin-tab" data-target="pin-tab">
          <div className="col s12 pin">
            <ul className="tabs">
              <div className="container">
                <li className="tab col s6"><a href="#all">All</a></li>
                <li className="tab col s6"><a href="#most-fav">Most Favorited</a></li>
              </div>
            </ul>
          </div>
        </div>
        <div id="all">
          <div className="container">
            {displayRecipes(allRecipes, onClickVote, isLoggedIn)}
          </div>
        </div>
        <div id="most-fav">
          <div className="container">
            {displayRecipes(mostFavouritedRecipes, onClickVote, isLoggedIn)}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Component for displaying card
 * @param {*} param0
 * @returns {*} jsx
 */
function Card({
  id, image, recipeName, recipeDescription, onClickVote, isLoggedIn
}) {
  return (
    <div className="col s12 l4 m4">
      <div className="card">
        <div className="card-image">
          <img src={image} alt="recipe" />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <Link to={`/recipe/${id}`}><span className="card-title">{recipeName}</span></Link>
            <p>{`${recipeDescription.slice(0, 30)}...`}</p>

          </div>

          {isLoggedIn &&
          <div className="card-action">
            <div className="recipe-icons">
              <a
                href="#!"
                className="upvotes"
                onClick={onClickVote}
              >
                <i id={id} className="material-icons">thumb_up</i>
              </a>
              <a
                href="#!"
                className="downvotes"
                onClick={onClickVote}
              >
                <i id={id} className="material-icons">thumb_down</i>
              </a>
              <a href="#!" className="favourite"><i className="material-icons">favorite</i></a>
            </div>
          </div>}
        </div>
      </div>
    </div>

  );
}

CatalogPage.propTypes = propTypes;
CatalogPage.defaultProps = defaultProps;

Card.propTypes = cardPropTypes;
Card.defaultProps = cardDefaultProps;
