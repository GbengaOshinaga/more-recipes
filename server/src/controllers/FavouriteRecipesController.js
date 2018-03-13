import db from '../models/index';

/**
 * Favourite recipes controller
 */
export default class FavouriteRecipesController {
  /**
     * Adds a favourite for a user
     * @param {Object} req
     * @param {Object} res
     *
     * @returns {Object} res
     */
  static addFavourite(req, res) {
    let foundRecipe;
    db.Recipes.findById(req.params.id)
      .then((recipe) => {
        foundRecipe = recipe;
      });
    db.User.findById(req.user.userId)
      .then((user) => {
        user.addFavouriteRecipe(foundRecipe);
        return res.status(200).jsend.success({
          recipe: foundRecipe,
          message: 'Favourite added'
        });
      })
      .catch(error => res.status(400).jsend.error(error));
  }

  /**
     * Method gets the favourite recipes for a user
     * @param {Object} req
     * @param {Object} res
     *
     * @returns {Object} res
     */
  static getFavourites(req, res) {
    db.User.findById(req.user.userId)
      .then((user) => {
        user.getFavouriteRecipes()
          .then((favourites) => {
            if (favourites.length === 0) {
              return res.status(404).jsend.fail({ message: 'No Favourites' });
            }
            res.status(200).jsend.success({ favourites });
          })
          .catch(error => res.status(400).jsend.fail(error));
      });
  }

  /**
   * Deletes a user favourite
     * @param {Object} req
     * @param {Object} res
     *
     * @returns {Object} res
     */
  static deleteFavourites(req, res) {
    db.sequelize.query(`DELETE FROM "Favourites" WHERE "UserId" = ${req.user.userId} AND "RecipeId" IN (${req.params.id})`)
      .spread(() => res.status(200).jsend.success({ message: 'Favourite deleted' }))
      .catch(error => res.status(400).jsend.fail(error));
  }

  /**
   * Get recipes by most favourited
     * @param {Object} req
     * @param {Object} res
     *
     * @returns {Object} res
     */
  static getMostFavourited(req, res) {
    db.sequelize.query(`SELECT "Recipes"."id", "Recipes"."name", "Recipes"."description",
    "Recipes"."ingredients", "Recipes"."image", "Recipes"."upvotes",
    "Recipes"."downvotes", "Recipes"."UserId", count(*) FROM "Favourites"
    LEFT OUTER JOIN "Recipes" ON "Favourites"."RecipeId" = "Recipes"."id"
    GROUP BY "Recipes"."name", "Recipes"."id"
    ORDER BY count(*) DESC`)
      .spread(results => res.status(200).jsend.success({ recipes: results }));
  }
}
