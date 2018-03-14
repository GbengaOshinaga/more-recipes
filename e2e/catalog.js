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
  Catalog(browser) {
    browser
      .click('#catalog-link')
      .pause(1000)
      .waitForElementVisible('.parallax-container', 1000)
      .pause(1000)
      .assert.visible('#all')
      .assert.containsText('.card-title', recipeName)
      .click('#upvote-button')
      .pause(1000)
      .assert.cssClassPresent('#upvote-button', 'green-text')
      .click('#downvote-button')
      .pause(1000)
      .assert.cssClassPresent('#downvote-button', 'black-text')
      .pause(1000)
      .assert.cssClassNotPresent('#upvote-button', 'green-text')
      .click('#favourite-button')
      .pause(1000)
      .assert.cssClassPresent('#favourite-button', 'red-text')
      .pause(1000)
      .click('#most-fav-link')
      .pause(1000)
      .assert.visible('#most-fav')
      .click('#all-link')
      .assert.visible('#all')
      .pause(1000);
  },
  Search(browser) {
    browser
      .pause(1000)
      .assert.visible('input.search')
      .setValue('input.search', 'search')
      .pause(1000)
      .assert.visible('#search-results-link')
      .pause(1000)
      .end();
  }
};
