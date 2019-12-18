import { param } from 'express-validator';

export const getIdValidation = () => [
  param('id')
    .isNumeric({ no_symbols: true })
    .withMessage('Id must be an integer')
];
