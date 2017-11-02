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
    db.favouriteRecipes.create({
      dateCreated: new Date(),
      userId: req.user.userId,
      recipesId: req.params.id
    })
      .then(fav => res.status(200).jsend.success(fav))
      .catch(error => res.status(400).jsend.fail(error));
  }

  /**
     * Method gets the favourite recipes for a user
     * @param {*} req
     * @param {*} res
     * @returns {*} res
     */
  getFavourites(req, res) {
  }
}
