/* eslint-disable */
import faker from 'faker';

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();
const password = faker.internet.password(7);
const about = faker.random.words(10);

module.exports = {
  'Sign up user': function (browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible('body', 1000)
      .pause(1000)
      .click('#sign-up')
      .waitForElementVisible('.sign-body', 1000)
      .pause(1000)
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
      .pause(1000);
  },
  'Edit profile': function (browser) {
    browser
      .click('.dropdown-button')
      .pause(1000)
      .click('#profile')
      .pause(1000)
      .waitForElementVisible('.profile-body', 1000)
      .pause(1000)
      .click('#edit-button')
      .pause(1000)
      .expect.element('input#firstName').to.be.enabled;
    browser
      .setValue('textarea#about', about)
      .click('#save-button')
      .expect.element('input#firstName').to.not.be.enabled;
    browser
      .pause(1000)
      .assert.containsText('textarea#about', about)
      .end();
  }
};
