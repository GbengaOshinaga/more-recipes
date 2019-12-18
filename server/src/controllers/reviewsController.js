import db from '../models/index';
import { getPaginationMeta, getErrorResponse } from '../utils';

const { Reviews, User } = db;

/*
  |--------------------------------------------------------------------------
  | Add a review controller
  |--------------------------------------------------------------------------
*/
export const addReview = async (req, res) => {
  const {
    body: { review },
    user: { userId } = {},
    params: { id }
  } = req;

  try {
    const createdReview = await Reviews.create({
      review,
      UserId: userId,
      RecipeId: id
    });
    const reviewWithUserData = await Reviews.findById(createdReview.id, {
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] }
        }
      ]
    });
    return res.successResponse({ review: reviewWithUserData }, 201);
  } catch (error) {
    return res.errorResponse(getErrorResponse(error));
  }
};

/*
  |--------------------------------------------------------------------------
  | Get reviews controller
  |--------------------------------------------------------------------------
*/
export const getReviews = async (req, res) => {
  const {
    params: { id },
    query: { from, limit }
  } = req;

  const condition = { RecipeId: id };

  try {
    const reviews = await Reviews.findAll({
      where: condition,
      include: [{ model: User, attributes: { exclude: ['password'] } }],
      offset: from,
      limit
    });

    const paginationMeta = await getPaginationMeta(req, db.Reviews, condition);
    return res.sucessResponse({ reviews, paginationMeta });
  } catch (error) {
    return res.errorResponse(getErrorResponse(error));
  }
};

/**
 * Gets a single review and checks authorization and existence
 * @param {Number} reviewId
 * @param {Number} userId
 *
 * @returns {Object} recipe
 */
const getAndValidateReview = async (reviewId, userId) => {
  const review = await Reviews.findById(reviewId);

  if (!review) {
    throw new Error({
      message: 'Review with specified id does not exist'
    });
  }
  if (review.UserId !== userId) {
    throw new Error({
      message: 'You are not authorized to edit this review'
    });
  }

  return review;
};

/*
  |--------------------------------------------------------------------------
  | Edit review controller
  |--------------------------------------------------------------------------
*/
export const editReview = async (req, res) => {
  const {
    params: { id },
    user: { userId } = {},
    body: { review: reviewBody }
  } = req;

  try {
    const review = await getAndValidateReview(id, userId);
    const updatedReview = await review.update({
      review: reviewBody || review.review
    });
    return res.sucessResponse({ updatedReview });
  } catch (error) {
    return res.errorResponse(getErrorResponse(error));
  }
};

/*
  |--------------------------------------------------------------------------
  | Delete a review controller
  |--------------------------------------------------------------------------
*/
export const deleteReview = async (req, res) => {
  const {
    params: { id },
    user: { userId } = {}
  } = req;

  try {
    const review = await getAndValidateReview(id, userId);
    await review.destroy();

    return res.sucessResponse({
      message: 'Review has been successfully deleted'
    });
  } catch (error) {
    return res.errorResponse(getErrorResponse(error));
  }
};
