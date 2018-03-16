/* eslint-disable no-restricted-globals */
import validator from 'validator';

/**
 * Class for validating inputs
 */
export default class RecipeValidator {
  /**
   * Validates recipe passed
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   *
   * @returns {Object} res
   */
  static validateRecipe(req, res, next) {
    const messages = [];

    if (!req.body.name || validator.isEmpty(req.body.name.trim())) {
      messages.push('Recipe Name is required');
    }
    if (!req.body.description || validator.isEmpty(req.body.description.trim())) {
      messages.push('Recipe description is required');
    }
    if (!req.body.ingredients || req.body.ingredients.length === 0) {
      messages.push('Ingredients are required');
    }
    if (messages.length > 0) {
      return res.status(400).jsend.fail({ errors: messages });
    }
    next();
  }

  /**
   * Validates review
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   *
   * @returns {Object} res
   */
  static validateReview(req, res, next) {
    const messages = [];
    let review;
    if (req.body.review) {
      review = req.body.review.trim();
    }

    if (!review || validator.isEmpty(review)) {
      messages.push('Review is required');
    }

    if (messages.length > 0) {
      return res.status(400).jsend.fail({ errors: messages });
    }
    next();
  }

  /**
   * Validates id
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   *
   * @returns {Object} res
   */
  static validateID(req, res, next) {
    const messages = [];

    if (isNaN(req.params.id)) {
      messages.push('Id must be an integer');
    }
    if (req.params.id < 0) {
      messages.push('Id cannot be a negative value');
    }
    if (messages.length > 0) {
      return res.status(400).jsend.fail({ errors: messages });
    }
    next();
  }

  /**
   * Validates query params
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   *
   * @returns {Object} res
   */
  static validateQueryParams(req, res, next) {
    const messages = [];

    if (req.query.sort && !req.query.order) {
      messages.push('order parameter is required if sort parameter is passed');
    }
    if (!req.query.sort && req.query.order) {
      messages.push('sort parameter is required if order parameter is passed');
    }
    if (req.query.sort && req.query.order) {
      if (req.query.sort.toLowerCase() !== 'upvotes' && req.query.sort.toLowerCase() !== 'downvotes') {
        messages.push('sort parameter must be either upvotes or downvotes');
      }
      if (req.query.order.toUpperCase() !== 'ASC' && req.query.order.toUpperCase() !== 'DESC') {
        messages.push('order parameter must be asc or desc');
      }
    }

    if (req.query.from && !req.query.limit) {
      messages.push('limit parameter is required if from parameter is passed');
    }
    if (!req.query.from && req.query.limit) {
      messages.push('from parameter is required if limit parameter is passed');
    }
    if (req.query.from && req.query.limit) {
      if (isNaN(req.query.from) && isNaN(req.query.limit)) {
        messages.push('from and limit parameters must be numbers');
      }
    }

    if (messages.length > 0) {
      return res.status(400).jsend.fail({ errors: messages });
    }
    next();
  }
}
