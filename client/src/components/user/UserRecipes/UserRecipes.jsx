import React, { useEffect, useState } from 'react';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NavBar from '../../common/NavBar';
import RecipesDisplay from '../../common/RecipesDisplay';
import {
  useStoreContext,
  getIsFetchingUserRecipes,
  getUserRecipes,
  getIsCreatingOrEditingRecipe
} from '../../../hooks/globalStore';
import useAlertDialog from '../../../hooks/useAlertDialog';
import useModalForm from './useModalForm';
import useStyles from './UserRecipesStyles';

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
    deleteRecipe,
    editRecipe
  } = useStoreContext();
  const { openDialog, closeDialog, renderAlertDialog } = useAlertDialog();
  const { openModal, renderModalForm, closeModal, clearForm } = useModalForm();
  const classes = useStyles();

  const isFetching = getIsFetchingUserRecipes(userRecipes);
  const recipes = getUserRecipes(userRecipes);
  const isLoading = getIsCreatingOrEditingRecipe(userRecipes);

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
    const onSuccess = () => {
      resetForm();
      closeModal();
    };
    createRecipe(formValues, onSuccess);
  };

  const onSubmitEdit = formValues => {
    const onSuccess = () => {
      setValues(initialValues);
      closeModal();
    };
    editRecipe(formValues, currentRecipeId, onSuccess);
  };

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
          <Edit color="secondary" />
        </IconButton>
        <IconButton
          aria-label="delete recipe"
          onClick={() => onDeleteClick(recipe.id)}
        >
          <Delete color="primary" />
        </IconButton>
      </CardActions>
    );
  };

  return (
    <div>
      <NavBar />
      <Grid container justify="center">
        <Box mt={3} mb={3}>
          <Typography variant="h4">My Recipes</Typography>
        </Box>
        <Fab
          color="primary"
          aria-label="add-recipe"
          onClick={onClickAdd}
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </Grid>
      <RecipesDisplay
        isFetching={isFetching}
        recipes={recipes}
        renderActions={renderActions}
      />
      {renderAlertDialog('Delete this recipe?', onDelete)}
      {renderModalForm({
        title: isEditing ? 'Edit Recipe' : 'Create Recipe',
        initialValues: values,
        onSaveClick: isEditing ? onSubmitEdit : onSubmitCreate,
        isLoading
      })}
    </div>
  );
};

export default UserRecipes;
