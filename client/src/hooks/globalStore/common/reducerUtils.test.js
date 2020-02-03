import { upvoteRecipe, downvoteRecipe, revertVoteState } from './reducerUtils';

const state = {
  recipes: [{ id: 1, name: 'Cheesecake', upvotes: [], downvotes: [] }]
};

describe('upvoteRecipe', () => {
  it('should upvote recipe', () => {
    const action = { payload: { recipeId: 1, userId: 2 } };
    const updatedState = upvoteRecipe(state, action);
    const {
      recipes: [{ upvotes }]
    } = updatedState;
    expect(upvotes.length).toEqual(1);
    expect(upvotes[0]).toEqual(2);
  });

  it('should remove upvote if it exists', () => {
    const stateWithUpvote = {
      recipes: [{ id: 1, name: 'Cheesecake', upvotes: [2], downvotes: [] }]
    };
    const action = { payload: { recipeId: 1, userId: 2 } };
    const updatedState = upvoteRecipe(stateWithUpvote, action);
    const {
      recipes: [{ upvotes }]
    } = updatedState;
    expect(upvotes.length).toEqual(0);
  });
});

describe('downvoteRecipe', () => {
  it('should downvote recipe', () => {
    const action = { payload: { recipeId: 1, userId: 2 } };
    const updatedState = downvoteRecipe(state, action);
    const {
      recipes: [{ downvotes }]
    } = updatedState;
    expect(downvotes.length).toEqual(1);
    expect(downvotes[0]).toEqual(2);
  });

  it('should remove downvote if it exists', () => {
    const stateWithDownvote = {
      recipes: [{ id: 1, name: 'Cheesecake', upvotes: [], downvotes: [2] }]
    };
    const action = { payload: { recipeId: 1, userId: 2 } };
    const updatedState = upvoteRecipe(stateWithDownvote, action);
    const {
      recipes: [{ downvotes }]
    } = updatedState;
    expect(downvotes.length).toEqual(0);
  });
});

describe('revertVoteState', () => {
  it('should revert recipe upvote state', () => {
    const action = {
      payload: { id: 1, name: 'Cheesecake', upvotes: [2], downvotes: [] }
    };
    const updatedState = revertVoteState(state, action);
    const {
      recipes: [{ upvotes }]
    } = updatedState;
    expect(upvotes.length).toEqual(1);
    expect(upvotes[0]).toEqual(2);
  });
});
