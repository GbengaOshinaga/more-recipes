import { check, body } from 'express-validator';

export const getEmailAndPasswordValidation = () => {
  const validation = [
    check('email')
      .not().isEmpty().withMessage('Email Address is required')
      .normalizeEmail()
      .isEmail()
      .withMessage('Email Address is not valid'),
    check('password')
      .not().isEmpty().withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password is too short, minimum is 6 characters')
  ];

  return validation;
};

export const getSignUpValidation = () => {
  const comparePasswords = (value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }

    return true;
  };

  const validation = [
    check('firstName')
      .not().isEmpty().withMessage('First Name is required')
      .trim()
      .escape(),
    check('lastName')
      .not().isEmpty().withMessage('Last Name is required')
      .trim()
      .escape(),
    ...getEmailAndPasswordValidation(),
    check('confirmPassword')
      .not().isEmpty().withMessage('Confirm Password is required'),
    body('confirmPassword').custom(comparePasswords)
  ];

  return validation;
};

export const getUpdateValidation = () => {
  const validation = [
    check('firstName')
      .optional()
      .trim()
      .escape(),
    check('lastName')
      .optional()
      .trim()
      .escape(),
    check('email')
      .optional()
      .normalizeEmail()
      .isEmail()
      .withMessage('Email Address is not valid'),
    check('profilePic').optional().trim().escape(),
    check('about').optional().trim().escape()
  ];

  return validation;
};
