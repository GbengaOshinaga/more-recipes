import { api, logger } from '../../../utils';

const operations = actions => {
  const {
    setIsFetchingUserRecipes,
    saveUserRecipes,
    setIsLoading,
    saveRecipe,
    deleteRecipeOptimistically,
    deleteRecipeRevert,
    editRecipe: editRecipeAction
  } = actions;

  const fetchUserRecipes = async () => {
    setIsFetchingUserRecipes(true);
    try {
      const response = await api.getUserRecipes();
      logger('User Recipes', response);
      saveUserRecipes(response?.data?.recipes);
    } catch (error) {
      logger('User Recipes Error', await error);
    } finally {
      setIsFetchingUserRecipes(false);
    }
  };

  const createRecipe = async (data, onSuccess) => {
    setIsLoading(true);
    const { uploadedImage, ingredients, image, ...values } = data;
    let imageUploadResponse;
    try {
      if (uploadedImage instanceof File) {
        imageUploadResponse = await api.uploadImage(uploadedImage);
      }

      const recipeData = { ingredients: ingredients.join(','), ...values };

      if (imageUploadResponse) {
        const { secure_url: secureUrl } = imageUploadResponse;
        recipeData.image = secureUrl;
      }

      logger('recipeData', recipeData);
      const response = await api.createRecipe(recipeData);
      logger('Create recipe', response);
      saveRecipe(response?.data?.recipe);
      onSuccess?.();
    } catch (error) {
      logger('Create recipe error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRecipe = async recipeId => {
    deleteRecipeOptimistically(recipeId);
    try {
      await api.deleteRecipe(recipeId);
    } catch (error) {
      logger('delete recipe error', await error);
      deleteRecipeRevert(recipeId);
    }
  };

  const editRecipe = async (data, recipeId, onSuccess) => {
    setIsLoading(true);
    const { uploadedImage, ingredients, image, ...values } = data;
    let imageUploadResponse;
    try {
      if (uploadedImage instanceof File) {
        imageUploadResponse = await api.uploadImage(uploadedImage);
      }

      const recipeData = { ...values };
      if (ingredients) {
        recipeData.ingredients = ingredients.join(',');
      }

      if (imageUploadResponse) {
        const { secure_url: secureUrl } = imageUploadResponse;
        recipeData.image = secureUrl;
      }

      logger('recipeData', recipeData);
      const response = await api.editRecipe(recipeData, recipeId);
      logger('Edit recipe', response);
      editRecipeAction(response?.data?.updatedRecipe);
      onSuccess?.();
    } catch (error) {
      logger('Edit recipe error', await error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchUserRecipes,
    createRecipe,
    deleteRecipe,
    editRecipe
  };
};

export default operations;
