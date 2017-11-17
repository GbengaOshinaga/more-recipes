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
    this.addVote(1, 'upvotes', 'downvotes', 'upvoted', req, res);
  }

  /**
   * Adds a downvote to a recipe
   * @param {*} req
   * @param {*} res
   * @returns {*} res
   */
  static addDownvote(req, res) {
    this.addVote(0, 'downvotes', 'upvotes', 'downvoted', req, res);
  }

  /**
   * Method for adding vote
   * Users are allowed to vote more than once, if and only if their previous vote is
   * different from the next one, for example, a user can only upvote once, but a user
   * can downvote after already upvoting, and vice versa
   * @param {*} valueOfVote
   * @param {*} typeOfVote
   * @param {*} otherTypeOfVote
   * @param {*} message
   * @param {*} req
   * @param {*} res
   * @returns {*} res
   */
  static addVote(valueOfVote, typeOfVote, otherTypeOfVote, message, req, res) {
    db.Votes.findOne({
      where: {
        UserId: req.user.userId,
        RecipeId: req.params.id,
      }
    })
      .then((vote) => {
        // If user has voted already and the value of the vote is the same as the requested one
        if (vote && vote.vote === valueOfVote) {
          return res.status(400).jsend.fail({ message: `Recipe has already been ${message} by user` });
        } else if (vote && vote.vote !== valueOfVote) {
          // If vote is different from previous vote, delete previous vote, and create present one
          vote.destroy({ force: true });
          db.Votes.create({
            UserId: req.user.userId,
            RecipeId: req.params.id,
            vote: valueOfVote
          });
          // Find recipe user voted for, decrement the value of the previous vote, and increment
          // the present one
          db.Recipes.findById(req.params.id)
            .then((recipe) => {
              recipe.decrement(`${otherTypeOfVote}`);
              recipe.increment(`${typeOfVote}`)
                .then(res.status(200).jsend.success(`Recipe ${message}`))
                .catch(error => res.status(400).jsend.error(error));
            })
            .catch(error => res.status(400).jsend.error(error));
        } else {
          // If user has not voted at all, then create the vote
          db.Votes.create({
            UserId: req.user.userId,
            RecipeId: req.params.id,
            vote: valueOfVote
          })
            .then(() => {
              db.Recipes.findById(req.params.id)
                .then((recipe) => {
                  recipe.increment(`${typeOfVote}`)
                    .then(res.status(200).jsend.success(`Recipe ${message}`))
                    .catch(error => res.status(400).jsend.error(error));
                });
            })
            .catch(error => res.status(400).jsend.error(error));
        }
      })
      .catch(error => res.status(400).jsend.error(error));
  }
}
