// import React from 'react';
// import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { sessionService } from 'redux-react-session';
// import toastr from 'toastr';
// import Loader from 'react-loader';
// import Page from './UserRecipesPage';
// import * as userActions from '../../actions/userActions';

// const propTypes = {
//   isLoggedIn: PropTypes.bool.isRequired,
//   firstName: PropTypes.string,
//   userRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
//   actions: PropTypes.objectOf(PropTypes.func).isRequired
// };

// const defaultProps = {
//   firstName: ''
// };

// const defaultImage =
//   'https://res.cloudinary.com/king-more-recipes/image/upload/v1518028470/10546i3DAC5A5993C8BC8C_vtqogc.jpg';
// let imageContext;

// /**
//  * Class component for user recipes actions
//  */
// class UserRecipes extends React.Component {
//   /**
//    * Component constructor
//    * @param {Object} props
//    * @param {Object} context
//    */
//   constructor(props, context) {
//     super(props, context);
//     this.state = {
//       data: {
//         id: 0,
//         name: '',
//         description: '',
//         ingredients: [],
//         image: ''
//       },
//       deleteId: 0,
//       edit: {
//         id: 0,
//         name: '',
//         description: '',
//         ingredients: [],
//         image: ''
//       },
//       imageFile: {},
//       loaded: true,
//       isFound: true
//     };
//     toastr.options = {
//       closeButton: true,
//       positionClass: 'toast-top-right'
//     };
//   }

//   /**
//    * Method when component has finished mounting
//    *
//    * @returns {undefined}
//    */
//   componentDidMount() {
//     sessionService.loadSession().then(token => {
//       this.props.actions.getUserRecipes(token).catch(() => {
//         this.setState({ isFound: false });
//       });
//     });
//   }

//   /**
//    * Handle save event
//    * @param {Object} event
//    *
//    * @returns {undefined}
//    */
//   onClickSave = event => {
//     event.preventDefault();
//     this.setState({ loaded: false });
//     if (!(this.state.imageFile instanceof File)) {
//       const { data } = this.state;
//       data.image = defaultImage;
//       this.setState({ data }, () => {
//         this.saveRecipe(this.state.data);
//       });
//       this.setState({ loaded: true });
//     } else {
//       userActions.uploadImage(this.state.imageFile).then(response => {
//         const { data } = this.state;
//         data.image = response.secure_url;
//         this.setState({ data }, () => {
//           this.saveRecipe();
//         });
//         this.setState({ loaded: true, isFound: true });
//       });
//     }
//   };

//   /**
//    * Handle edit
//    * @param {Object} event
//    *
//    * @returns {undefined}
//    */
//   onClickEdit = event => {
//     event.preventDefault();
//     this.setState({ loaded: false });
//     if (!(this.state.imageFile instanceof File)) {
//       this.editRecipe();
//       this.setState({ loaded: true });
//     } else {
//       userActions.uploadImage(this.state.imageFile).then(response => {
//         const { edit } = this.state;
//         edit.image = response.secure_url;
//         this.setState({ edit }, () => {
//           this.editRecipe();
//         });
//       });
//       this.setState({ loaded: true });
//     }
//   };

//   /**
//    * Method to delete recipe
//    * @param {Object} event
//    *
//    * @returns {undefined}
//    */
//   onConfirmDelete = event => {
//     event.preventDefault();
//     sessionService
//       .loadSession()
//       .then(token => {
//         this.props.actions.deleteRecipe(token, this.state.deleteId);
//       })
//       .then(toastr.success('Recipe successfully deleted'));
//   };

//   /**
//    * Get id of recipe
//    * @param {Object} event
//    *
//    * @returns {undefined}
//    */
//   getId = event => {
//     event.preventDefault();
//     this.setState({ deleteId: event.target.id });
//   };

//   /**
//    * Get id of recipe for edit
//    * @param {Object} event
//    *
//    * @returns {undefined}
//    */
//   getIdForEdit = event => {
//     const recipeForEdit = [
//       ...this.props.userRecipes.filter(
//         recipe => recipe.id === Number(event.target.id)
//       )
//     ];
//     this.setState({
//       edit: {
//         id: recipeForEdit[0].id,
//         name: recipeForEdit[0].name,
//         description: recipeForEdit[0].description,
//         ingredients: [...recipeForEdit[0].ingredients],
//         image: recipeForEdit[0].image
//       }
//     });
//     const img = new Image(300, 200);
//     img.src = recipeForEdit[0].image;
//     imageContext = this.editInputElement.getContext('2d');
//     imageContext.drawImage(img, 0, 0, 300, 200);
//   };

