import jsend from 'jsend';
import favouriteRecipesRoutes from './favouriteRecipesRoutes';
import recipesRoutes from './recipesRoutes';
import userRoutes from './userRoutes';
import votesRoutes from './votesRoutes';

export default (app) => {
  app.use(jsend.middleware);

  favouriteRecipesRoutes(app);
  recipesRoutes(app);
  userRoutes(app);
  votesRoutes(app);
};
