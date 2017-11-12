/**
 * Class for validating signin and signup
 */
export default class UsersValidator {
  /**
     * Validates input for sign up
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns {*} res
     */
  static validateSignUp(req, res, next) {
    const messages = [];

    if (!req.body.firstName) {
      messages.push('First Name is required');
    }
    if (!req.body.lastName) {
      messages.push('Last Name is required');
    }
    if (!req.body.email) {
      messages.push('Email is required');
    }
    if (!req.body.password) {
      messages.push('Password is required');
    }
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(req.body.email)) {
      messages.push('Email Address is not valid');
    }
    if (req.body.password && req.body.password.length < 6) {
      messages.push('Password is too short, minimum is 6 characters');
    }
    if (messages.length > 0) {
      return res.status(400).jsend.fail({ errors: messages });
    }
    next();
  }

  /**
   * Validates sign in
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {Array} errors if any
   */
  static validateSignIn(req, res, next) {
    const messages = [];

    if (!req.body.email) {
      messages.push('Email is required');
    }
    if (!req.body.password) {
      messages.push('Password is required');
    }
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(req.body.email)) {
      messages.push('Email Address is not valid');
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
    if (!req.body.firstName && !req.body.lastName && !req.body.email && !req.body.password) {
      return res.status(400).jsend.fail({ error: 'You can not provide an empty value' });
    }
    next();
  }
}
