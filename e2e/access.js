/* eslint-disable */
import faker from 'faker';

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();
const password = faker.internet.password(7);

const recipeName = faker.random.word();
const recipeDescription = faker.random.words(30);
const ingredient = faker.random.word();

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
      .pause(1000)
      .assert.containsText('.dropdown-button', firstName)
      .pause(1000)
      .click('.dropdown-button')
      .pause(1000)
      .click('#my-recipes')
      .pause(1000)
      .assert.containsText('#my-recipes-text', 'My Recipes');
  },
  'Add recipe': function (browser) {
    browser
      .pause(1000)
      .click('.pulse')
      .pause(1000)
      .setValue('input#name', recipeName)
      .pause(1000)
      .setValue('textarea#description', recipeDescription)
      .pause(1000)
      .setValue('#ingredients-chip', ingredient)
      .keys(browser.Keys.ENTER)
      .pause(1000)
      .click('#submit')
      .pause(1000)
      .waitForElementVisible('.recipe-card', 1000)
      .assert.containsText('.card-title', recipeName)
      .pause(1000);
  },
  'Logged out': function (browser) {
    browser
      .click('.dropdown-button')
      .pause(1000)
      .click('#logout')
      .pause(1000)
      .click('.brand-logo')
      .pause(1000)
      .expect.element('.card-action').to.not.be.present;
    browser
      .pause(1000)
      .click('.card-title')
      .pause(1000)
      .expect.element('#vote').to.not.be.present;
    browser
      .pause(1000)
      .assert.visible('#sign-in-review-link')
      .pause(1000)
      .click('#sign-in-review-link')
      .pause(1000)
      .assert.urlContains('signin')
      .setValue('input#email', email)
      .pause(1000)
      .setValue('input#password', password)
      .pause(1000)
      .click('button[type=submit]')
      .pause(2000)
      .assert.urlContains('recipe')
      .assert.visible('.review-card')
      .pause(1000)
      .click('.dropdown-button')
      .pause(1000)
      .click('#logout')
      .pause(1000)
      .url('http://localhost:8000/profile')
      .pause(1000)
      .assert.urlContains('signin')
      .pause(1000)
      .setValue('input#email', email)
      .pause(1000)
      .setValue('input#password', password)
      .pause(1000)
      .click('button[type=submit]')
      .pause(2000)
      .assert.urlContains('profile')
  },
  'Delete recipe': function (browser) {
      browser
      .click('.dropdown-button')
      .pause(1000)
      .click('#my-recipes')
      .pause(1000)
      .click('#delete')
      .waitForElementVisible('#confirm-modal', 1000)
      .click('#confirm-delete')
      .pause(1000)
      .assert.elementNotPresent('.recipe-card')
      .end();
  }
};
