import { body, query } from 'express-validator';

export const getRecipeValidation = () => [
  body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Recipe Name is required')
    .escape(),
  body('description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Recipe description is required')
    .escape(),
  body('ingredients')
    .not()
    .isEmpty()
    .withMessage('Ingredients are required')
    .escape()
];

export const getReviewValidation = () => [
  body('review')
    .not()
    .isEmpty()
    .withMessage('Review is required')
    .escape()
];

export const getParamsValidation = () => [
  query('sort')
    .if(query('order').exists())
    .notEmpty()
    .withMessage('sort parameter is required if order parameter is passed'),
  query('order')
    .if(query('sort').exists())
    .notEmpty()
    .withMessage('sort parameter is required if order parameter is passed'),
  query()
    .if(
      query('sort')
        .exists()
        .isString()
    )
    .if(
      query('order')
        .exists()
        .isString()
    )
    .custom(({ sort, order }) => {
      if (
        sort.toLowerCase() !== 'upvotes' ||
        sort.toLowerCase() !== 'downvotes'
      ) {
        throw new Error('sort parameter must be upvotes or downvotes');
      }

      if (order.toLowerCase() !== 'asc' || order.toLowerCase() !== 'desc') {
        throw new Error('order parameter must be asc or desc');
      }

      return true;
    }),
  query('from')
    .optional()
    .isNumeric({ no_symbols: true })
    .withMessage('from parameter must be a number'),
  query('limit')
    .optional()
    .isNumeric({ no_symbols: true })
    .withMessage('limit parameter must be a number')
];
