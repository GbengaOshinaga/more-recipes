import jsend from 'jsend';
import responseHandler from 'json-response-handler';
import favouriteRecipesRoutes from './favouriteRecipesRoutes';
import recipesRoutes from './recipesRoutes';
import userRoutes from './userRoutes';
import votesRoutes from './votesRoutes';

export default (app) => {
  app.use(jsend.middleware);
  app.use(responseHandler);

  favouriteRecipesRoutes(app);
  recipesRoutes(app);
  userRoutes(app);
  votesRoutes(app);
};
