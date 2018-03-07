import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';
import toastr from 'toastr';
import Loader from 'react-loader';
import Page from './UserRecipesPage';
import * as userActions from '../../actions/userActions';
import { pluginsInit } from '../../helpers/jqueryHelper';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  userRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

const defaultProps = {
  firstName: ''
};

const defaultImage = 'https://res.cloudinary.com/king-more-recipes/image/upload/v1518028470/10546i3DAC5A5993C8BC8C_vtqogc.jpg';
let imageContext;

/**
 * Class component for user recipes actions
 */
class UserRecipes extends React.Component {
  /**
     * Component constructor
     * @param {Object} props
     * @param {Object} context
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
      imageFile: {},
      loaded: true
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
    this.handleChipAdd = this.handleChipAdd.bind(this);
    this.handleChipDelete = this.handleChipDelete.bind(this);
    this.handleAddModalChipAdd = this.handleAddModalChipAdd.bind(this);
    this.handleAddModalChipDelete = this.handleAddModalChipDelete.bind(this);
    toastr.options = {
      closeButton: true,
      positionClass: 'toast-top-right'
    };
  }

  /**
   * Method when component has finished mounting
   * @returns {null} null
   */
  componentDidMount() {
    pluginsInit();

    sessionService.loadSession()
      .then((token) => {
        this.props.actions.getUserRecipes(token);
      });
  }

  /**
   * Handle save event
   * @param {Object} event
   * @returns {null} null
   */
  onClickSave(event) {
    event.preventDefault();
    this.setState({ loaded: false });
    if (!(this.state.imageFile instanceof File)) {
      const { data } = this.state;
      data.imageURL = defaultImage;
      this.setState({ data }, () => {
        this.saveRecipe(this.state.data);
      });
      this.setState({ loaded: true });
    } else {
      userActions.uploadImage(this.state.imageFile)
        .then(response => response.json())
        .then((response) => {
          const { data } = this.state;
          data.imageURL = response.secure_url;
          this.setState({ data }, () => {
            this.saveRecipe(this.state.data);
          });
          this.setState({ loaded: true });
        });
    }
  }

  /**
   * Handle edit
   * @param {Object} event
   * @returns {null} null
   */
  onClickEdit(event) {
    event.preventDefault();
    this.setState({ loaded: false });
    if (!(this.state.imageFile instanceof File)) {
      this.editRecipe();
      this.setState({ loaded: true });
    } else {
      userActions.uploadImage(this.state.imageFile)
        .then(response => response.json())
        .then((response) => {
          const { edit } = this.state;
          edit.imageURL = response.secure_url;
          this.setState({ edit }, () => {
            this.editRecipe();
          });
        });
      this.setState({ loaded: true });
    }
  }

  /**
   * Method to delete recipe
   * @param {Object} event
   * @returns {null} null
   */
  onConfirmDelete(event) {
    event.preventDefault();
    sessionService.loadSession()
      .then((token) => {
        this.props.actions.deleteRecipe(token, this.state.deleteId);
      })
      .then(toastr.success('Recipe successfully deleted'));
  }

  /**
   * Get id of recipe
   * @param {Object} event
   * @returns {null} null
   */
  getId(event) {
    event.preventDefault();
    this.setState({ deleteId: event.target.id });
  }

  /**
   * Get id of recipe for edit
   * @param {Object} event
   * @returns {null} null
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
    const img = new Image(300, 200);
    img.src = recipeForEdit[0].image;
    imageContext = this.editInputElement.getContext('2d');
    imageContext.drawImage(img, 0, 0, 300, 200);
  }

  /**
   * Save recipe
   * @param {Object} data
   * @returns {null} null
   */
  saveRecipe(data) {
    sessionService.loadSession()
      .then((token) => {
        this.props.actions.addRecipe(token, data)
          .then(() => {
            toastr.success('Recipe Added');
            this.setState({
              data: {
                id: 0,
                recipeName: '',
                recipeDescription: '',
                ingredients: [],
                imageURL: ''
              },
              imageFile: {}
            });
            imageContext.clearRect(0, 0, 300, 200);
          })
          .catch(errors => errors.map(error => toastr.error(error)));
      })
      .catch(() => {});
  }

  /**
   * Edits recipe
   * @returns {null} null
   */
  editRecipe() {
    sessionService.loadSession()
      .then((token) => {
        this.props.actions.editRecipe(token, this.state.edit.id, this.state.edit)
          .then(() => {
            toastr.success('Recipe modified successfully');
            this.setState({
              edit: {
                id: 0,
                recipeName: '',
                recipeDescription: '',
                ingredients: [],
                imageURL: ''
              },
              imageFile: {}
            });
            imageContext.clearRect(0, 0, 300, 200);
          })
          .catch(error => toastr.error(error));
      })
      .catch(() => {});
  }


