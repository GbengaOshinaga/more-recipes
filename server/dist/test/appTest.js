'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
var expect = _chai2.default.expect;
_chai2.default.use(_chaiHttp2.default);

describe('/api/v1/recipes', function () {
  it('it should return "Welcome to the More-Recipes API Home."', function (done) {
    _chai2.default.request(_app2.default).get('/').end(function (err, res) {
      res.should.have.status(200);
      expect(res.body.message).to.eql('Welcome to the More-Recipes API Home.');
      done();
    });
  });

  it('it should get all recipes', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/recipes').end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});