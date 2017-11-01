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
        .then(user => {
          const accessToken = jwt.sign({userId: user.id, email: user.email}, 'mysecret');
          return res.status(201).jsend.success({user, token: accessToken});
        })
        .catch(error => res.jsend.fail(error));
    });
  }

  /**
   * Signs in a user
   * @param {*} req
   * @param {*} res
   * @returns {res} response
   */
  static signin(req, res) {
    const { email, password } = req.body;

    db.User.findOne({ where: { email: email } })
      .then(user => {
        if (!user) {
          return res.status(404).jsend.fail('A user with this email does not exist');
        }
        bcrypt.compare(password, user.password)
          .then(re => {
            if(!re){
              return res.status(400).jsend.fail('Wrong passwords');
            }else{
              const accessToken = jwt.sign({userId: user.id, email: user.email}, 'mysecret');
              return res.status(200).jsend.success({token: accessToken});
            }
          })
          .catch(error => res.status(400).jsend.error(error));
      })
      .catch(error => res.status(400).jsend.error(error));
  }
}