// import React from 'react';
// import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
// import { sessionService } from 'redux-react-session';
// import { connect } from 'react-redux';
// import Page from './FavouriteRecipesPage';
// import * as recipeActions from '../../actions/RecipeActions';

// const propTypes = {
//   isLoggedIn: PropTypes.bool.isRequired,
//   firstName: PropTypes.string,
//   actions: PropTypes.objectOf(PropTypes.func).isRequired,
//   recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
//   userId: PropTypes.number.isRequired
// };

// const defaultProps = {
//   firstName: ''
// };

// /**
//  * Container component for favourite recipes
//  */
// export class FavouriteRecipes extends React.Component {
//   /**
//    * Component constructor
//    * @param {Object} props
//    * @param {Object} context
//    */
//   constructor(props, context) {
//     super(props, context);
//     this.state = {
//       isFound: false
//     };
//   }

//   /**
//    * Method when component has finished mounting
//    *
//    * @returns {undefined}
//    */
//   async componentDidMount() {
//     if (this.props.recipes.length === 0) {
//       const token = await sessionService.loadSession();
//       if (token) {
//         this.props.actions
//           .getFavourites(token)
//           .then(() => this.setState({ isFound: true }))
//           .catch(() => {
//             this.setState({ isFound: false });
//           });
//       }
//     }
//   }

//   /**
//    * Method called when component is receiving props
//    * @param {Object} nextProps
//    *
//    * @return {undefined}
//    */
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.recipes.length === 0) {
//       this.setState({ isFound: false });
//     }
//   }

//   /**
//    * votes recipe
//    * @param {Object} event
//    *
//    * @returns {undefined}
//    */
//   vote = async event => {
//     event.persist();
//     event.preventDefault();
//     const { currentTarget } = event;
//     const token = await sessionService.loadSession();
//     if (token) {
//       if (event.target.firstChild.nodeValue === 'thumb_up') {
//         this.props.actions.upvoteRecipe(event.target.id, token);
//         currentTarget.classList.toggle('green-text');
//       } else {
//         this.props.actions.downvoteRecipe(event.target.id, token);
//         currentTarget.classList.toggle('black-text');
//       }
//     }
//   };

//   /**
//    * Remove favourite
//    * @param {Object} event
//    *
//    * @returns {undefined}
//    */
//   removeFavourite = async event => {
//     event.persist();
//     event.preventDefault();
//     const token = await sessionService.loadSession();
//     if (token) {
//       this.props.actions.deleteFavourite(token, event.target.id);
//     }
//   };

//   /**
//    * Component render function
//    *
//    * @returns {Node} jsx
//    */
//   render() {
//     return (
//       <Page
//         isLoggedIn={this.props.isLoggedIn}
//         firstName={this.props.firstName}
//         recipes={this.props.recipes}
//         userId={this.props.userId}
//         onClickVote={this.vote}
//         onClickFavourite={this.removeFavourite}
//         isFound={this.state.isFound}
//       />
//     );
//   }
// }

// /**
//  * Maps state to component properties
//  * @param {Object} state
//  *
//  * @returns {object} object
//  */
// function mapStateToProps(state) {
//   return {
//     isLoggedIn: state.session.authenticated,
//     firstName: state.session.user.firstName,
//     userId: state.session.user.id,
//     recipes: state.userFavourites
//   };
// }

// /**
//  * Maps actions to component properties
//  * @param {func} dispatch
//  *
//  * @returns {Object} actions
//  */
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(recipeActions, dispatch)
//   };
// }

// FavouriteRecipes.propTypes = propTypes;
// FavouriteRecipes.defaultProps = defaultProps;

// export default connect(mapStateToProps, mapDispatchToProps)(FavouriteRecipes);

import React, { useEffect } from 'react';
import {
  useStoreContext,
  getIsFetchingUserFavorites,
  getFavorites
} from '../../hooks/globalStore';
import useActions from '../../hooks/useActions';
import NavBar from '../common/NavBar';
import RecipesDisplay from '../common/RecipesDisplay';

const FavoriteRecipes = () => {
  const { userFavorites, getUserFavorites } = useStoreContext();
  const renderActions = useActions();

  const isFetching = getIsFetchingUserFavorites(userFavorites);
  const recipes = getFavorites(userFavorites);

  useEffect(() => {
    getUserFavorites();
  }, [getUserFavorites]);

  return (
    <div>
      <NavBar />
      <RecipesDisplay
        isFetching={isFetching}
        recipes={recipes}
        renderActions={renderActions}
      />
    </div>
  );
};

export default FavoriteRecipes;
