import * as votesController from '../controllers/votesController';
import { authenticate } from '../middlewares';

const baseUrl = '/api/v1/recipes';

export default app => {
  // Add upvote for recipe
  app.post(`${baseUrl}/upvote/:id`, authenticate, votesController.addUpvote);

  // Add downvote for recipe
  app.post(
    `${baseUrl}/downvote/:id`,
    authenticate,
    votesController.addDownvote
  );
};
