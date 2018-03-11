import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import { Catalog } from '../../components/catalog/Catalog';
import CatalogPage from '../../components/catalog/CatalogPage';

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
      getMostFavouritedRecipes: jest.fn(),
      search: jest.fn()
    },
    mostFavouritedRecipes: [],
    searchResults: [],
    favourites: [],
    paginationMeta: {}
  };


  const mountedWrapper = mount(<BrowserRouter><Catalog {...props} /></BrowserRouter>);

  const wrapper = shallow(<Catalog
    {...props}
  />);

  return {
    props, mountedWrapper, wrapper
  };
}

describe('Catalog', () => {
  it('should render self and components', () => {
    const { mountedWrapper } = setup();
    const catalogProps = mountedWrapper.find('Catalog').props();
    expect(catalogProps.firstName).toEqual('');
    expect(catalogProps.isLoggedIn).toEqual(true);
  });

  it('Should recieve nextprops', () => {
    const { props, wrapper } = setup();
    props.paginationMeta.next = 'next';
    wrapper.instance().componentWillReceiveProps(props);
    expect(wrapper.instance().state.hasMore).toEqual(true);
    wrapper.update();
    expect(wrapper.find(CatalogPage).length).toEqual(1);
  });

  it('should set hasMore state to false', () => {
    const { props, wrapper } = setup();
    props.paginationMeta = {};
    wrapper.instance().componentWillReceiveProps(props);
    expect(wrapper.instance().state.hasMore).toEqual(false);
    wrapper.update();
  });

  it('calls action if there is a search value', () => {
    const { props, mountedWrapper } = setup();
    const input = mountedWrapper.find('.search').props();
    expect(input.placeholder).toEqual('Search Catalog');
    const event = { target: { value: 'search' } };
    input.onChange(event);
    expect(props.actions.search.mock.calls.length).toBe(1);
  });

  it('calls action if there is no search value', () => {
    const { props, mountedWrapper } = setup();
    const input = mountedWrapper.find('.search').props();
    expect(input.placeholder).toEqual('Search Catalog');
    const event = { target: { value: '' } };
    input.onChange(event);
    expect(props.actions.search.mock.calls.length).toBe(0);
  });

  it('should call fetchNext', () => {
    const props = {
      isLoggedIn: true,
      allRecipes: [],
      actions: {
        upvoteRecipe: jest.fn(),
        downvoteRecipe: jest.fn(),
        getAllRecipes: jest.fn(),
        getMostFavouritedRecipes: jest.fn(),
        search: jest.fn()
      },
      mostFavouritedRecipes: [],
      searchResults: [],
      favourites: [],
      paginationMeta: { total: 1 }
    };
    const wrapper = shallow(<Catalog
      {...props}
    />);
    props.paginationMeta.next = 'next';
    wrapper.instance().fetchNext();
    expect(props.actions.getAllRecipes.mock.calls.length).toBe(1);
  });
});
