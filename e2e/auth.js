/* eslint-disable */
import faker from 'faker';

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();
const password = faker.internet.password(7);

module.exports = {
  'Launch app': function (browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible('body', 1000)
      .pause(1000)
      .click('#sign-up')
      .waitForElementVisible('.sign-body', 1000)
      .pause(1000);
  },
  'Check errors for sign up': function (browser) {
    browser
      .pause(1000)
      .click('button[type=submit]')
      .pause(500)
      .expect.element('div.toast-error').to.be.present;
  },
  'Register user': function (browser) {
    browser
      .setValue('input#firstName', firstName)
      .pause(1000)
      .setValue('input#lastName', lastName)
      .pause(1000)
      .setValue('input#email', email)
      .pause(1000)
      .setValue('input#password', password)
      .pause(1000)
      .setValue('input#confirmPassword', password)
      .pause(1000)
      .click('button[type=submit]')
      .pause(1000)
      .assert.containsText('.dropdown-button', firstName)
      .pause(1000)
      .click('.dropdown-button')
      .pause(1000)
      .click('#logout')
      .pause(1000)
      .assert.urlContains('signin')
      .pause(1000);
  },
  'Sign In a user': function (browser) {
    browser
      .setValue('input#email', email)
      .pause(1000)
      .setValue('input#password', password)
      .pause(1000)
      .click('button[type=submit]')
      .pause(2000)
      .assert.containsText('.dropdown-button', firstName)
      .pause(1000)
      .click('.dropdown-button')
      .pause(1000)
      .click('#logout')
      .pause(1000);
  },
  'Check errors for sign in': function (browser) {
    browser
      .setValue('input#email', 'email@somewhere.com')
      .pause(1000)
      .setValue('input#password', password)
      .pause(1000)
      .click('button[type=submit]')
      .pause(500)
      .expect.element('div.toast-error').text.to.contain('Invalid Credentials');
  },
  end(browser) {
    browser
      .pause(1000)
      .end();
  }
};
