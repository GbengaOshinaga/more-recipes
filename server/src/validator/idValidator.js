import { param } from 'express-validator';

export const getIdValidation = () => {
  const validation = [
    param('id')
      .isNumeric({ no_symbols: true })
      .withMessage('Id must be an integer')
  ];

  return validation;
};
