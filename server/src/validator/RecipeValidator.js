

/**
 * Class for validating inputs
 */
export default class RecipeValidator {
  /**
   * Validates recipe passed
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  static validateRecipe(req, res, next) {
    const messages = [];

    const isEmpty = (str) => {
      const regexp = /^[a-zA-Z0-9-',?.":; ]*$/;
      return (regexp.test(str) || !str.length);
    };

    if (!req.body.name) {
      messages.push('Recipe Name is required');
    }
    if (!req.body.name || !isEmpty(req.body.name)) {
      messages.push('Recipe Name cannot be empty or contain illegal characters');
    }
    if (!req.body.description) {
      messages.push('Recipe description is required');
    }
    if (!req.body.description || !isEmpty(req.body.description)) {
      messages.push('Recipe description cannot be empty or contain illegal characters');
    }
    if (!req.body.ingredients) {
      messages.push('Ingredients are required');
    }
    if (messages.length > 0) {
      return res.status(400).jsend.fail({ errors: messages });
    }
    next();
  }

  /**
   * Validates review
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  static validateReview(req, res, next) {
    const messages = [];
    let review;
    if (req.body.review) {
      review = req.body.review.trim();
    }

    const isEmpty = (str) => {
      const regexp = /^[a-zA-Z0-9-',?.":; ]*$/;
      return (regexp.test(str) || !str.length);
    };

    if (!review) {
      messages.push('Review is required');
    }
    if (!review || !isEmpty(review)) {
      messages.push('Review cannot be empty or contain illegal characters');
    }

    if (messages.length > 0) {
      return res.status(400).jsend.fail({ errors: messages });
    }
    next();
  }

  /**
   * Validates id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} res
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
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} res
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
