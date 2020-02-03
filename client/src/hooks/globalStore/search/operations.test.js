import operations from './operations';

const actions = {
  setIsSearching: jest.fn(),
  saveResults: jest.fn(),
  saveNextResults: jest.fn(),
  clearResults: jest.fn()
};

const api = { searchRecipes: jest.fn() };

const response = {
  status: 'success',
  data: { recipes: [{ name: 'recipe' }], paginationMeta: { next: 'url' } }
};

const { searchRecipes, getNextSearchResults } = operations(actions, api);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('searchRecipes', () => {
  it('should search recipes successfully', async () => {
    api.searchRecipes.mockResolvedValue(response);

    await searchRecipes('cheese');

    expect(actions.setIsSearching).toHaveBeenCalledWith(true);
    expect(api.searchRecipes).toHaveBeenCalledWith('cheese');
    expect(actions.saveResults).toHaveBeenCalledWith(response.data);
    expect(actions.setIsSearching).toHaveBeenCalledWith(false);
  });

  it('should handle error case and clear results', async () => {
    const testError = new Error(123);
    api.searchRecipes.mockRejectedValue(testError);

    await searchRecipes('cheese');

    expect(actions.setIsSearching).toHaveBeenCalledWith(true);
    expect(api.searchRecipes).toHaveBeenCalledWith('cheese');
    expect(actions.saveResults).not.toHaveBeenCalled();
    expect(actions.clearResults).toHaveBeenCalled();
    expect(actions.setIsSearching).toHaveBeenCalledWith(false);
  });
});

describe('getNextSearchResults', () => {
  it('should successfully get next search results', async () => {
    api.searchRecipes.mockResolvedValue(response);

    await getNextSearchResults('cheese', 'url');

    expect(api.searchRecipes).toHaveBeenCalledWith('cheese', 'url');
    expect(actions.saveNextResults).toHaveBeenCalledWith(response.data);
  });

  it('should handle error case', async () => {
    const testError = new Error(123);
    api.searchRecipes.mockRejectedValue(testError);

    await getNextSearchResults('cheese', 'url');

    expect(api.searchRecipes).toHaveBeenCalledWith('cheese', 'url');
    expect(actions.saveNextResults).not.toHaveBeenCalledWith(response.data);
  });
});
