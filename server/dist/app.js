'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./models/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set up the express app
var app = new _express2.default();

// Log requests to the console.
app.use((0, _morgan2.default)('dev'));

// Parse incoming requests data (https://gC:\Users\gbenga.oshinaga\Documents\Andela\more-recipes\more-recipes\node_modules\babylon\lib\inithub.com/expressjs/body-parser)
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
(0, _index2.default)(app);

app.get('*', function (req, res) {
	return res.status(200).send({
		message: 'Welcome to the More-Recipes API Home.'
	});
});

var port = process.env.PORT || 8000;

_index4.default.sequelize.sync().then(function () {
	app.listen(port, function () {
		console.log('listening to port ' + port);
	});
});

exports.default = app;