//   /**
//    * Save recipe
//    * @param {Object} data
//    *
//    * @returns {undefined}
//    */
//   saveRecipe = () => {
//     if (this.state.data.name.length > 255) {
//       return toastr.error('Recipe name is too long');
//     }
//     sessionService
//       .loadSession()
//       .then(token => {
//         this.props.actions
//           .addRecipe(token, this.state.data)
//           .then(() => {
//             toastr.success('Recipe Added');
//             this.setState({
//               data: {
//                 id: 0,
//                 name: '',
//                 description: '',
//                 ingredients: [],
//                 image: ''
//               },
//               imageFile: {}
//             });
//             if (imageContext) {
//               imageContext.clearRect(0, 0, 300, 200);
//             }
//           })
//           .catch(errors => {
//             if (Array.isArray(errors)) {
//               errors.map(error => toastr.error(error));
//             } else {
//               toastr.error(errors);
//             }
//           });
//       })
//       .catch(() => {});
//   };

//   /**
//    * Edits recipe
//    *
//    * @returns {undefined}
//    */
//   editRecipe = () => {
//     if (this.state.edit.name.length > 255) {
//       return toastr.error('Recipe Name is too long');
//     }
//     sessionService
//       .loadSession()
//       .then(token => {
//         this.props.actions
//           .editRecipe(token, this.state.edit.id, this.state.edit)
//           .then(() => {
//             toastr.success('Recipe modified successfully');
//             this.setState({
//               edit: {
//                 id: 0,
//                 name: '',
//                 description: '',
//                 ingredients: [],
//                 image: ''
//               },
//               imageFile: {}
//             });
//             imageContext.clearRect(0, 0, 300, 200);
//           })
//           .catch(error => toastr.error(error));
//       })
//       .catch(() => {});
//   };

//   /**
//    * Loads image to canvas
//    * @param {Object} event
//    *
//    * @returns {undefined}
//    */
//   loadImage = event => {
//     if (event.target.id === 'fileUpload') {
//       imageContext = this.inputElement.getContext('2d');
//     } else {
//       imageContext = this.editInputElement.getContext('2d');
//     }
//     const file = event.target.files[0];
//     this.setState({ imageFile: file });
//     const fileReader = new FileReader();
//     fileReader.onload = function(e) {
//       const img = new Image(300, 200);
//       img.addEventListener('load', () => {
//         imageContext.drawImage(img, 0, 0, 300, 200);
//       });
//       img.src = e.target.result;
//     };
//     try {
//       fileReader.readAsDataURL(file);
//     } catch (error) {
//       throw error;
//     }
//   };

//   /**
//    * Handle adding of ingredient in edit mode
//    * @param {String} chip
//    *
//    * @returns {undefined}
//    */
//   handleChipAdd = chip => {
//     const { edit } = this.state;
//     edit.ingredients = [...edit.ingredients, chip];
//     this.setState({ edit });
//   };

//   /**
//    * Handle deleting of ingredient in edit mode
//    * @param {String} chip
//    *
//    * @returns {undefined}
//    */
//   handleChipDelete = chip => {
//     const { edit } = this.state;
//     edit.ingredients = edit.ingredients.filter(
//       ingredient => ingredient !== chip
//     );
//     this.setState({ edit });
//   };

//   /**
//    * Handle adding of ingredient in add mode
//    * @param {String} chip
//    *
//    * @returns {undefined}
//    */
//   handleAddModalChipAdd = chip => {
//     const { data } = this.state;
//     data.ingredients = [...data.ingredients, chip];
//     this.setState({ data });
//   };

//   /**
//    * Handle deleting of ingredient in add mode
//    * @param {String} chip
//    *
//    * @returns {undefined}
//    */
//   handleAddModalChipDelete = chip => {
//     const { data } = this.state;
//     data.ingredients = data.ingredients.filter(
//       ingredient => ingredient !== chip
//     );
//     this.setState({ data });
//   };

//   /**
//    * Handles input field value change
//    * @param {Object} event
//    *
//    * @returns {undefined}
//    */
//   handleInputChange = event => {
//     const name = this.state.data;
//     name[event.target.id] = event.target.value;
//     this.setState({ data: name });
//   };

//   /**
//    * Handles input field value change
//    * @param {Object} event
//    *
//    * @returns {undefined}
//    */
//   handleEditInputChange = event => {
//     const name = this.state.edit;
//     name[event.target.id] = event.target.value;
//     this.setState({ edit: name });
//   };

