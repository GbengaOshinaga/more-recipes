import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index';

/**
 * User Controller class
 */
export default class UserController {
  /**
     * Signs up a user
     * @param {*} req 
     * @param {*} res 
     * @returns {User} created user
     */
  static signup(req, res) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
      })
        .then(user => res.jsend.success(user))
        .catch(error => res.jsend.fail(error));
    });
  }

  /**
   * Signs in a user
   * @param {*} req
   * @param {*} res
   * @returns {res} response
   */
  static signin(req, res){

  }
}