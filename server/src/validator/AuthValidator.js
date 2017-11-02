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
    static authenticate(req, res, next){
        const accessToken = req.body.accessToken;

        try {
            const user = jwt.verify(accessToken, 'mysecret');
            if(user.email){
                req.user = user;
                return next();
            }
            res.status(400).jsend.fail('Invalid token');
        } catch (error) {
            res.status(401).jsend.error('Authentication is required to perform this request');
        }
    }
}