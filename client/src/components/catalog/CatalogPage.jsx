import React from 'react';
import PropTypes from 'prop-types';
import { MainHeader } from '../common/Header';
import RecipesDisplay from '../common/RecipesDisplay';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  allRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  mostFavouritedRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickVote: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  hasSearchValue: PropTypes.bool.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.number,
  onClickFavourite: PropTypes.func.isRequired,
  favourites: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  fetchNext: PropTypes.func.isRequired,
  isAllRecipesFound: PropTypes.bool.isRequired,
  isMostFavouritedFound: PropTypes.bool.isRequired
};

const defaultProps = {
  firstName: '',
  userId: 0
};


/**
 * Functional component for catalog page
 * @param {*} props
 *
 * @returns {Node} jsx
 */
export default function CatalogPage({
  isLoggedIn, firstName, allRecipes, mostFavouritedRecipes, searchResults, hasMore, fetchNext,
  onClickVote, onSearchChange, searchValue, hasSearchValue, userId, onClickFavourite, favourites,
  isAllRecipesFound, isMostFavouritedFound
}) {
  return (
    <div>
      <div className="parallax-container">
        <MainHeader
          isLoggedIn={isLoggedIn}
          firstName={firstName}
          onChange={onSearchChange}
          value={searchValue}
          type="catalog"
          navClassName="transparent z-depth-0"
          catalogId="catalog-nav"
        />
        <div className="parallax"><img src="/assets/img/bg-search.jpg" alt="parallax" /></div>
        <div className="search-form">
          <div className="container">
            <form>
              <div className="input-field">
                <i className="white-text material-icons prefix">search</i>
                <input
                  placeholder="Search Catalog"
                  id="autocomplete-input"
                  className="autocomplete white-text search"
                  onChange={onSearchChange}
                  value={searchValue}
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
                {hasSearchValue &&
                <li className="tab col s12">
                  <a id="search-results-link" href="#search-results" className="active">Search Results</a>
                </li>}
                {!hasSearchValue &&
                <div>
                  <li className="tab col s6"><a id="all-link" href="#all">All</a></li>
                  <li className="tab col s6"><a id="most-fav-link" href="#most-fav">Most Favorited</a></li>
                </div>}
              </div>
            </ul>
          </div>
        </div>
        {!hasSearchValue &&
        <div id="all">
          <div className="container">
            <RecipesDisplay
              recipes={allRecipes}
              onClickVote={onClickVote}
              onClickFavourite={onClickFavourite}
              isLoggedIn={isLoggedIn}
              userId={userId}
              favourites={favourites}
              hasMore={hasMore}
              next={fetchNext}
              isFound={isAllRecipesFound}
            />
          </div>
        </div>}
        {!hasSearchValue &&
        <div id="most-fav">
          <div className="container">
            <RecipesDisplay
              recipes={mostFavouritedRecipes}
              onClickVote={onClickVote}
              onClickFavourite={onClickFavourite}
              isLoggedIn={isLoggedIn}
              userId={userId}
              favourites={favourites}
              isFound={isMostFavouritedFound}
            />
          </div>
        </div>}
        {hasSearchValue &&
        <div id="search-results">
          <div className="container">
            <RecipesDisplay
              recipes={searchResults}
              onClickVote={onClickVote}
              onClickFavourite={onClickFavourite}
              isLoggedIn={isLoggedIn}
              userId={userId}
              favourites={favourites}
              hasSearchValue={hasSearchValue}
            />
          </div>
        </div>}
      </div>
    </div>
  );
}

CatalogPage.propTypes = propTypes;
CatalogPage.defaultProps = defaultProps;
