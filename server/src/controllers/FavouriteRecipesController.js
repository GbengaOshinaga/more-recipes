import db from '../models/index';
import { getErrorResponse } from '../utils';

const {
  Recipes,
  User,
  sequelize: { query }
} = db;

/*
  |--------------------------------------------------------------------------
  | Add a favourite recipe controller
  |--------------------------------------------------------------------------
*/
export const addFavourite = async (req, res) => {
  const {
    params: { id },
    user: { userId } = {}
  } = req;
  try {
    const recipe = await Recipes.findById(id);
    const user = await User.findById(userId);

    await user.addFavouriteRecipe(recipe);

    return res.successResponse({ recipe, message: 'Favourite added' });
  } catch (error) {
    return res.errorResponse(getErrorResponse(error));
  }
};

/*
  |--------------------------------------------------------------------------
  | Get favourite recipes controller
  |--------------------------------------------------------------------------
*/
export const getFavouriteRecipes = async (req, res) => {
  const { user: { userId } = {} } = req;

  try {
    const user = await User.findById(userId);
    const favourites = await user.getFavouriteRecipes();

    if (favourites.length === 0) {
      return res.failResponse({ message: 'No Favourites' }, 404);
    }
    return res.successResponse({ favourites });
  } catch (error) {
    return res.errorResponse(getErrorResponse(error));
  }
};

/*
  |--------------------------------------------------------------------------
  | Delete favourite controller
  |--------------------------------------------------------------------------
*/
export const deleteFavourite = async (req, res) => {
  const {
    user: { userId } = {},
    params: { id }
  } = req;

  try {
    query(
      `DELETE FROM "Favourites" WHERE "UserId" = ${userId} AND "RecipeId" IN (${id})`
    ).spread(() => res.successResponse({ message: 'Favourite deleted' }));
  } catch (error) {
    return res.errorResponse(getErrorResponse(error));
  }
};

/*
  |--------------------------------------------------------------------------
  | Get most favourited recipes controller
  |--------------------------------------------------------------------------
*/
export const getMostFavourited = async (req, res) => {
  try {
    query(
      `SELECT "Recipes"."id", "Recipes"."name", "Recipes"."description",
      "Recipes"."ingredients", "Recipes"."image", "Recipes"."upvotes",
      "Recipes"."downvotes", "Recipes"."UserId", count(*) FROM "Favourites"
      LEFT OUTER JOIN "Recipes" ON "Favourites"."RecipeId" = "Recipes"."id"
      GROUP BY "Recipes"."name", "Recipes"."id"
      ORDER BY count(*) DESC`
    ).spread(results => res.successResponse({ recipes: results }));
  } catch (error) {
    return res.errorResponse(getErrorResponse(error));
  }
};
