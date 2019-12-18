import db from '../models/index';
import { getPaginationMeta, getErrorResponse } from '../utils';

const { Recipes, Sequelize, User } = db;

/*
  |--------------------------------------------------------------------------
  | Add a recipe controller
  |--------------------------------------------------------------------------
*/
export const addRecipe = async (req, res) => {
  const {
    user: { userId } = {},
    body: { ingredients = [], name, description, image }
  } = req;

  let ingredientsArray = ingredients;
  if (typeof ingredients === 'string') {
    ingredientsArray = ingredients.split(',');
  }

  try {
    const existingRecipe = await Recipes.findOne({
      where: {
        UserId: req.user.userId,
        name: req.body.name
      }
    });
    if (existingRecipe) {
      return res.failResponse({
        message: 'You have already created a recipe with this name'
      });
    }

    const recipe = await Recipes.create({
      name,
      description,
      UserId: userId,
      image,
      ingredients: ingredientsArray
    });
    return res.successResponse({ recipe }, 201);
  } catch (error) {
    return res.errorResponse(getErrorResponse(error));
  }
};

/*
  |--------------------------------------------------------------------------
  | Searches for recipes using the passed in query. Used by get all recipes
  | controller.
  |--------------------------------------------------------------------------
*/
const searchRecipes = async (query, req, res) => {
  const { op } = Sequelize;
  const condition = {
    [op.or]: {
      name: {
        [op.iLike]: `%${query}%`
      },
      description: {
        [op.iLike]: `%${query}%`
      },
      ingredients: {
        [op.contains]: [`${query}`]
      }
    }
  };

  try {
    const recipes = await Recipes.findAll({
      where: condition,
      group: 'id',
      order: db.sequelize.literal('max(id) ASC'),
      offset: req.query.from,
      limit: req.query.limit
    });
    if (recipes.length === 0) {
      return res.failResponse({ message: 'No Results Found' }, 404);
    }
    const paginationMeta = await getPaginationMeta(req, Recipes, condition);
    return res.successResponse({ recipes, paginationMeta });
  } catch (error) {
    return res.errorResponse(getErrorResponse(error));
  }
};

const getUserFavouriteRecipesIds = async userId => {
  const user = await User.findById(userId);
  const favouritesId = await user.getFavouriteRecipes({ attributes: ['id'] });

  return favouritesId;
};

/*
  |--------------------------------------------------------------------------
  | Get recipes controller
  |--------------------------------------------------------------------------
*/
export const getRecipes = async (req, res) => {
  const {
    query: { sort, order, from, limit, query },
    user: { userId } = {}
  } = req;

  const getAllRecipes = async sequelizeLiteral => {
    const recipes = await Recipes.findAll({
      group: 'id',
      order: db.sequelize.literal(sequelizeLiteral),
      offset: from,
      limit
    });
    const paginationMeta = await getPaginationMeta(req, Recipes);

    const response = { recipes, paginationMeta };

    let favourites;
    if (userId) {
      favourites = await getUserFavouriteRecipesIds(userId);
      response.favourites = favourites;
    }

    return res.successResponse(response);
  };

  try {
    if (sort && order) {
      return getAllRecipes(`max(${sort}) ${order.toUpperCase()}`);
    }

    if (query) {
      return searchRecipes(query, req, res);
    }

    return getAllRecipes('max(id) DESC');
  } catch (error) {
    return res.errorResponse(getErrorResponse(error));
  }
};

/*
  |--------------------------------------------------------------------------
  | Get a single recipe using an id controller
  |--------------------------------------------------------------------------
*/
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) {
      return res.failResponse({
        message: 'Recipe with specified id does not exist'
      });
    }
    return res.sucessResponse({ recipe });
  } catch (error) {
    return res.errorResponse(getErrorResponse(error));
  }
};

/**
 * Gets a single recipe and checks authorization and existence
 * @param {Number} recipeId
 * @param {Number} userId
 *
 * @returns {Object} recipe
 */
const getAndValidateRecipe = async (recipeId, userId) => {
  const recipe = await Recipes.findById(recipeId);

  if (!recipe) {
    throw new Error({
      message: 'Recipe with specified id does not exist'
    });
  }
  if (recipe.UserId !== userId) {
    throw new Error({
      message: 'You are not authorized to edit this recipe'
    });
  }

  return recipe;
};

/*
  |--------------------------------------------------------------------------
  | Edit a recipe controller
  |--------------------------------------------------------------------------
*/
export const editRecipe = async (req, res) => {
  const {
    user: { userId } = {},
    body: { ingredients = [], name, description, image },
    params: { id }
  } = req;

  let ingredientsArray = ingredients;
  if (typeof ingredients === 'string') {
    ingredientsArray = ingredients.split(',');
  }

  try {
    const recipe = await getAndValidateRecipe(id, userId);

    const updatedRecipe = await recipe.update({
      name: name || recipe.name,
      description: description || recipe.description,
      userId,
      image: image || recipe.image,
      ingredients: ingredientsArray || recipe.ingredients
    });
    return res.successResponse({ updatedRecipe });
  } catch (error) {
    return res.errorResponse(getErrorResponse(error));
  }
};

/*
  |--------------------------------------------------------------------------
  | Delete a recipe controller
  |--------------------------------------------------------------------------
*/
export const deleteRecipe = async (req, res) => {
  const {
    user: { userId } = {},
    params: { id }
  } = req;
  try {
    const recipe = await getAndValidateRecipe(id, userId);
    await recipe.destroy({ force: true });

    return res.sucessResponse({
      message: 'Recipe has been successfully deleted'
    });
  } catch (error) {
    return res.errorResponse(getErrorResponse(error));
  }
};
