import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models/index';
import { tryCatch, ControllerError, setCookie, clearCookie } from '../utils';

dotenv.config();

const { User } = db;

/**
 * Get user object
 * @param {Object} user
 *
 * @returns {Object} user
 */
const getUserObject = (user = {}) => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  updatedAt: user.updatedAt,
  createdAt: user.createdAt,
  profilePic: user.profilePic,
  about: user.about
});

/*
  |--------------------------------------------------------------------------
  | Sign up controller
  |--------------------------------------------------------------------------
*/
export const signUp = (req, res) => {
  const { profilePic, firstName, lastName, email } = req.body;

  let picture = '';
  if (profilePic) {
    picture = profilePic;
  }

  const createAndReturnUser = async (err, hash) => {
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hash,
        profilePic: picture
      });

      const accessToken = jwt.sign(
        {
          userId: user.id,
          email: user.email
        },
        process.env.JWT_SECRET
      );

      setCookie({ res, key: 'accessToken', value: accessToken });

      return res.successResponse(
        {
          user: getUserObject(user),
          token: accessToken
        },
        201
      );
    } catch (error) {
      return res.failResponse(error.errors?.[0]?.message);
    }
  };

  bcrypt.hash(req.body.password, 10, createAndReturnUser);
};

/*
  |--------------------------------------------------------------------------
  | Sign in controller
  |--------------------------------------------------------------------------
*/
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  tryCatch(res, async () => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.failResponse('Invalid Credentials');
    }

    const result = bcrypt.compare(password, user.password);
    if (!result) {
      return res.failResponse('Invalid Credentials');
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      process.env.JWT_SECRET
    );

    setCookie({ res, key: 'accessToken', value: accessToken });

    return res.successResponse({
      user: getUserObject(user),
      token: accessToken
    });
  });
};

export const signOut = (req, res) => clearCookie(res, 'accessToken');

/**
 * Find and return user
 * @param {String} userId
 * @returns {Object} user
 * @throws {ControllerError} if user is not found
 */
const findUser = async userId => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ControllerError(404, 'User with specified id does not exist');
  }

  return user;
};

/*
  |--------------------------------------------------------------------------
  | Edit user controller
  |--------------------------------------------------------------------------
*/
export const editUser = async (req, res) => {
  const {
    user: { userId } = {},
    body: { firstName, lastName, email, profilePic, about = '' }
  } = req;

  tryCatch(res, async () => {
    const user = await findUser(userId);
    const updatedUser = await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      profilePic: profilePic || user.profilePic,
      about
    });

    return res.successResponse({ user: getUserObject(updatedUser) });
  });
};

/*
  |--------------------------------------------------------------------------
  | Get user by id controller
  |--------------------------------------------------------------------------
*/
export const getUserById = async (req, res) => {
  tryCatch(res, async () => {
    const user = await findUser(req.params.id);

    return res.successResponse({ user: getUserObject(user) });
  });
};

/*
  |--------------------------------------------------------------------------
  | Delete user controller
  |--------------------------------------------------------------------------
*/
export const deleteUser = async (req, res) => {
  const {
    params: { id },
    user: { userId }
  } = req;

  tryCatch(res, async () => {
    const user = await findUser(id);
    if (userId !== user.id) {
      return res.failResponse(
        {
          message: 'You are not authorized to delete this account'
        },
        401
      );
    }
    await user.destroy();
    return res.successResponse('User account deleted');
  });
};

/*
  |--------------------------------------------------------------------------
  | Get user recipes controller
  |--------------------------------------------------------------------------
*/
export const getUserRecipes = async (req, res) => {
  const {
    user: { userId }
  } = req;

  tryCatch(res, async () => {
    const user = await findUser(userId);

    const recipes = await user.getRecipes();
    if (recipes.length === 0) {
      return res.failResponse({ message: 'No Recipe Found' }, 404);
    }

    return res.successResponse({ recipes });
  });
};
