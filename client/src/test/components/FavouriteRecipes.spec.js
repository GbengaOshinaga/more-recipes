import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import { sessionService } from 'redux-react-session';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { FavouriteRecipes } from '../../components/recipes/FavouriteRecipes';

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
    recipes: [],
    userId: 0,
    actions: {
      getFavourites: jest.fn(r => Promise.resolve(r)),
      upvoteRecipe: jest.fn(),
      downvoteRecipe: jest.fn(),
      deleteFavourite: jest.fn(r => Promise.resolve(r))
    }
  };


  const mountedWrapper = mount(<BrowserRouter><FavouriteRecipes {...props} /></BrowserRouter>);

  const wrapper = shallow(<FavouriteRecipes
    {...props}
  />);

  return {
    props, mountedWrapper, wrapper
  };
}

describe('FavouriteRecipes', () => {
  beforeEach((done) => {
    const store = mockStore({});
    const options = { driver: 'COOKIES' };
    sessionService.initSessionService(store, options).then(() => {
      done();
    });
  });

  it('should call getFavourites', () => {
    const { props, wrapper } = setup();
    return wrapper.instance().componentDidMount().then(() => {
      expect(props.actions.getFavourites.mock.calls.length).toEqual(3);
    });
  });

  it('should call upvote', () => {
    const { props, wrapper } = setup();
    const event = {
      preventDefault: jest.fn(),
      persist: jest.fn(),
      target: { firstChild: { nodeValue: 'thumb_up' } },
      currentTarget: { classList: { toggle: jest.fn() } }
    };
    return wrapper.instance().vote(event).then(() => {
      expect(props.actions.upvoteRecipe.mock.calls.length).toEqual(1);
    });
  });

  it('should call downvote', () => {
    const { props, wrapper } = setup();
    const event = {
      preventDefault: jest.fn(),
      persist: jest.fn(),
      target: { firstChild: { nodeValue: 'thumb_down' } },
      currentTarget: { classList: { toggle: jest.fn() } }
    };
    return wrapper.instance().vote(event).then(() => {
      expect(props.actions.downvoteRecipe.mock.calls.length).toEqual(1);
    });
  });

  it('should call deleteFavourite', () => {
    const { props, wrapper } = setup();
    const event = {
      preventDefault: jest.fn(),
      persist: jest.fn(),
      target: { id: 0 },
    };
    return wrapper.instance().removeFavourite(event).then(() => {
      expect(props.actions.deleteFavourite.mock.calls.length).toEqual(1);
    });
  });
});

