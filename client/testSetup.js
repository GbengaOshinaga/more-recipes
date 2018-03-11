import Cookies from 'js-cookie';

global.$ = () => ({
  tabs: () => null,
  attr: () => null,
  sideNav: () => null,
  modal: () => null,
  parallax: () => null,
  show: () => null,
  hide: () => null,
  dropdown: () => null,
  scroll: () => null
});

global.jquery = global.$;

global.e = {
  target: {
    name: 'input',
    value: 'input'
  }
};

Object.defineProperty(document, 'cookie', {
  value: Cookies.set('USER-SESSION', 'session', { expires: 360 })
});
