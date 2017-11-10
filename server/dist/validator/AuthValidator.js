'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class for authenticating through access tokens
 */
var AuthValidator = function () {
    function AuthValidator() {
        _classCallCheck(this, AuthValidator);
    }

    _createClass(AuthValidator, null, [{
        key: 'authenticate',

        /**
           * Authenticates user through access token
           * @param {*} req
           * @param {*} res
           * @param {*} next
           * @returns {*} res
           */
        value: function authenticate(req, res, next) {
            console.log(req.headers['accessToken']);
            var accessToken = req.body.accessToken || req.headers['accessToken'];

            try {
                var user = _jsonwebtoken2.default.verify(accessToken, 'mysecret');
                if (user.email) {
                    req.user = user;
                    return next();
                }
                res.status(400).jsend.fail('Invalid token');
            } catch (error) {
                res.status(401).jsend.error('Authentication is required to perform this request');
            }
        }
    }]);

    return AuthValidator;
}();

exports.default = AuthValidator;