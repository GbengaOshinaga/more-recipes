import VotesController from '../controllers/VotesController';
import AuthValidator from '../validator/AuthValidator';

export default (app) => {
  // Add upvote for recipe
  app.post('/api/v1/recipes/upvote/:id', AuthValidator.authenticate, (req, res) => { VotesController.addUpvote(req, res); });

  // Add downvote for recipe
  app.post('/api/v1/recipes/downvote/:id', AuthValidator.authenticate, (req, res) => { VotesController.addDownvote(req, res); });
};
