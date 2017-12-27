import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { sessionService } from 'redux-react-session';
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
      newReview: ''
    };

    this.onAddReviewChange = this.onAddReviewChange.bind(this);
    this.onClickSaveReview = this.onClickSaveReview.bind(this);
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
    const { id } = this.props.match.params;
    debugger;
    sessionService.loadSession()
      .then((token) => {
        this.props.actions.addReview(id, token, this.state.newReview);
      });
  }

  /**
   * onChange method for adding review
   * @param {*} event
   * @returns {*} new state
   */
  onAddReviewChange(event) {
    const { value } = event.target;
    this.setState({ newReview: value });
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
        recipe={this.props.recipe}
        onClickSaveReview={this.onClickSaveReview}
        onAddReviewChange={this.onAddReviewChange}
        newReview={this.state.newReview}
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
