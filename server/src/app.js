/* eslint-disable global-require */
import Express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import webpack from 'webpack';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import config from '../../webpack.config.dev';
import routes from './routes/index';
import db from './models/index';

dotenv.config();

// Set up the express app
const app = new Express();

app.use('/', Express.static(path.join(__dirname, '../../dist')));

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(cors());
app.options('*', cors());

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://gC:\Users\gbenga.oshinaga\Documents\Andela\more-recipes\more-recipes\node_modules\babylon\lib\inithub.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

const doc = require('./converted.json');

app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(doc));

app.all('/api/v1/*', (req, res) => {
  res.status(400).send({
    status: 'fail',
    data: {
      message: 'This API route does not exist'
    }
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 8000;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
  });
});

export default app;
