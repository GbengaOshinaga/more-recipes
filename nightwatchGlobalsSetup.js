const chromedriver = require('chromedriver');

module.exports = {
  default: {
    launch_url: 'localhost:3000',
  },
  before: (done) => {
    chromedriver.start();
    done();
  },

  after: (done) => {
    chromedriver.stop();
    done();
  },
};
