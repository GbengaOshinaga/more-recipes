/* eslint-disable global-require */
import Express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import * as Sentry from '@sentry/node';
import routes from './routes/index';
import db from './models/index';

dotenv.config();

const { COOKIE_SECRET } = process.env;

// Set up the express app
const app = new Express();

Sentry.init({
  dsn: process.env.SENTRY_DSN
});

app.use(Sentry.Handlers.requestHandler());

app.use('/', Express.static(path.join(__dirname, '../../dist')));

app.use(cors({ credentials: true, origin: true }));
app.options('*', cors());

// Log requests to the console.
app.use(logger('dev'));
app.use(cookieParser(COOKIE_SECRET));

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

app.use(Sentry.Handlers.errorHandler());

const port = process.env.PORT || 8000;

db.sequelize.sync().then(() => {
  app.listen(port, () => {});
});

export default app;
