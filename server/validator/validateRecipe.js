import Joi from 'joi';

export default {
  body: {
    recipeName: Joi.string().required(),
    recipeDetail: Joi.string().required(),
  }
};
