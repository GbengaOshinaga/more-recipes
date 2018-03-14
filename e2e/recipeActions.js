import faker from 'faker';

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email();
const password = faker.internet.password(7);

const recipeName = faker.random.word();
const recipeDescription = faker.random.words(30);
const ingredient = faker.random.word();
const review = faker.random.words(10);

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
      .assert.containsText('.card-title', recipeName);
  },
  'view and delete recipe': function (browser) {
    browser
      .pause(1000)
      .click('#desc')
      .pause(1000)
      .assert.containsText('.details-content h4', recipeName)
      .click('#details-thumb-up')
      .pause(1000)
      .assert.containsText('#upvotes', 1)
      .pause(1000)
      .click('#details-thumb-down')
      .pause(1000)
      .assert.containsText('#upvotes', 0)
      .assert.containsText('#downvotes', 1)
      .pause(1000)
      .click('#details-favourite')
      .pause(1000)
      .assert.cssClassPresent('#details-favourite', 'red-text')
      .pause(1000)
      .setValue('textarea#review-textarea', review)
      .pause(1000)
      .click('button[type=submit]')
      .pause(1000)
      .waitForElementVisible('.review-card', 1000)
      .assert.containsText('.card-content p', review)
      .back()
      .pause(1000)
      .click('#delete')
      .waitForElementVisible('#confirm-modal', 1000)
      .click('#confirm-delete')
      .pause(1000)
      .assert.elementNotPresent('.recipe-card')
      .end();
  }
};
