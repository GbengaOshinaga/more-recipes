'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Favourite recipes controller
 */
var FavouriteRecipesController = function () {
  function FavouriteRecipesController() {
    _classCallCheck(this, FavouriteRecipesController);
  }

  _createClass(FavouriteRecipesController, [{
    key: 'addFavourite',


    /**
       * Adds a favourite for a user
       * @param {*} req
       * @param {*} res
       * @returns {*} res
       */
    value: function addFavourite(req, res) {
      _index2.default.favouriteRecipes.create({
        userId: req.user.userId,
        recipeId: req.params.id
      }).then(function (fav) {
        return res.status(200).jsend.success(fav);
      }).catch(function (error) {
        return res.status(400).jsend.error(error);
      });
    }

    /**
       * Method gets the favourite recipes for a user
       * @param {*} req
       * @param {*} res
       * @returns {*} res
       */

  }, {
    key: 'getFavourites',
    value: function getFavourites(req, res) {
      _index2.default.favouriteRecipes.findAll({
        where: {
          userId: req.params.id
        }
      }).then(function (fav) {
        return res.status(200).jsend.success(fav);
      }).catch(function (error) {
        return res.status(400).jsend.error(error);
      });
    }
  }]);

  return FavouriteRecipesController;
}();

exports.default = FavouriteRecipesController;