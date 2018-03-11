import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import { sessionService } from 'redux-react-session';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { RecipeDetails } from '../../components/recipes/RecipeDetails';
import RecipeDetailsPage from '../../components/recipes/RecipeDetailsPage';

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/**
 * Test setup
 * @returns {Object} object
 */
function setup() {
  const props = {
    isLoggedIn: true,
    firstName: '',
    profilePic: '',
    userId: 1,
    recipe: {},
    recipes: [{ id: 1, upvotes: [1], downvotes: [1] }],
    userFavourites: [{ Favourites: { RecipeId: 1 } }],
    reviewsPaginationMeta: {},
    location: { pathname: '' },
    match: { params: { id: 1 } },
    actions: {
      getRecipe: jest.fn(e => Promise.reject(e)),
      getRecipeReviews: jest.fn(r => Promise.resolve(r)),
      addReview: jest.fn(),
      upvoteRecipe: jest.fn(),
      downvoteRecipe: jest.fn(),
      addFavourite: jest.fn(),
      deleteFavourite: jest.fn()
    }
  };


  const mountedWrapper = mount(<MemoryRouter initialEntries={['/recipe/1']}><RecipeDetails {...props} /></MemoryRouter>);

  const wrapper = shallow(<RecipeDetails
    {...props}
  />);

  return {
    props, mountedWrapper, wrapper
  };
}

describe('RecipeDetails', () => {
  it('should render self and components', () => {
    const { wrapper, mountedWrapper } = setup();
    expect(wrapper.find(RecipeDetailsPage).length).toEqual(1);
    const props = mountedWrapper.find('RecipeDetails').props();
    expect(props.firstName).toEqual('');
  });

  it('should call getRecipe and getRecipeReviews', () => {
    const { props, wrapper } = setup();
    props.recipes[0].id = 2;
    wrapper.instance().componentDidMount();
    expect(props.actions.getRecipe.mock.calls.length).toEqual(1);
    expect(props.actions.getRecipeReviews.mock.calls.length).toEqual(3);
  });

  it('should receive next props', () => {
    const { props, wrapper } = setup();
    wrapper.instance().componentWillReceiveProps(props);
    expect(wrapper.instance().state.hasMoreReviews).toEqual(false);
    props.reviewsPaginationMeta.next = 'next';
    wrapper.instance().componentWillReceiveProps(props);
    expect(wrapper.instance().state.hasMoreReviews).toEqual(true);
  });

  it('should call onAddReviewChange', () => {
    const { wrapper } = setup();
    const event = { target: { value: 'search' } };
    wrapper.instance().onAddReviewChange(event);
    expect(wrapper.instance().state.review).toEqual('search');
  });

  it('should call fetchReviews', () => {
    const { props, wrapper } = setup();
    const event = { preventDefault: () => {} };
    const instance = wrapper.instance();
    instance.fetchReviews(event);
    expect(instance.state.isLoadingReviews).toEqual(true);
    expect(props.actions.getRecipeReviews.mock.calls.length).toEqual(3);
  });

  it('should call getRecipeReviews when there is pagination', () => {
    const { props, wrapper } = setup();
    const event = { preventDefault: () => {} };
    props.reviewsPaginationMeta.next = 'next';
    const instance = wrapper.instance();
    instance.fetchReviews(event);
    expect(props.actions.getRecipeReviews.mock.calls.length).toEqual(3);
  });

  describe('requires token', () => {
    beforeEach((done) => {
      const store = mockStore({});
      const options = { driver: 'COOKIES' };
      sessionService.initSessionService(store, options).then(() => {
        done();
      });
    });

    it('should call onClickSaveReview', () => {
      const { props, mountedWrapper } = setup();
      const event = {
        preventDefault: jest.fn()
      };
      const addReviewProps = mountedWrapper.find('Button').props();
      return addReviewProps.onClick(event).then(() => {
        expect(props.actions.addReview.mock.calls.length).toEqual(1);
      });
    });

    it('should call upvote', () => {
      const { props, mountedWrapper } = setup();
      const event = {
        preventDefault: jest.fn(),
        persist: jest.fn(),
        target: { firstChild: { nodeValue: 'thumb_up' } },
        currentTarget: { classList: { toggle: jest.fn() } }
      };
      const voteButtonProps = mountedWrapper.find('#details-thumb-up').props();
      return voteButtonProps.onClick(event).then(() => {
        expect(props.actions.upvoteRecipe.mock.calls.length).toEqual(1);
      });
    });

    it('should call downvote', () => {
      const { props, mountedWrapper } = setup();
      const event = {
        preventDefault: jest.fn(),
        persist: jest.fn(),
        target: { firstChild: { nodeValue: 'thumb_down' } },
        currentTarget: { classList: { toggle: jest.fn() } }
      };
      const voteButtonProps = mountedWrapper.find('#details-thumb-down').props();
      return voteButtonProps.onClick(event).then(() => {
        expect(props.actions.downvoteRecipe.mock.calls.length).toEqual(1);
      });
    });

    it('should call addFavourite', () => {
      const { props, mountedWrapper } = setup();
      const event = {
        preventDefault: jest.fn(),
        persist: jest.fn(),
        target: { firstChild: { nodeValue: 'thumb_up' } },
        currentTarget: { classList: { toggle: jest.fn(), value: 'favourite' } }
      };
      const favouriteButtonProps = mountedWrapper.find('#details-favourite').props();
      return favouriteButtonProps.onClick(event).then(() => {
        expect(props.actions.addFavourite.mock.calls.length).toEqual(1);
      });
    });

    it('should call deleteFavourite', () => {
      const { props, mountedWrapper } = setup();
      const event = {
        preventDefault: jest.fn(),
        persist: jest.fn(),
        target: { firstChild: { nodeValue: 'thumb_up' } },
        currentTarget: { classList: { toggle: jest.fn(), value: '' } }
      };
      const favouriteButtonProps = mountedWrapper.find('#details-favourite').props();
      return favouriteButtonProps.onClick(event).then(() => {
        expect(props.actions.deleteFavourite.mock.calls.length).toEqual(1);
      });
    });
  });
});
