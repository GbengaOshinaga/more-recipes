import React from 'react';
import Enzyme, { mount } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import Catalog from '../../components/catalog/Catalog';

Enzyme.configure({ adapter: new Adapter() });

/**
 * Test setup
 * @returns {Object} object
 */
function setup() {
  const props = {
    upvoteRecipe: jest.fn(),
    downvoteRecipe: jest.fn()
  };

  const enzymeWrapper = mount(<Catalog {...props} />);

  return {
    props, enzymeWrapper
  };
}

describe('Catalog', () => {
  it('should render self and components', () => {
    const { enzymeWrapper } = setup();

    const catalogHeaderProps = enzymeWrapper.find('CatalogHeader').props();
    expect(catalogHeaderProps.firstName).toEqual('');
  });
});
