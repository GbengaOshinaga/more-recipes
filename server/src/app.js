import Express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes/index';

// Set up the express app
const app = new Express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
routes(app);


app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the More-Recipes API Home.',
}));

app.listen(process.env.PORT || 8000);

export default app;
