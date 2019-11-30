import { validationResult } from 'express-validator';

function errorHandler(validations) {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.failResponse({ errors: errors.array() });
  };
}

export default errorHandler;
