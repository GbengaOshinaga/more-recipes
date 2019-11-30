import VotesController from '../controllers/VotesController';
import { authenticate } from '../middlewares/authenticate';

export default (app) => {
  // Add upvote for recipe
  app.post('/api/v1/recipes/upvote/:id', authenticate, (req, res) => { VotesController.addUpvote(req, res); });

  // Add downvote for recipe
  app.post('/api/v1/recipes/downvote/:id', authenticate, (req, res) => { VotesController.addDownvote(req, res); });
};
