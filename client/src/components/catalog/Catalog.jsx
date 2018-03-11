import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';
import CatalogPage from './CatalogPage';
import * as recipeActions from '../../actions/RecipeActions';
import { pluginsInit, transformNavBar } from '../../helpers/jqueryHelper';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  allRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  mostFavouritedRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.number,
  favourites: PropTypes.arrayOf(PropTypes.object).isRequired,
  paginationMeta: PropTypes.objectOf(PropTypes.any).isRequired
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
      hasSearchValue: false,
      hasMore: false
    };

    toastr.options = {
      closeButton: true,
      positionClass: 'toast-top-right'
    };
  }

  /**
   * Method when component has finished mounting
   * @returns {*} null
   */
  componentDidMount() {
    pluginsInit();
    transformNavBar();
    if (!this.props.paginationMeta.total) {
      this.props.actions.getAllRecipes();
    }
    if (this.props.mostFavouritedRecipes.length === 0) {
      this.props.actions.getMostFavouritedRecipes();
    }
    sessionService.loadSession()
      .then((token) => {
        this.props.actions.getFavourites(token);
      })
      .catch(() => {});
  }

  /**
   * Called when component is receiving new props
   * @param {Object} nextProps
   *
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.paginationMeta.next) {
      this.setState({ hasMore: true });
    } else {
      this.setState({ hasMore: false });
    }
  }


  /**
   * ComponentDidUpdate lifecycle method
   * @returns {undefined}
   */
  componentDidUpdate() {
    pluginsInit();
  }

  /**
   * onChange event on search bars
   * @param {Object} event
   * @returns {null} null
   */
  onSearchChange = (event) => {
    const { value } = event.target;
    if (value !== '') {
      this.setState({ searchValue: value, hasSearchValue: true }, () => {
        this.props.actions.search(this.state.searchValue);
      });
    }
    if (value === '') {
      this.setState({ hasSearchValue: false });
    } else {
      this.setState({ hasSearchValue: true });
    }
  }

  /**
   * Fetch next set of recipes for paginatino
   * @returns {undefined}
  */
  fetchNext = () => {
    const { next } = this.props.paginationMeta;
    if (next) {
      this.props.actions.getAllRecipes(next);
    }
  }


  /**
   * votes recipe
   * @param {Object} event
   * @returns {null} null
   */
  vote = (event) => {
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
  addFavourite = (event) => {
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
        hasMore={this.state.hasMore}
        fetchNext={this.fetchNext}
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
    mostFavouritedRecipes: state.mostFavourited,
    paginationMeta: state.paginationMeta
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

