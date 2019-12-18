import db from '../models/index';
import { getPaginationMeta, tryCatch, ControllerError } from '../utils';

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

  tryCatch(res, async () => {
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
  });
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

  tryCatch(res, async () => {
    const reviews = await Reviews.findAll({
      where: condition,
      include: [{ model: User, attributes: { exclude: ['password'] } }],
      offset: from,
      limit
    });

    const paginationMeta = await getPaginationMeta(req, db.Reviews, condition);
    return res.successResponse({ reviews, paginationMeta });
  });
};

/**
 * Gets a single review and checks authorization and existence
 * @param {Number} reviewId
 * @param {Number} userId
 * @param {String} action: edit or delete
 *
 * @returns {Object} recipe
 */
const getAndValidateReview = async (reviewId, userId, action) => {
  const review = await Reviews.findById(reviewId);

  if (!review) {
    throw new ControllerError(404, 'Review with specified id does not exist');
  }
  if (review.UserId !== userId) {
    throw new ControllerError(
      401,
      `You are not authorized to ${action} this review`
    );
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

  tryCatch(res, async () => {
    const review = await getAndValidateReview(id, userId, 'edit');
    const updatedReview = await review.update({
      review: reviewBody || review.review
    });
    return res.successResponse({ updatedReview });
  });
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

  tryCatch(res, async () => {
    const review = await getAndValidateReview(id, userId, 'delete');
    await review.destroy();

    return res.successResponse({
      message: 'Review has been successfully deleted'
    });
  });
};
