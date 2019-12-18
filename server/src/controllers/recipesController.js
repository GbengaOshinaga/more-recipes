import db from '../models/index';
import { getPaginationMeta, ControllerError, tryCatch } from '../utils';

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

  tryCatch(res, async () => {
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
  });
};

/*
  |--------------------------------------------------------------------------
  | Searches for recipes using the passed in query. Used by get all recipes
  | controller.
  |--------------------------------------------------------------------------
*/
const searchRecipes = async (query, req, res) => {
  const { Op } = Sequelize;
  const condition = {
    [Op.or]: {
      name: {
        [Op.iLike]: `%${query}%`
      },
      description: {
        [Op.iLike]: `%${query}%`
      },
      ingredients: {
        [Op.contains]: [`${query}`]
      }
    }
  };

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

  tryCatch(res, async () => {
    if (sort && order) {
      return getAllRecipes(`max(${sort}) ${order.toUpperCase()}`);
    }

    if (query) {
      return searchRecipes(query, req, res);
    }

    return getAllRecipes('max(id) DESC');
  });
};

/*
  |--------------------------------------------------------------------------
  | Get a single recipe using an id controller
  |--------------------------------------------------------------------------
*/
export const getRecipeById = (req, res) => {
  tryCatch(res, async () => {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) {
      return res.failResponse({
        message: 'Recipe with specified id does not exist'
      });
    }
    return res.successResponse({ recipe });
  });
};

/**
 * Gets a single recipe and checks authorization and existence
 * @param {Number} recipeId
 * @param {Number} userId
 * @param {String} currentAction: edit or delete
 *
 * @returns {Object} recipe
 * @throws {ControllerError}
 */
const getAndValidateRecipe = async (recipeId, userId, currentAction) => {
  const recipe = await Recipes.findById(recipeId);

  if (!recipe) {
    throw new ControllerError(404, 'Recipe with specified id does not exist');
  }
  if (recipe.UserId !== userId) {
    throw new ControllerError(
      401,
      `You are not authorized to ${currentAction} this recipe`
    );
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

  tryCatch(res, async () => {
    const recipe = await getAndValidateRecipe(id, userId, 'edit');

    const updatedRecipe = await recipe.update({
      name: name || recipe.name,
      description: description || recipe.description,
      userId,
      image: image || recipe.image,
      ingredients: ingredientsArray || recipe.ingredients
    });
    return res.successResponse({ updatedRecipe });
  });
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

  tryCatch(res, async () => {
    const recipe = await getAndValidateRecipe(id, userId, 'delete');
    await recipe.destroy({ force: true });

    return res.successResponse({
      message: 'Recipe has been successfully deleted'
    });
  });
};
