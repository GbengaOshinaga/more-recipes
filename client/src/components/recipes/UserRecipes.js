import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';
import toastr from 'toastr';
import cloudinary from 'cloudinary';
import Page from './UserRecipesPage';
import * as userActions from '../../actions/userActions';

cloudinary.config({
  cloud_name: 'king-more-recipes',
  api_key: '541495131929684',
  api_secret: 'OyOXBWjA3yC7bqOGXdsGkJUF1Rw'
});

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  userRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.object.isRequired
};

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
        id: 0,
        recipeName: '',
        recipeDescription: '',
        ingredients: [],
        imageURL: ''
      },
      deleteId: 0,
      edit: {
        id: 0,
        recipeName: '',
        recipeDescription: '',
        ingredients: [],
        imageURL: ''
      },
      imageFile: []
    };

    this.handleChipsChange = this.handleChipsChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.onConfirmDelete = this.onConfirmDelete.bind(this);
    this.getId = this.getId.bind(this);
    this.getIdForEdit = this.getIdForEdit.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.handleEditInputChange = this.handleEditInputChange.bind(this);
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
    cloudinary.v2.uploader.upload(this.state.imageFile, (error, result) => {
      console.log(result);
      this.setState({ data: { imageURL: result.url } });
    });
    console.log(this.state.data);
    sessionService.loadSession()
      .then((token) => {
        this.props.actions.addRecipe(token, this.state.data);
      });
  }

  /**
   * Handle edit
   * @returns {*} null
   */
  onClickEdit() {
    sessionService.loadSession()
      .then((token) => {
        this.props.actions.editRecipe(token, this.state.edit.id, this.state.edit)
          .catch(error => toastr.error(error));
      });
  }

  /**
   * Method to delete recipe
   * @param {*} event
   * @returns {*} null
   */
  onConfirmDelete() {
    sessionService.loadSession()
      .then((token) => {
        this.props.actions.deleteRecipe(token, this.state.deleteId);
      })
      .then(toastr.success('Recipe successfully deleted'));
  }

  /**
   * Get id of recipe
   * @param {*} event
   * @returns {*} null
   */
  getId(event) {
    this.setState({ deleteId: event.target.id });
  }

  /**
   * Get id of recipe for edit
   * @param {*} event
   * @returns {*} null
   */
  getIdForEdit(event) {
    const recipeForEdit = [
      ...this.props.userRecipes.filter(recipe => recipe.id === Number(event.target.id))
    ];
    this.setState({
      edit: {
        id: recipeForEdit[0].id,
        recipeName: recipeForEdit[0].name,
        recipeDescription: recipeForEdit[0].description,
        ingredients: [...recipeForEdit[0].ingredients],
        imageURL: recipeForEdit[0].image
      }
    });
  }

  /**
   * Loads image to canvas
   * @param {*} event
   * @returns {*} image src
   */
  loadImage(event) {
    let context;
    if (event.target.id === 'fileUpload') {
      context = this.inputElement.getContext('2d');
    } else {
      context = this.editInputElement.getContext('2d');
    }
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
      console.log(fileReader.result);
    } catch (error) {
    }
    let { imageFile } = this.state;
    imageFile = fileReader.result;
    this.setState({ imageFile });
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
   * Handles input field value change
   * @param {*} event
   * @returns {*} new state
   */
  handleEditInputChange(event) {
    const name = this.state.edit;
    name[event.target.id] = event.target.value;
    this.setState({ edit: name });
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
        onEditInputChange={this.handleEditInputChange}
        inputValue={this.state.data.recipeName}
        descValue={this.state.data.recipeDescription}
        editData={this.state.edit}
        canvasId="imageURL"
        onClickSave={this.onClickSave}
        onFileChange={this.loadImage}
        inputRef={(el) => { this.inputElement = el; }}
        editInputRef={(el) => { this.editInputElement = el; }}
        onConfirmDelete={this.onConfirmDelete}
        getId={this.getId}
        getIdForEdit={this.getIdForEdit}
        defaultIngredients={this.state.data.ingredients}
        onClickEdit={this.onClickEdit}
      />
    );
  }
}

UserRecipes.propTypes = propTypes;
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
