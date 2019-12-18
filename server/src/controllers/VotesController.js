import db from '../models/index';
import { tryCatch } from '../utils';

const { Votes, Recipes } = db;

const voteTypes = {
  UPVOTE: 'upvote',
  DOWNVOTE: 'downvote'
};

/**
 * Delete vote
 * @param {Object} params
 * @returns {Object} recipe
 */
const removeVote = async ({ vote, voteType, recipeId, userId }) => {
  await vote.destroy();

  const recipe = await Recipes.findById(recipeId);

  if (voteType === voteTypes.UPVOTE) {
    recipe.update({
      upvotes: [...recipe.upvotes.filter(id => id !== userId)]
    });
  } else {
    recipe.update({
      downvotes: [...recipe.downvotes.filter(id => id !== userId)]
    });
  }
  return recipe;
};

/**
 * Delete current vote and create another
 * @param {Object} params
 * @returns {Object} recipe
 */
const removeAndCreateVote = async ({
  vote,
  voteType,
  recipeId,
  userId,
  valueOfVote
}) => {
  await vote.destroy();
  await Votes.create({
    UserId: userId,
    RecipeId: recipeId,
    vote: valueOfVote
  });

  const recipe = await Recipes.findById(recipeId);
  if (voteType === voteTypes.UPVOTE) {
    await recipe.update({
      upvotes: [...recipe.upvotes, userId],
      downvotes: [...recipe.downvotes.filter(id => id !== userId)]
    });
  } else {
    await recipe.update({
      downvotes: [...recipe.downvotes, userId],
      upvotes: [...recipe.upvotes.filter(id => id !== userId)]
    });
  }

  return recipe;
};

/**
 * Create vote and update recipe
 * @param {Object} params
 * @returns {Object} recipe
 */
const createVote = async ({ voteType, recipeId, userId, valueOfVote }) => {
  await Votes.create({
    UserId: userId,
    RecipeId: recipeId,
    vote: valueOfVote
  });

  const recipe = await Recipes.findById(recipeId);
  if (voteType === voteTypes.UPVOTE) {
    await recipe.update({
      upvotes: [...recipe.upvotes, userId]
    });
  } else {
    await recipe.update({
      downvotes: [...recipe.downvotes, userId]
    });
  }

  return recipe;
};

/**
 * Add vote logic
 * @param {Object} params
 * @returns {Object} res
 */
const addVote = async ({ req, res, valueOfVote, voteType }) => {
  const {
    user: { userId } = {},
    params: { id }
  } = req;

  tryCatch(res, async () => {
    const vote = await Votes.findOne({
      where: {
        UserId: userId,
        RecipeId: id
      }
    });
    if (vote?.vote === valueOfVote) {
      const recipe = await removeVote({ vote, voteType, recipeId: id, userId });
      return res.successResponse({
        recipe,
        message: `Your ${voteType} has been cancelled`
      });
    }

    if (vote && vote.vote !== valueOfVote) {
      const recipe = await removeAndCreateVote({
        vote,
        voteType,
        recipeId: id,
        userId,
        valueOfVote
      });
      return res.successResponse({ recipe, message: `Recipe ${voteType}d` });
    }

    const recipe = await createVote({
      voteType,
      recipeId: id,
      userId,
      valueOfVote
    });
    return res.successResponse({ recipe, message: `Recipe ${voteType}d` });
  });
};

/*
  |--------------------------------------------------------------------------
  | Add upvote controller
  |--------------------------------------------------------------------------
*/
export const addUpvote = async (req, res) => {
  await addVote({ req, res, valueOfVote: 1, voteType: voteTypes.UPVOTE });
};

/*
  |--------------------------------------------------------------------------
  | Add downvote controller
  |--------------------------------------------------------------------------
*/
export const addDownvote = async (req, res) => {
  await addVote({ req, res, valueOfVote: 0, voteType: voteTypes.DOWNVOTE });
};
