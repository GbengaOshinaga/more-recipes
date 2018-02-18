import db from '../models/index';

/**
 * VotesController class
 */
export default class VotesController {
  /**
     * Adds an upvote to a recipe
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} res
     */
  static addUpvote(req, res) {
    this.addVote(1, 'upvotes', 'downvotes', 'upvoted', req, res);
  }

  /**
   * Adds a downvote to a recipe
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res
   */
  static addDownvote(req, res) {
    this.addVote(0, 'downvotes', 'upvotes', 'downvoted', req, res);
  }

  /**
   * Method for adding vote
   * Users are allowed to vote more than once, if and only if their previous vote is
   * different from the next one, for example, a user can only upvote once, but a user
   * can downvote after already upvoting, and vice versa
   * @param {Number} valueOfVote
   * @param {String} typeOfVote
   * @param {String} otherTypeOfVote
   * @param {String} message
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res
   */
  static addVote(valueOfVote, typeOfVote, otherTypeOfVote, message, req, res) {
    db.Votes.findOne({
      where: {
        UserId: req.user.userId,
        RecipeId: req.params.id,
      }
    })
      .then((vote) => {
        // If user has voted already and the value of the vote
        // is the same as the requested one, remove the vote
        if (vote && vote.vote === valueOfVote) {
          vote.destroy()
            .then(() => {
              db.Recipes.findById(req.params.id)
                .then((recipe) => {
                  if (typeOfVote === 'upvotes') {
                    const newUpvotesArray = [...recipe.upvotes.filter(id => id !== req.user.userId)];
                    recipe.update({
                      upvotes: newUpvotesArray
                    });
                  } else {
                    recipe.update({
                      downvotes: [...recipe.downvotes.filter(id => id !== req.user.userId)]
                    });
                  }
                  return res.status(200).jsend.success({ recipe, message: `Your ${typeOfVote.slice(0, typeOfVote.length - 1)} has been cancelled` });
                });
            })
            .catch(error => res.status(400).jsend.fail(error));
        } else if (vote && vote.vote !== valueOfVote) {
          // If vote is different from previous vote, delete previous vote, and create present one
          vote.destroy();
          db.Votes.create({
            UserId: req.user.userId,
            RecipeId: req.params.id,
            vote: valueOfVote
          });
          // Find recipe user voted for, decrement the value of the previous vote, and increment
          // the present one
          db.Recipes.findById(req.params.id)
            .then((recipe) => {
              if (typeOfVote === 'upvotes') {
                recipe.update({
                  upvotes: [...recipe.upvotes, req.user.userId]
                })
                  .then(() => {
                    recipe.update({
                      downvotes: [...recipe.downvotes.filter(id => id !== req.user.userId)]
                    })
                      .then(() => res.status(200).jsend.success({ recipe, message: `Recipe ${message}` }))
                      .catch(error => res.status(400).jsend.error(error));
                  });
              } else {
                recipe.update({
                  downvotes: [...recipe.downvotes, req.user.userId]
                })
                  .then(() => {
                    recipe.update({
                      upvotes: [...recipe.upvotes.filter(id => id !== req.user.userId)]
                    })
                      .then(() => res.status(200).jsend.success({ recipe, message: `Recipe ${message}` }))
                      .catch(error => res.status(400).jsend.error(error));
                  });
              }
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
                  if (typeOfVote === 'upvotes') {
                    recipe.update({
                      upvotes: [...recipe.upvotes, req.user.userId]
                    })
                      .then(res.status(200).jsend.success({ recipe, message: `Recipe ${message}` }))
                      .catch(error => res.status(400).jsend.error(error));
                  } else {
                    recipe.update({
                      downvotes: [...recipe.downvotes, req.user.userId]
                    })
                      .then(res.status(200).jsend.success({ recipe, message: `Recipe ${message}` }))
                      .catch(error => res.status(400).jsend.error(error));
                  }
                });
            })
            .catch(error => res.status(400).jsend.error(error));
        }
      })
      .catch(error => res.status(400).jsend.error(error));
  }
}
