/**
 * Class for validating signin and signup
 */
export default class UsersValidator {
  /**
     * Validates input for sign up
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   *
   * @returns {Object} res
   */
  static validateSignUp(req, res, next) {
    const messages = [];

    if (!req.body.firstName) {
      messages.push('First Name is required');
    }
    if (req.body.firstName && req.body.firstName.trim().length === 0) {
      messages.push('First Name is Empty');
    }
    if (/^[a-zA-Z0-9- ]*$/.test(req.body.firstName) === false) {
      messages.push('First Name contains illegal characters');
    }
    if (!req.body.lastName) {
      messages.push('Last Name is required');
    }
    if (req.body.lastName && req.body.lastName.trim().length === 0) {
      messages.push('Last Name is Empty');
    }
    if (/^[a-zA-Z0-9- ]*$/.test(req.body.lastName) === false) {
      messages.push('Last Name contains illegal characters');
    }
    if (!req.body.email) {
      messages.push('Email is required');
    }
    if (!req.body.password) {
      messages.push('Password is required');
    }
    if (!req.body.confirmPassword) {
      messages.push('Confirm Password is required');
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(req.body.email)) {
      messages.push('Email Address is not valid');
    }
    if (req.body.password && req.body.password.length < 6) {
      messages.push('Password is too short, minimum is 6 characters');
    }
    if (req.body.password !== req.body.confirmPassword) {
      messages.push('Password and Confirm Password values are different');
    }
    if (messages.length > 0) {
      return res.status(400).jsend.fail({ errors: messages });
    }
    next();
  }

  /**
   * Validates sign in
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   *
   * @returns {Object} res
   */
  static validateSignIn(req, res, next) {
    const messages = [];

    if (!req.body.email) {
      messages.push('Email is required');
    }
    if (!req.body.password) {
      messages.push('Password is required');
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

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
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   *
   * @returns {Object} res
   */
  static validateInput(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).jsend.fail({ error: 'You did not provide any value for updating' });
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (req.body.email && !emailRegex.test(req.body.email)) {
      return res.status(400).jsend.fail({ error: 'Email Address is not valid' });
    }

    if (!req.body.firstName && !req.body.lastName && !req.body.email
      && !req.body.password && !req.body.profilePic && !req.body.about) {
      if (Object.keys(req.body).length !== 0) {
        return res.status(400).jsend.fail({ error: `${Object.keys(req.body)} are not valid attributes` });
      }
    }
    next();
  }
}
