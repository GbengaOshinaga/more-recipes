import bcrypt from 'bcrypt';
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
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
      });
  }
}