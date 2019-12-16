import { body } from 'express-validator';

export const getEmailAndPasswordValidation = () => [
  body('email')
    .not()
    .isEmpty()
    .withMessage('Email Address is required')
    .isEmail()
    .withMessage('Email Address is not valid')
    .normalizeEmail(),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password is too short, minimum is 6 characters')
];

export const getSignUpValidation = () => {
  const comparePasswords = (value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }

    return true;
  };

  return [
    body('firstName')
      .not()
      .isEmpty()
      .withMessage('First Name is required')
      .trim()
      .escape(),
    body('lastName')
      .not()
      .isEmpty()
      .withMessage('Last Name is required')
      .trim()
      .escape(),
    ...getEmailAndPasswordValidation(),
    body('confirmPassword')
      .not()
      .isEmpty()
      .withMessage('Confirm Password is required'),
    body('confirmPassword').custom(comparePasswords)
  ];
};

export const getUpdateValidation = () => [
  body('firstName')
    .optional()
    .trim()
    .escape(),
  body('lastName')
    .optional()
    .trim()
    .escape(),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email Address is not valid')
    .normalizeEmail(),
  body('profilePic')
    .optional()
    .trim()
    .escape(),
  body('about')
    .optional()
    .trim()
    .escape()
];
