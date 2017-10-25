import Express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import RecipesController from './server/controllers/RecipesController';

// Set up the express app
const app = new Express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
const recipes = new RecipesController();
app.use('/api/recipes', recipes.route);
app.use('/api/recipes/:id', recipes.route);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the More-Recipes API Home.',
}));

app.listen(8000);
