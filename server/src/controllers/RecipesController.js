import db from '../models/index';

/**
 * RecipesController
 */
export default class RecipesController {
  /**
   * Adds a recipe
   * @param {Object} req
   * @param {Object} res
   * @returns {Array} all recipes
   */
  static addRecipe(req, res) {
    const ingredientsArray = req.body.ingredients.split(',');

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
   * @returns {Array} all recipes
   */
  static getRecipes(req, res) {
    if (req.query.sort && req.query.order) {
      db.Recipes.findAll({
        group: 'id',
        order: db.sequelize.literal(`max(${req.query.sort}) ${req.query.order.toUpperCase()}`)
      })
        .then(recipes => res.status(200).jsend.success({ recipes }))
        .catch(error => res.status(400).jsend.error({ error }));
    } else if (req.query.from && req.query.to) {
      this.paginateRecipes(req.query.from, req.query.to, res);
    } else if (req.query.query) {
      this.searchRecipes(req.query.query.trim(), res);
    } else {
      db.Recipes.findAll({
        include: [{
          model: db.Reviews,
          include: [{
            model: db.User
          }]
        }]
      })
        .then(recipes => res.status(200).jsend.success({ recipes }))
        .catch(error => res.status(400).jsend.error(error));
    }
  }

  /**
   * Gets recipe with specified id
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res
   */
  static getRecipeById(req, res) {
    db.Recipes.findById(req.params.id, {
      include: [{
        model: db.Reviews,
        include: [{
          model: db.User
        }]
      }]
    })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).jsend.fail({ message: `Recipe with Id of ${req.params.id} does not exist` });
        }
        recipe.getFavouriteUsers()
          .then(userFavourites =>
            res.status(200).jsend.success({ recipe, favourites: userFavourites }));
      })
      .catch(() => res.status(400).jsend.error('An error occured'));
  }

  /**
   * Modifies a recipe
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Modified recipe
   */
  static modifyRecipe(req, res) {
    let ingredientsArray;
    if (req.body.ingredients) {
      ingredientsArray = req.body.ingredients.split(',');
    }

    db.Recipes.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).jsend.fail({ message: 'The Recipe does not exist' });
        }
        if (recipe.UserId !== req.user.userId) {
          return res.status(401).jsend.fail({ message: 'You are not authorized to edit this recipe' });
        }
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
   * @returns {String} message
   */
  static deleteRecipe(req, res) {
    db.Recipes.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).jsend.fail({ message: 'The Recipe does not exist' });
        }
        if (recipe.UserId !== req.user.userId) {
          return res.status(401).jsend.fail({ message: 'You are not authorized to delete this recipe' });
        }
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
   * @returns {Object} recipe object
   */
  static addReview(req, res) {
    db.Reviews.create({
      review: req.body.review,
      UserId: req.user.userId,
      RecipeId: req.params.id
    })
      .then(review => db.Reviews.findById(review.id, { include: [{ model: db.User }] }))
      .then(userReviews => res.status(201).jsend.success({ review: userReviews }))
      .catch(error => res.status(400).jsend.error(error));
  }

  /**
   * Edits a review
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} res
   */
  static editReview(req, res) {
    db.Reviews.findById(req.params.id)
      .then((review) => {
        if (!review) {
          return res.status(404).jsend.fail({ message: 'The Review does not exist' });
        }
        if (review.UserId !== req.user.userId) {
          return res.status(401).jsend.fail({ message: 'You are not authorized to edit this review' });
        }
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
   * @returns {String} res
   */
  static deleteReview(req, res) {
    db.Reviews.findById(req.params.id)
      .then((review) => {
        if (!review) {
          return res.status(404).jsend.fail({ message: 'The Review does not exist' });
        }
        if (review.UserId !== req.user.userId) {
          return res.status(401).jsend.fail({ message: 'You are not authorized to delete this review' });
        }
        review.destroy()
          .then(() => res.status(200).jsend.success({ message: 'Review has been successfully deleted' }))
          .catch(error => res.status(400).jsend.error(error));
      });
  }

  /**
   * Search for recipes
   * @param {String} query
   * @param {Object} res
   * @returns {Array} res
   */
  static searchRecipes(query, res) {
    const op = db.Sequelize.Op;

    db.Recipes.findAll({
      where: {
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
      }
    })
      .then((recipes) => {
        if (recipes.length === 0) {
          return res.status(404).jsend.fail({ message: 'No Results Found' });
        }
        res.status(200).jsend.success({ recipes });
      })
      .catch(error => res.status(400).jsend.error(error));
  }

  /**
   * Paginate recipes
   * @param {Number} offset
   * @param {Number} limit
   * @param {Object} res
   * @returns {Array} res
   */
  static paginateRecipes(offset, limit, res) {
    db.Recipes.findAll({ offset, limit })
      .then(recipes => res.status(200).jsend.success({ recipes }))
      .catch(error => res.status(400).jsend.error(error));
  }
}
