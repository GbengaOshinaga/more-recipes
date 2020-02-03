import operations from './operations';

const actions = {
  setIsFetchingMostFav: jest.fn(),
  saveMostFavorites: jest.fn()
};

const api = {
  getMostFavoritedRecipes: jest.fn()
};

const recipesResponse = {
  status: 'success',
  data: { recipes: [{ name: 'recipe' }], paginationMeta: { next: 'url' } }
};

const { fetchMostFavoritedRecipes } = operations(actions, api);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('fetchMostFavoritedRecipes', () => {
  it('should fetch most favorited recipes successfully', async () => {
    api.getMostFavoritedRecipes.mockResolvedValue(recipesResponse);

    await fetchMostFavoritedRecipes();

    expect(actions.setIsFetchingMostFav).toHaveBeenCalledWith(true);
    expect(api.getMostFavoritedRecipes).toHaveBeenCalled();
    expect(actions.saveMostFavorites).toHaveBeenCalledWith(
      recipesResponse.data
    );
    expect(actions.setIsFetchingMostFav).toHaveBeenCalledWith(false);
  });

  it('should handle error case', async () => {
    const testError = new Error(123);
    api.getMostFavoritedRecipes.mockRejectedValue(testError);

    await fetchMostFavoritedRecipes();

    expect(actions.setIsFetchingMostFav).toHaveBeenCalledWith(true);
    expect(api.getMostFavoritedRecipes).toHaveBeenCalled();
    expect(actions.saveMostFavorites).not.toHaveBeenCalled();
    expect(actions.setIsFetchingMostFav).toHaveBeenCalledWith(false);
  });
});
