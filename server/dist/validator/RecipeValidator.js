'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class for validating inputs
 */
var RecipeValidator = function () {
  function RecipeValidator() {
    _classCallCheck(this, RecipeValidator);
  }

  _createClass(RecipeValidator, null, [{
    key: 'validateRecipe',


    /**
     * Validates recipe passed
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns {*} response
     */
    value: function validateRecipe(req, res, next) {
      var messages = [];
      if (!req.body.name) {
        messages.push('Recipe Name is required');
      }
      if (!req.body.description) {
        messages.push('Recipe description is required');
      }
      if (!req.body.ingredients) {
        messages.push('Ingredients are required');
      }
      if (messages.length > 0) {
        return res.status(400).jsend.fail({ errors: messages });
      }
      next();
    }

    /**
     * Validates id
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns {*} res
     */

  }, {
    key: 'validateID',
    value: function validateID(req, res, next) {
      var messages = [];

      if (isNaN(req.params.id)) {
        messages.push('Id must be an integer');
      }
      if (req.params.id < 0) {
        messages.push('Id cannot be a negative value');
      }
      if (messages.length > 0) {
        return res.status(400).jsend.fail({ errors: messages });
      }
      next();
    }
  }]);

  return RecipeValidator;
}();

exports.default = RecipeValidator;