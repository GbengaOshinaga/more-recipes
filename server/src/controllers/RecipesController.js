import db from '../models/index';
import { getPaginationMeta, check } from '../helpers/';

/**
 * RecipesController
 */
export default class RecipesController {
  /**
   * Adds a recipe
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Array} all recipes
   */
  static addRecipe(req, res) {
    let ingredientsArray;
    if (!Array.isArray(req.body.ingredients)) {
      ingredientsArray = req.body.ingredients.split(',');
    } else {
      ingredientsArray = req.body.ingredients;
    }

    db.Recipes.findOne({
      where: {
        UserId: req.user.userId,
        name: req.body.name
      }
    })
      .then((existingRecipe) => {
        if (existingRecipe) {
          return res.status(400).jsend.fail({ message: 'You have already created this recipe' });
        }
        db.Recipes.create({
          name: req.body.name,
          description: req.body.description,
          UserId: req.user.userId,
          image: req.body.image,
          ingredients: ingredientsArray
        })
          .then(recipe => res.status(201).jsend.success({ recipe }))
          .catch(error => res.status(400).jsend.error(error));
      })
      .catch(error => res.status(400).jsend.error(error));
  }

  /**
   * Gets Recipes
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Array} all recipes
   */
  static getRecipes(req, res) {
    if (req.query.sort && req.query.order) {
      db.Recipes.findAll({
        group: 'id',
        order: db.sequelize.literal(`max(${req.query.sort}) ${req.query.order.toUpperCase()}`),
        offset: req.query.from,
        limit: req.query.limit
      })
        .then(recipes => getPaginationMeta(req, db.Recipes)
          .then(paginationMeta => res.status(200).jsend.success({ recipes, paginationMeta })))
        .catch(error => res.status(400).jsend.error({ error }));
    } else if (req.query.query) {
      this.searchRecipes(req.query.query.trim(), req, res);
    } else {
      db.Recipes.findAll({
        group: 'id',
        order: db.sequelize.literal('max(id) DESC'),
        offset: req.query.from,
        limit: req.query.limit
      })
        .then(recipes => getPaginationMeta(req, db.Recipes)
          .then(paginationMeta => res.status(200).jsend.success({ recipes, paginationMeta })))
        .catch(error => res.status(400).jsend.error(error));
    }
  }

  /**
   * Gets recipe with specified id
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Object} res
   */
  static getRecipeById(req, res) {
    db.Recipes.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).jsend.fail({ message: `Recipe with Id of ${req.params.id} does not exist` });
        }
        return res.status(200).jsend.success({ recipe });
      })
      .catch(() => res.status(400).jsend.error('An error occured'));
  }

  /**
   * Modifies a recipe
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Object} Modified recipe
   */
  static modifyRecipe(req, res) {
    let ingredientsArray;
    if (req.body.ingredients) {
      if (!Array.isArray(req.body.ingredients)) {
        ingredientsArray = req.body.ingredients.split(',');
      } else {
        ingredientsArray = req.body.ingredients;
      }
    }

    db.Recipes.findById(req.params.id)
      .then((recipe) => {
        check(recipe, req, res, 'recipe');
        recipe.update({
          name: req.body.name || recipe.name,
          description: req.body.description || recipe.description,
          userId: req.user.userId,
          image: req.body.image || recipe.image,
          ingredients: ingredientsArray || recipe.ingredients
        }).then(updatedRecipe => res.status(200).jsend.success({ updatedRecipe }));
      })
      .catch(error => res.jsend.error(error));
  }

  /**
   * Deletes specified recipe
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {String} message
   */
  static deleteRecipe(req, res) {
    db.Recipes.findById(req.params.id)
      .then((recipe) => {
        check(recipe, req, res, 'recipe');
        recipe.destroy({ force: true })
          .then(() => res.status(200).jsend.success({ message: 'Recipe has been successfully deleted' }))
          .catch(error => res.status(400).jsend.error(error));
      })
      .catch(error => res.status(400).jsend.error(error));
  }

  /**
   * Add review to recipe
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Object} recipe object
   */
  static addReview(req, res) {
    db.Reviews.create({
      review: req.body.review,
      UserId: req.user.userId,
      RecipeId: req.params.id
    })
      .then(review => db.Reviews.findById(review.id, {
        include: [{
          model: db.User,
          attributes: { exclude: ['password'] }
        }]
      }))
      .then(userReviews => res.status(201).jsend.success({ review: userReviews }))
      .catch(error => res.status(400).jsend.error(error));
  }

  /**
   * Get reviews for a recipe
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Object} res
   */
  static getRecipeReviews(req, res) {
    const condition = { RecipeId: req.params.id };
    db.Reviews.findAll({
      where: condition,
      include: [{ model: db.User, attributes: { exclude: ['password'] } }],
      offset: req.query.from,
      limit: req.query.limit
    })
      .then(reviews => getPaginationMeta(req, db.Reviews, condition)
        .then(paginationMeta => res.status(200).jsend.success({ reviews, paginationMeta })))
      .catch(error => res.status(400).jsend.error(error));
  }

  /**
   * Edits a review
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Object} res
   */
  static editReview(req, res) {
    db.Reviews.findById(req.params.id)
      .then((review) => {
        check(review, req, res, 'review');
        review.update({
          review: req.body.review || review.review
        })
          .then(updatedReview => res.status(200).jsend.success({ updatedReview }))
          .catch(error => res.status(400).jsend.error(error));
      });
  }

  /**
   * Deletes a review
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {String} res
   */
  static deleteReview(req, res) {
    db.Reviews.findById(req.params.id)
      .then((review) => {
        check(review, req, res, 'review');
        review.destroy()
          .then(() => res.status(200).jsend.success({ message: 'Review has been successfully deleted' }))
          .catch(error => res.status(400).jsend.error(error));
      });
  }

  /**
   * Search for recipes
   * @param {String} query
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Array} res
   */
  static searchRecipes(query, req, res) {
    const op = db.Sequelize.Op;
    const condition = {
      [op.or]: {
        name: {
          [op.iLike]: `%${query}%`
        },
        description: {
          [op.iLike]: `%${query}%`
        },
        ingredients: {
          [op.contains]: [`${query}`]
        }
      }
    };

    db.Recipes.findAll({
      where: condition,
      group: 'id',
      order: db.sequelize.literal('max(id) ASC'),
      offset: req.query.from,
      limit: req.query.limit
    })
      .then((recipes) => {
        if (recipes.length === 0) {
          return res.status(404).jsend.fail({ message: 'No Results Found' });
        }
        return getPaginationMeta(req, db.Recipes, condition)
          .then(paginationMeta => res.status(200).jsend.success({ recipes, paginationMeta }));
      })
      .catch(error => res.status(400).jsend.error(error));
  }
}
