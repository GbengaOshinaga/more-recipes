import operations from './operations';

const actions = {
  saveRecipes: jest.fn(),
  setIsFetching: jest.fn(),
  updateUpvoteOptimistically: jest.fn(),
  updateUpvoteRevert: jest.fn(),
  updateDownvoteOptimistically: jest.fn(),
  updateDownvoteRevert: jest.fn(),
  saveNextRecipes: jest.fn()
};

const api = {
  getAllRecipes: jest.fn(),
  upvoteRecipe: jest.fn(),
  downvoteRecipe: jest.fn()
};

const userId = 1;

const recipesResponse = {
  status: 'success',
  data: { recipes: [{ name: 'recipe' }], paginationMeta: { next: 'url' } }
};

const recipe = {
  id: 3,
  name: 'recipe'
};

const {
  fetchRecipes,
  fetchNextRecipes,
  upvoteRecipe,
  downvoteRecipe
} = operations(actions, api, userId);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('fetchRecipes', () => {
  it('should fetch recipes successfully', async () => {
    api.getAllRecipes.mockResolvedValue(recipesResponse);

    await fetchRecipes();

    expect(actions.setIsFetching).toHaveBeenCalledWith(true);
    expect(actions.saveRecipes).toHaveBeenCalledWith(recipesResponse.data);
    expect(actions.setIsFetching).toHaveBeenCalledWith(false);
  });

  it('should handle error case', async () => {
    const testError = new Error(123);
    api.getAllRecipes.mockRejectedValue(testError);

    await fetchRecipes();

    expect(actions.setIsFetching).toHaveBeenCalledWith(true);
    expect(actions.saveRecipes).not.toHaveBeenCalled();
    expect(actions.setIsFetching).toHaveBeenCalledWith(false);
  });
});

describe('fetchNextRecipes', () => {
  it('should fetch recipes successfully', async () => {
    api.getAllRecipes.mockResolvedValue(recipesResponse);

    await fetchNextRecipes('url');

    expect(actions.saveNextRecipes).toHaveBeenCalledWith(recipesResponse.data);
  });

  it('should handle error case', async () => {
    const testError = new Error(123);
    api.getAllRecipes.mockRejectedValue(testError);

    await fetchNextRecipes('url');

    expect(actions.saveNextRecipes).not.toHaveBeenCalled();
  });
});

describe('upvoteRecipe', () => {
  it('should upvote recipe', async () => {
    await upvoteRecipe(recipe);

    expect(actions.updateUpvoteOptimistically).toHaveBeenCalledWith(
      recipe.id,
      userId
    );
    expect(api.upvoteRecipe).toHaveBeenCalledWith(recipe.id);
  });

  it('should handle error and revert upvote', async () => {
    const testError = new Error(123);
    api.upvoteRecipe.mockRejectedValue(testError);

    await upvoteRecipe(recipe);

    expect(actions.updateUpvoteOptimistically).toHaveBeenCalledWith(
      recipe.id,
      userId
    );
    expect(api.upvoteRecipe).toHaveBeenCalledWith(recipe.id);
    expect(actions.updateUpvoteRevert).toHaveBeenCalledWith(recipe);
  });
});

describe('downvoteRecipe', () => {
  it('should downvote recipe', async () => {
    await downvoteRecipe(recipe);

    expect(actions.updateDownvoteOptimistically).toHaveBeenCalledWith(
      recipe.id,
      userId
    );
    expect(api.downvoteRecipe).toHaveBeenCalledWith(recipe.id);
  });

  it('should handle error and revert upvote', async () => {
    const testError = new Error(123);
    api.downvoteRecipe.mockRejectedValue(testError);

    await downvoteRecipe(recipe);

    expect(actions.updateDownvoteOptimistically).toHaveBeenCalledWith(
      recipe.id,
      userId
    );
    expect(api.downvoteRecipe).toHaveBeenCalledWith(recipe.id);
    expect(actions.updateDownvoteRevert).toHaveBeenCalledWith(recipe);
  });
});