//   /**
//    * Component render method
//    *
//    * @returns {Node} Page component
//    */
//   render() {
//     return (
//       <div>
//         <Page
//           isLoggedIn={this.props.isLoggedIn}
//           firstName={this.props.firstName}
//           userRecipes={this.props.userRecipes}
//           onInputChange={this.handleInputChange}
//           onEditInputChange={this.handleEditInputChange}
//           inputValue={this.state.data.name}
//           descValue={this.state.data.description}
//           editData={this.state.edit}
//           onClickSave={this.onClickSave}
//           onFileChange={this.loadImage}
//           inputRef={el => {
//             this.inputElement = el;
//           }}
//           editInputRef={el => {
//             this.editInputElement = el;
//           }}
//           onConfirmDelete={this.onConfirmDelete}
//           getId={this.getId}
//           getIdForEdit={this.getIdForEdit}
//           defaultIngredients={this.state.data.ingredients}
//           onClickEdit={this.onClickEdit}
//           handleChipAdd={this.handleChipAdd}
//           handleChipDelete={this.handleChipDelete}
//           handleAddModalChipAdd={this.handleAddModalChipAdd}
//           handleAddModalChipDelete={this.handleAddModalChipDelete}
//           data={this.state.data}
//           isFound={this.state.isFound}
//         />
//         <Loader
//           loaded={this.state.loaded}
//           lines={13}
//           length={20}
//           width={10}
//           radius={30}
//           corners={1}
//           rotate={0}
//           direction={1}
//           color="#000"
//           speed={1}
//           trail={60}
//           shadow={false}
//           hwaccel={false}
//           className="spinner"
//           zIndex={2e9}
//           top="50%"
//           left="50%"
//           scale={1.0}
//           loadedClassName="loadedContent"
//         />
//       </div>
//     );
//   }
// }

// UserRecipes.propTypes = propTypes;
// UserRecipes.defaultProps = defaultProps;

// /**
//  * Maps state to component properties
//  * @param {Object} state
//  *
//  * @returns {object} props
//  */
// function mapStateToProps(state) {
//   return {
//     isLoggedIn: state.session.authenticated,
//     firstName: state.session.user.firstName,
//     userRecipes: state.userRecipes
//   };
// }

// /**
//  * Maps actions to component properties
//  * @param {func} dispatch
//  * @returns {Object} actions
//  */
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(userActions, dispatch)
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);

import React, { useEffect, useState } from 'react';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavBar from '../common/NavBar';
import RecipesDisplay from '../common/RecipesDisplay';
import {
  useStoreContext,
  getIsFetchingUserRecipes,
  getUserRecipes
} from '../../hooks/globalStore';
import useAlertDialog from '../../hooks/useAlertDialog';
import useModalForm from './useModalForm';

const initialValues = {
  name: '',
  description: '',
  ingredients: [],
  image: '',
  uploadedImage: {}
};

const UserRecipes = () => {
  const [currentRecipeId, setCurrentRecipeId] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [isEditing, setIsEditing] = useState(false);
  const {
    fetchUserRecipes,
    userRecipes,
    createRecipe,
    deleteRecipe
  } = useStoreContext();
  const { openDialog, closeDialog, renderAlertDialog } = useAlertDialog();
  const { openModal, renderModalForm, clearForm } = useModalForm();

  const isFetching = getIsFetchingUserRecipes(userRecipes);
  const recipes = getUserRecipes(userRecipes);

  useEffect(() => {
    if (!recipes.length) {
      fetchUserRecipes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchUserRecipes]);

  const onClickEdit = recipeId => {
    setCurrentRecipeId(recipeId);
    const { name, description, ingredients, image } =
      recipes.find(r => r.id === recipeId) || {};
    const editValues = {
      name,
      description,
      ingredients,
      image,
      uploadedImage: {}
    };
    setValues(editValues);
    setIsEditing(true);
    openModal();
  };

  const onClickAdd = () => {
    setValues(initialValues);
    setIsEditing(false);
    clearForm();
    openModal();
  };

  const onSubmitCreate = (formValues, { resetForm }) => {
    createRecipe(formValues, resetForm);
  };

  const onSubmitEdit = () => {};

  const onDelete = () => {
    deleteRecipe(currentRecipeId);
    closeDialog();
  };

  const onDeleteClick = recipeId => {
    setCurrentRecipeId(recipeId);
    openDialog();
  };

  const renderActions = recipe => {
    return (
      <CardActions disableSpacing>
        <IconButton
          aria-label="edit recipe"
          onClick={() => onClickEdit(recipe.id)}
        >
          <Edit />
        </IconButton>
        <IconButton
          aria-label="delete recipe"
          onClick={() => onDeleteClick(recipe.id)}
        >
          <Delete />
        </IconButton>
      </CardActions>
    );
  };

  return (
    <div>
      <NavBar />
      <Fab color="primary" aria-label="add-recipe" onClick={onClickAdd}>
        <AddIcon />
      </Fab>
      <RecipesDisplay
        isFetching={isFetching}
        recipes={recipes}
        renderActions={renderActions}
      />
      {renderAlertDialog('Delete this recipe?', onDelete)}
      {renderModalForm({
        title: isEditing ? 'Edit Recipe' : 'Create Recipe',
        initialValues: values,
        onSaveClick: isEditing ? onSubmitEdit : onSubmitCreate
      })}
    </div>
  );
};

export default UserRecipes;
