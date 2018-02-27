global.$ = () => ({
  tabs: () => null,
  attr: () => null,
  sideNav: () => null,
  modal: () => null,
  parallax: () => null,
  show: () => null,
  hide: () => null,
  dropdown: () => null
});

global.jquery = global.$;

global.e = {
  target: {
    name: 'input',
    value: 'input'
  }
};


global.swal = () => Promise.resolve(true);
