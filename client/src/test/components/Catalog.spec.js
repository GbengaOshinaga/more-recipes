import React from 'react';
import Enzyme, { mount } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Catalog } from '../../components/catalog/Catalog';

const mockStore = configureStore({});

Enzyme.configure({ adapter: new Adapter() });

/**
 * Test setup
 * @returns {Object} object
 */
function setup() {
  const props = {
    isLoggedIn: true,
    allRecipes: [],
    actions: {
      upvoteRecipe: jest.fn(),
      downvoteRecipe: jest.fn(),
      getAllRecipes: jest.fn(),
      getMostFavouritedRecipes: jest.fn()
    },
    mostFavouritedRecipes: [],
    searchResults: [],
    favourites: [],
    paginationMeta: {}
  };

  const store = mockStore({
    recipes: [],
    mostFavourited: [],
    searchResults: [],
    userFavourites: [],
    session: {
      authenticated: true,
      checked: true,
      user:
        { firstName: '' }
    }
  });


  const enzymeWrapper = mount(<BrowserRouter><Catalog store={store} {...props} /></BrowserRouter>);

  return {
    props, enzymeWrapper
  };
}

describe('Catalog', () => {
  it('should render self and components', () => {
    const { enzymeWrapper } = setup();
    const catalogProps = enzymeWrapper.find('Catalog').props();
    expect(catalogProps.firstName).toEqual('');
    expect(catalogProps.isLoggedIn).toEqual(true);
  });
});
