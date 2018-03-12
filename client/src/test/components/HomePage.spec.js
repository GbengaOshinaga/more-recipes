import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { sessionService } from 'redux-react-session';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import HomePage from '../../components/home/HomePage';

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('HomePage', () => {
  beforeEach((done) => {
    const store = mockStore({});
    const options = { driver: 'COOKIES' };
    sessionService.initSessionService(store, options).then(() => {
      done();
    });
  });

  it('should set isAuthenticated to true', () => {
    const wrapper = shallow(<HomePage />);
    return wrapper.instance().componentWillMount().then(() => {
      expect(wrapper.instance().state.isAuthenticated).toEqual(true);
    });
  });
});