  /**
   * Loads image to canvas
   * @param {Object} event
   * @returns {null} null
   */
  loadImage(event) {
    if (event.target.id === 'fileUpload') {
      imageContext = this.inputElement.getContext('2d');
    } else {
      imageContext = this.editInputElement.getContext('2d');
    }
    const file = event.target.files[0];
    this.setState({ imageFile: file });
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      const img = new Image(300, 200);
      img.addEventListener('load', () => {
        imageContext.drawImage(img, 0, 0, 300, 200);
      });
      img.src = e.target.result;
    };
    try {
      fileReader.readAsDataURL(file);
    } catch (error) {
      throw error;
    }
  }

  /**
 * Handle chip change
 * @param {Array} chips
 * @returns {Object} new state
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
   * Handle adding of ingredient in edit mode
   * @param {String} chip
   * @returns {Object} new state
   */
  handleChipAdd(chip) {
    const { edit } = this.state;
    edit.ingredients = [...edit.ingredients, chip];
    this.setState({ edit });
  }

  /**
   * Handle deleting of ingredient in edit mode
   * @param {String} chip
   * @returns {Object} new state
   */
  handleChipDelete(chip) {
    const { edit } = this.state;
    edit.ingredients = edit.ingredients.filter(ingredient => ingredient !== chip);
    this.setState({ edit });
  }

  /**
   * Handle adding of ingredient in edit mode
   * @param {String} chip
   * @returns {Object} new state
   */
  handleAddModalChipAdd(chip) {
    const { data } = this.state;
    data.ingredients = [...data.ingredients, chip];
    this.setState({ data });
  }

  /**
   * Handle deleting of ingredient in edit mode
   * @param {String} chip
   * @returns {Object} new state
   */
  handleAddModalChipDelete(chip) {
    const { data } = this.state;
    data.ingredients = data.ingredients.filter(ingredient => ingredient !== chip);
    this.setState({ data });
  }

  /**
   * Handles input field value change
   * @param {Object} event
   * @returns {Object} new state
   */
  handleInputChange(event) {
    const name = this.state.data;
    name[event.target.id] = event.target.value;
    this.setState({ data: name });
  }

  /**
   * Handles input field value change
   * @param {Object} event
   * @returns {Object} new state
   */
  handleEditInputChange(event) {
    const name = this.state.edit;
    name[event.target.id] = event.target.value;
    this.setState({ edit: name });
  }

  /**
   * Component render method
   * @returns {Node} Page component
   */
  render() {
    return (
      <div>
        <Page
          isLoggedIn={this.props.isLoggedIn}
          firstName={this.props.firstName}
          userRecipes={this.props.userRecipes}
          onInputChange={this.handleInputChange}
          onEditInputChange={this.handleEditInputChange}
          inputValue={this.state.data.recipeName}
          descValue={this.state.data.recipeDescription}
          editData={this.state.edit}
          onClickSave={this.onClickSave}
          onFileChange={this.loadImage}
          inputRef={(el) => { this.inputElement = el; }}
          editInputRef={(el) => { this.editInputElement = el; }}
          onConfirmDelete={this.onConfirmDelete}
          getId={this.getId}
          getIdForEdit={this.getIdForEdit}
          defaultIngredients={this.state.data.ingredients}
          onClickEdit={this.onClickEdit}
          handleChipAdd={this.handleChipAdd}
          handleChipDelete={this.handleChipDelete}
          handleAddModalChipAdd={this.handleAddModalChipAdd}
          handleAddModalChipDelete={this.handleAddModalChipDelete}
          data={this.state.data}
        />
        <Loader
          loaded={this.state.loaded}
          lines={13}
          length={20}
          width={10}
          radius={30}
          corners={1}
          rotate={0}
          direction={1}
          color="#000"
          speed={1}
          trail={60}
          shadow={false}
          hwaccel={false}
          className="spinner"
          zIndex={2e9}
          top="50%"
          left="50%"
          scale={1.00}
          loadedClassName="loadedContent"
        />
      </div>
    );
  }
}

UserRecipes.propTypes = propTypes;
UserRecipes.defaultProps = defaultProps;

/**
 * Maps state to component properties
 * @param {Object} state
 * @returns {object} object
 */
function mapStateToProps(state) {
  return {
    isLoggedIn: state.session.authenticated,
    firstName: state.session.user.firstName,
    userRecipes: state.userRecipes
  };
}

/**
 * Maps actions to component properties
 * @param {func} dispatch
 * @returns {Object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
