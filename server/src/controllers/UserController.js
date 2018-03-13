import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index';

/**
 * User Controller class
 */
export default class UserController {
  /**
     * Signs up a user
     * @param {Object} req
     * @param {Object} res
     *
     * @returns {Object} res
     */
  static signup(req, res) {
    let picture = '';
    if (req.body.profilePic) {
      picture = req.body.profilePic;
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {
      db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        profilePic: picture
      })
        .then((user) => {
          const accessToken = jwt.sign({
            userId: user.id,
            email: user.email
          }, process.env.JWT_SECRET);
          return res.status(201).jsend.success({
            user: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              updatedAt: user.updatedAt,
              createdAt: user.createdAt,
              profilePic: user.profilePic,
              about: user.about
            },
            token: accessToken
          });
        })
        .catch(error => res.status(400).jsend.fail({ message: error.errors[0].message }));
    });
  }

  /**
   * Signs in a user
     * @param {Object} req
     * @param {Object} res
     *
     * @returns {Object} res
     */
  static signin(req, res) {
    const { email, password } = req.body;

    db.User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          return res.status(404).jsend.fail({ message: 'Invalid Credentials' });
        }
        bcrypt.compare(password, user.password)
          .then((result) => {
            if (!result) {
              return res.status(400).jsend.fail({ message: 'Invalid Credentials' });
            }
            const accessToken = jwt.sign({
              userId: user.id,
              email: user.email
            }, process.env.JWT_SECRET);
            return res.status(200).jsend.success({
              user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                updatedAt: user.updatedAt,
                createdAt: user.createdAt,
                profilePic: user.profilePic,
                about: user.about
              },
              token: accessToken
            });
          })
          .catch(error => res.status(400).jsend.error(error));
      })
      .catch(error => res.status(400).jsend.error(error));
  }

  /**
   * Edits user information
     * @param {Object} req
     * @param {Object} res
     *
     * @returns {Object} res
     */
  static modifyUser(req, res) {
    db.User.findById(req.user.userId)
      .then((user) => {
        user.update({
          firstName: req.body.firstName || user.firstName,
          lastName: req.body.lastName || user.lastName,
          email: req.body.email || user.email,
          profilePic: req.body.profilePic || user.profilePic,
          about: req.body.about || user.about
        })
          .then(updatedUser => res.status(200).jsend.success({
            user: {
              id: updatedUser.id,
              firstName: updatedUser.firstName,
              lastName: updatedUser.lastName,
              email: updatedUser.email,
              updatedAt: updatedUser.updatedAt,
              createdAt: updatedUser.createdAt,
              profilePic: updatedUser.profilePic,
              about: updatedUser.about
            }
          }))
          .catch(error => res.status(400).jsend.fail(error));
      })
      .catch(error => res.status(400).jsend.fail(error));
  }

  /**
   * Get specific user by id
     * @param {Object} req
     * @param {Object} res
     *
     * @returns {Object} res
     */
  static getUserById(req, res) {
    db.User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).jsend.fail({ message: `User with Id of ${req.params.id} does not exist` });
        }
        res.status(200).jsend.success({
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
            profilePic: user.profilePic,
            about: user.about
          }
        });
      })
      .catch(error => res.status(400).jsend.error(error));
  }

  /**
   * Deletes user by id
     * @param {Object} req
     * @param {Object} res
     *
     * @returns {Object} res
     */
  static deleteUser(req, res) {
    db.User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).jsend.fail({ message: `User with Id of ${req.params.id} does not exist` });
        }
        if (req.user.userId !== user.id) {
          return res.status(401).jsend.fail({ message: 'You are not authorized to delete this account' });
        }
        user.destroy()
          .then(() => res.status(200).jsend.success({ message: 'User account deleted' }))
          .catch(error => res.status(400).jsend.error(error));
      })
      .catch(error => res.status(400).jsend.error(error));
  }

  /**
   * Gets all recipes created by user
     * @param {Object} req
     * @param {Object} res
     *
     * @returns {Object} res
     */
  static getUsersRecipes(req, res) {
    db.User.findById(req.user.userId)
      .then((user) => {
        user.getRecipes()
          .then((recipes) => {
            if (recipes.length === 0) {
              return res.status(404).jsend.fail({ message: 'No Recipe Found' });
            }
            return res.status(200).jsend.success({ recipes });
          })
          .catch(error => res.status(400).jsend.fail(error));
      })
      .catch(error => res.status(400).jsend.fail(error));
  }
}
