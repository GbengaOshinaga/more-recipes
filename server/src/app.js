import Express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes/index';
import db from './models/index.js';

// Set up the express app
const app = new Express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://gC:\Users\gbenga.oshinaga\Documents\Andela\more-recipes\more-recipes\node_modules\babylon\lib\inithub.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
routes(app);


app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the More-Recipes API Home.',
}));

const port = process.env.PORT || 8000;

db.sequelize.sync().then(() => {
	app.listen(port, () => {
	  console.log(`listening to port ${port}`);
	});
});

export default app;