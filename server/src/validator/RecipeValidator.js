

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
    if (!req.body.name) {
      messages.push('Recipe Name is required');
    }
    if (!req.body.description) {
      messages.push('Recipe description is required');
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
   * Checks if any value is provided for edit
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} res
   */
  static validateInput(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).jsend.fail({ error: 'You did not provide any value for updating' });
    }
    next();
  }
}
