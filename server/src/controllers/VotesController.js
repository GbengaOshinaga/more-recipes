import db from '../models/index';

/**
 * VotesController class
 */
export default class VotesController {
  /**
     * Adds an upvote to a recipe
     * @param {*} req
     * @param {*} res
     * @returns {*} res
     */
  static addUpvote(req, res) {
    db.Votes.findOrCreate({
      where: {
        UserId: req.user.userId,
        RecipeId: req.params.id
      },
      defaults: { vote: 1 }
    })
      .then((vote) => {
        if (!vote[1]) {
          return res.status(400).jsend.fail({ message: 'Recipe has already been upvoted by user' });
        }
        db.Recipes.findById(req.params.id)
          .then((recipe) => {
            recipe.increment('upvotes')
              .then(res.status(200).jsend.success('Recipe upvoted'))
              .catch(error => res.status(400).jsend.error(error));
          });
      })
      .catch(error => res.status(400).jsend.error(error));
  }

  /**
   * Adds a downvote to a recipe
   * @param {*} req
   * @param {*} res
   * @returns {*} res
   */
  static addDownvote(req, res) {

  }

  /**
   * Gets recipes with the most upvotes
   * @param {*} req
   * @param {*} res
   * @returns {*} res
   */
  static getRecipesByVotes(req, res) {

  }
}
