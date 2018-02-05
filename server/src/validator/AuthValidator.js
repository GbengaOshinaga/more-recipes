import jwt from 'jsonwebtoken';

/**
 * Class for authenticating through access tokens
 */
export default class AuthValidator {
  /**
     * Authenticates user through access token
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns {*} res
     */
  static authenticate(req, res, next) {
    const accessToken = req.body.accessToken || req.get('Access-Token');

    try {
      const user = jwt.verify(accessToken, process.env.JWT_SECRET);

      if (user.email) {
        req.user = user;
        return next();
      }
    } catch (error) {
      res.status(401).jsend.error('Authentication is required to perform this request');
    }
  }
}
