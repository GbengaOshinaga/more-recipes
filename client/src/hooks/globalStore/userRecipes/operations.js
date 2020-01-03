import { api, logger } from '../../../utils';

const operations = actions => {
  const {
    setIsFetchingUserRecipes,
    saveUserRecipes,
    setIsCreatingRecipe,
    saveRecipe,
    deleteRecipeOptimistically,
    deleteRecipeRevert
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
    setIsCreatingRecipe(true);
    const { uploadedImage, ingredients, ...values } = data;
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
      setIsCreatingRecipe(false);
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

  return {
    fetchUserRecipes,
    createRecipe,
    deleteRecipe
  };
};

export default operations;
