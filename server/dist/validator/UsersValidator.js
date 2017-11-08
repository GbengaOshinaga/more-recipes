'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class for validating signin and signup
 */
var UsersValidator = function () {
  function UsersValidator() {
    _classCallCheck(this, UsersValidator);
  }

  _createClass(UsersValidator, null, [{
    key: 'validateSignUp',

    /**
       * Validates input for sign up
       * @param {*} req
       * @param {*} res
       * @param {*} next
       * @returns {*} res
       */
    value: function validateSignUp(req, res, next) {
      var messages = [];

      if (!req.body.firstName) {
        messages.push('First Name is required');
      }
      if (!req.body.lastName) {
        messages.push('Last Name is required');
      }
      if (!req.body.email) {
        messages.push('Email is required');
      }
      if (!req.body.password) {
        messages.push('Password is required');
      }
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(req.body.email)) {
        messages.push('Email Address is not valid');
      }
      if (req.body.password.length < 6) {
        messages.push('Password is too short, minimum is 6 characters');
      }
      if (messages.length > 0) {
        return res.status(400).jsend.fail({ errors: messages });
      }
      next();
    }

    /**
     * Validates sign in
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */

  }, {
    key: 'validateSignIn',
    value: function validateSignIn(req, res, next) {
      var messages = [];

      if (!req.body.email) {
        messages.push('Email is required');
      }
      if (!req.body.password) {
        messages.push('Password is required');
      }
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(req.body.email)) {
        messages.push('Email Address is not valid');
      }
      if (messages.length > 0) {
        return res.status(400).jsend.fail({ errors: messages });
      }
      next();
    }
  }]);

  return UsersValidator;
}();

exports.default = UsersValidator;