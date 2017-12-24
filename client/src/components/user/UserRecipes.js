import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';
import Page from './UserRecipesPage';
import * as userActions from '../../actions/userActions';

const defaultProps = {
  firstName: ''
};

/**
 * Class component for user recipes actions
 */
class UserRecipes extends React.Component {
  /**
     * Component constructor
     * @param {*} props
     * @param {*} context
     */
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: {
        recipeName: '',
        recipeDescription: '',
        ingredients: [],
        imageURL: ''
      }
    };

    this.handleChipsChange = this.handleChipsChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.loadImage = this.loadImage.bind(this);
  }

  /**
   * Method when component has finished mounting
   * @returns {*} undefined
   */
  componentDidMount() {
    sessionService.loadSession()
      .then((token) => {
        this.props.actions.getUserRecipes(token);
      });
  }

  /**
   * Handle save event
   * @returns {*} null
   */
  onClickSave() {
    sessionService.loadSession()
      .then((token) => {
        this.props.actions.addRecipe(token, this.state.data);
      });
  }

  /**
   * Method to delete recipe
   * @returns {*} null
   */
  onConfirmDelete() {

  }

  /**
   * Loads image to canvas
   * @param {*} event
   * @returns {*} image src
   */
  loadImage(event) {
    const context = this.inputElement.getContext('2d');
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      const img = new Image(300, 200);
      img.addEventListener('load', () => {
        context.drawImage(img, 0, 0, 300, 200);
      });
      img.src = e.target.result;
    };
    try {
      fileReader.readAsDataURL(file);
    } catch (error) {
    }
    const { data } = this.state;
    data.imageURL = this.inputElement.toDataURL();
    this.setState({ data });
  }

  /**
 * Handle chip change
 * @param {*} chips
 * @returns {*} new state
 */
  handleChipsChange(chips) {
    if (chips[0] === 'Enter Ingredients') {
      chips.shift();
    }
    const { data } = this.state;
    data.ingredients = chips;
    this.setState({ data });
  }

  /**
   * Handles input field value change
   * @param {*} event
   * @returns {*} new state
   */
  handleInputChange(event) {
    const name = this.state.data;
    name[event.target.id] = event.target.value;
    this.setState({ data: name });
  }

  /**
   * Component render method
   * @returns {jsx} markup
   */
  render() {
    return (
      <Page
        isLoggedIn={this.props.isLoggedIn}
        firstName={this.props.firstName}
        userRecipes={this.props.userRecipes}
        onChipChange={chips => this.handleChipsChange(chips)}
        onInputChange={this.handleInputChange}
        inputValue={this.state.data.recipeName}
        descValue={this.state.data.recipeDescription}
        canvasId="imageURL"
        onClickSave={this.onClickSave}
        onFileChange={this.loadImage}
        inputRef={el => this.inputElement = el}
      />
    );
  }
}

UserRecipes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  userRecipes: PropTypes.array.isRequired
};

UserRecipes.defaultProps = defaultProps;

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
    userRecipes: state.userRecipes
  };
}

/**
 * Maps actions to component properties
 * @param {*} dispatch
 * @returns {*} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

UserRecipes.propTypes = {
  actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
