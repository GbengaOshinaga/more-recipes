import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as recipeActions from '../../actions/RecipeActions';
import Page from './RecipeDetailsPage';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired
};

const defaultProps = {
  firstName: ''
};

/**
 * Container component for recipe details
 */
class RecipeDetails extends React.Component {
  /**
     * Component constructor
     * @param {*} props
     * @param {*} context
     */
  constructor(props, context) {
    super(props, context);
    this.state = {
      Reviews: [],
      id: '',
      name: '',
      description: '',
      ingredients: [],
      image: '',
      views: 0,
      upvotes: 0,
      downvotes: 0
    };
  }

  /**
   * Method when component has finished mounting
   * @returns {*} undefined
   */
  componentDidMount() {
    this.props.actions.getRecipe(this.props.match.params.id);
  }

  /**
   * Method to save review
   * @returns {*} null
   */
  onClickSaveReview() {

  }

  /**
   * Component render method
   * @returns {*} jsx
   */
  render() {
    return (
      <Page
        isLoggedIn={this.props.isLoggedIn}
        firstName={this.props.firstName}
        image={this.props.recipe.image}
        recipeName={this.props.recipe.name}
        recipeDescription={this.props.recipe.description}
        ingredients={this.props.recipe.ingredients}
        views={this.props.recipe.views}
        upvotes={this.props.recipe.upvotes}
        downvotes={this.props.recipe.downvotes}
        reviews={this.props.recipe.Reviews}
        onClickSaveReview={this.onClickSaveReview}
      />
    );
  }
}

RecipeDetails.propTypes = propTypes;
RecipeDetails.defaultProps = defaultProps;

/**
 * Maps state to component properties
 * @param {*} state
 * @param {*} ownProps
 * @returns {object} object
 */
function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.session.authenticated,
    firstName: state.session.user.firstName,
    recipe: state.recipe
  };
}

/**
   * Maps actions to component properties
   * @param {*} dispatch
   * @returns {*} actions
   */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(recipeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
