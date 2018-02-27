import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';
import CatalogPage from './CatalogPage';
import * as recipeActions from '../../actions/RecipeActions';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  allRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  mostFavouritedRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.number,
  favourites: PropTypes.arrayOf(PropTypes.object).isRequired
};

const defaultProps = {
  firstName: '',
  userId: 0
};

/**
 * Class component for catalog page
 */
export class Catalog extends React.Component {
  /**
     * Component constructor
     * @param {Object} props
     * @param {Object} context
     */
  constructor(props, context) {
    super(props, context);
    this.state = {
      searchValue: '',
      hasSearchValue: false
    };

    this.vote = this.vote.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.addFavourite = this.addFavourite.bind(this);
    toastr.options.closeButton = true;
  }

  /**
   * Method when component has finished mounting
   * @returns {*} null
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.dropdown-button').dropdown();
    $('ul.tabs').tabs();

    this.props.actions.getAllRecipes();
    this.props.actions.getMostFavouritedRecipes();
    sessionService.loadSession()
      .then((token) => {
        this.props.actions.getFavourites(token);
      });
  }

  /**
   * onChange event on search bars
   * @param {Object} event
   * @returns {null} null
   */
  onSearchChange(event) {
    const { value } = event.target;
    this.setState({ searchValue: value, hasSearchValue: true }, () => {
      this.props.actions.search(this.state.searchValue);
    });
    if (value === '') {
      this.setState({ hasSearchValue: false });
    } else {
      this.setState({ hasSearchValue: true });
    }
  }


  /**
   * votes recipe
   * @param {Object} event
   * @returns {null} null
   */
  vote(event) {
    event.persist();
    event.preventDefault();
    const { currentTarget } = event;
    sessionService.loadSession()
      .then((token) => {
        if (event.target.firstChild.nodeValue === 'thumb_up') {
          this.props.actions.upvoteRecipe(event.target.id, token);
          currentTarget.classList.toggle('green-text');
        } else {
          this.props.actions.downvoteRecipe(event.target.id, token);
          currentTarget.classList.toggle('black-text');
        }
      });
  }

  /**
   * Add recipe to favourite
   * @param {Object} event
   * @returns {null} null
   */
  addFavourite(event) {
    event.persist();
    event.preventDefault();
    const { currentTarget } = event;
    sessionService.loadSession()
      .then((token) => {
        if (currentTarget.classList.value === 'favourite') {
          this.props.actions.addFavourite(token, event.target.id)
            .then(() => toastr.success('Added to favourites'));
        } else {
          this.props.actions.deleteFavourite(token, event.target.id)
            .then(() => toastr.success('Removed from favourites'));
        }

        currentTarget.classList.toggle('red-text');
      });
  }

  /**
   * Component render function
   * @returns {Node} jsx
   */
  render() {
    return (
      <CatalogPage
        isLoggedIn={this.props.isLoggedIn}
        firstName={this.props.firstName}
        allRecipes={this.props.allRecipes}
        mostFavouritedRecipes={this.props.mostFavouritedRecipes}
        searchResults={this.props.searchResults}
        onClickVote={this.vote}
        onSearchChange={this.onSearchChange}
        searchValue={this.state.searchValue}
        hasSearchValue={this.state.hasSearchValue}
        userId={this.props.userId}
        onClickFavourite={this.addFavourite}
        favourites={this.props.favourites}
      />
    );
  }
}

/**
 * Maps state to component properties
 * @param {Object} state
 * @returns {object} object
 */
function mapStateToProps(state) {
  return {
    isLoggedIn: state.session.authenticated,
    firstName: state.session.user.firstName,
    userId: state.session.user.id,
    allRecipes: state.recipes,
    searchResults: state.searchResults,
    favourites: state.userFavourites,
    mostFavouritedRecipes: state.mostFavourited
  };
}

/**
 * Maps actions to component properties
 * @param {*} dispatch
 * @returns {Object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(recipeActions, dispatch)
  };
}


Catalog.propTypes = propTypes;
Catalog.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);

