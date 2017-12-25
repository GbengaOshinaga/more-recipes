import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CatalogHeader from '../common/Header/CatalogHeader';
import backgroundImage from '../../assets/img/bg-search.jpg';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  allRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  mostFavouritedRecipes: PropTypes.arrayOf(PropTypes.object).isRequired
};

const cardPropTypes = {
  image: PropTypes.string,
  recipeName: PropTypes.string.isRequired,
  recipeDescription: PropTypes.string.isRequired

};

const defaultProps = {
  firstName: ''
};

const cardDefaultProps = { image: '' };

/**
 * Displays recipes in cards
 * @param {*} recipes
 * @param {func} onDelete
 * @returns {*} jsx
 */
function displayRecipes(recipes) {
  const chunkedRecipes = _.chunk(recipes, 3);
  if (recipes === undefined || recipes.length === 0) {
    return 'No Recipe Available';
  }
  return chunkedRecipes.map((chunk, index) => (
    <div className="row" key={index}>
      {chunk.map(recipe => (
        <Card
          key={recipe.id}
          image={recipe.image}
          recipeName={recipe.name}
          recipeDescription={recipe.description}
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
  isLoggedIn, firstName, allRecipes, mostFavouritedRecipes
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
            {displayRecipes(allRecipes)}
          </div>
        </div>
        <div id="most-fav">
          <div className="container">
            {displayRecipes(mostFavouritedRecipes)}
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
function Card({ image, recipeName, recipeDescription }) {
  return (
    <div className="col s12 l4 m4">
      <div className="card">
        <div className="card-image">
          <img src={image} alt="recipe" />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <a href="recipe_details.html"><span className="card-title">{recipeName}</span></a>
            <p>{recipeDescription}</p>

          </div>
          <div className="card-action">
            <div className="recipe-icons">
              <a href="#!" className="upvotes"><i className="material-icons">thumb_up</i></a>
              <a href="#!" className="downvotes"><i className="material-icons">thumb_down</i></a>
              <a href="#!" className="favourite"><i className="material-icons">favorite</i></a>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

CatalogPage.propTypes = propTypes;
CatalogPage.defaultProps = defaultProps;

Card.propTypes = cardPropTypes;
Card.defaultProps = cardDefaultProps;
