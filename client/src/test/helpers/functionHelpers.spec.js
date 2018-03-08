import expect from 'expect';
import updateClassName from '../../helpers/functionHelpers';

describe('Function helpers', () => {
  it('should return object of classnames', () => {
    const classnames = updateClassName({
      id: 1, name: 'Fried Chicken', upvotes: [1], downvotes: []
    }, 1);
    expect(classnames).toBeTruthy();
    expect(classnames.upvoteClassName).toEqual('upvotes green-text');
    expect(classnames.downvoteClassName).toEqual('downvotes');
    expect(classnames.favouriteClassName).toEqual('favourite red-text');
  });

  it('should return object of classnames', () => {
    const classnames = updateClassName({
      id: 1, name: 'Fried Chicken', upvotes: [], downvotes: [1]
    }, 1);
    expect(classnames).toBeTruthy();
    expect(classnames.upvoteClassName).toEqual('upvotes');
    expect(classnames.downvoteClassName).toEqual('downvotes black-text');
    expect(classnames.favouriteClassName).toEqual('favourite red-text');
  });

  it('should return object of classnames', () => {
    const classnames = updateClassName({
      id: 1, name: 'Fried Chicken', upvotes: [1], downvotes: []
    }, 1, [
      { Favourites: { RecipeId: 1 } }
    ]);
    expect(classnames).toBeTruthy();
    expect(classnames.upvoteClassName).toEqual('upvotes green-text');
    expect(classnames.downvoteClassName).toEqual('downvotes');
    expect(classnames.favouriteClassName).toEqual('favourite red-text');
  });

  it('should return object of classnames', () => {
    const classnames = updateClassName({
      id: 1, name: 'Fried Chicken', upvotes: [1], downvotes: []
    }, 1, [
      { Favourites: { RecipeId: 2 } }
    ]);
    expect(classnames).toBeTruthy();
    expect(classnames.upvoteClassName).toEqual('upvotes green-text');
    expect(classnames.downvoteClassName).toEqual('downvotes');
    expect(classnames.favouriteClassName).toEqual('favourite');
  });
});
