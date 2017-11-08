'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * User Controller class
 */
var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'signup',

    /**
       * Signs up a user
       * @param {*} req 
       * @param {*} res 
       * @returns {User} created user
       */
    value: function signup(req, res) {
      _bcrypt2.default.hash(req.body.password, 10, function (err, hash) {
        _index2.default.User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash
        }).then(function (user) {
          var accessToken = _jsonwebtoken2.default.sign({ userId: user.id, email: user.email }, 'mysecret');
          return res.status(201).jsend.success({ user: user, token: accessToken });
        }).catch(function (error) {
          return res.jsend.fail(error);
        });
      });
    }

    /**
     * Signs in a user
     * @param {*} req
     * @param {*} res
     * @returns {res} response
     */

  }, {
    key: 'signin',
    value: function signin(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;


      _index2.default.User.findOne({ where: { email: email } }).then(function (user) {
        if (!user) {
          return res.status(404).jsend.fail('Invalid Credentials');
        }
        _bcrypt2.default.compare(password, user.password).then(function (re) {
          if (!re) {
            return res.status(400).jsend.fail('Invalid Credentials');
          }
          var accessToken = _jsonwebtoken2.default.sign({ userId: user.id, email: user.email }, 'mysecret');
          return res.status(200).jsend.success({ token: accessToken });
        }).catch(function (error) {
          return res.status(400).jsend.error(error);
        });
      }).catch(function (error) {
        return res.status(400).jsend.error(error);
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;