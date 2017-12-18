import db from '../models/index';

/**
 * Favourite recipes controller
 */
export default class FavouriteRecipesController {
  /**
     * Adds a favourite for a user
     * @param {*} req
     * @param {*} res
     * @returns {*} res
     */
  addFavourite(req, res) {
    let foundRecipe;
    db.Recipes.findById(req.params.id)
      .then((recipe) => {
        foundRecipe = recipe;
      });
    db.User.findById(req.user.userId)
      .then((user) => {
        user.addFavouriteRecipe(foundRecipe);
        return res.status(200).jsend.success({ message: 'Favourite added' });
      })
      .catch(error => res.status(400).jsend.error(error));
  }

  /**
     * Method gets the favourite recipes for a user
     * @param {*} req
     * @param {*} res
     * @returns {*} res
     */
  getFavourites(req, res) {
    db.User.findById(req.user.userId)
      .then((user) => {
        user.getFavouriteRecipes()
          .then((favourites) => {
            if (favourites.length === 0) {
              return res.status(404).jsend.fail({ message: 'No Favourites' });
            }
            res.status(200).jsend.success({ favourites })
          })
          .catch(error => res.status(400).jsend.fail(error));
      })
  }

  /**
   * Deletes a user favourite
   * @param {*} req
   * @param {*} res
   * @returns {*} res
   */
  deleteFavourites(req, res) {
    db.sequelize.query(`DELETE FROM "Favourites" WHERE "UserId" = ${req.user.userId} AND "RecipeId" IN (${req.params.id})`)
      .spread((results, metadata) => res.status(200).jsend.success({ message: 'Favourite deleted' }))
      .catch(error => res.status(400).jsend.fail(error));
  }
}
