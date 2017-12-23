[![Build Status](https://travis-ci.org/GbengaOshinaga/more-recipes.svg?branch=development)](https://travis-ci.org/GbengaOshinaga/more-recipes)[![Maintainability](https://api.codeclimate.com/v1/badges/65b81f8376a6f0d3eaf8/maintainability)](https://codeclimate.com/github/GbengaOshinaga/more-recipes/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/GbengaOshinaga/more-recipes/badge.svg?branch=development)](https://coveralls.io/github/GbengaOshinaga/more-recipes?branch=development)

# More-Recipes

Platform for users to share the awesome and exciting recipe ideas they have invented or learnt.

### Built With

#### Back-End
 - Node JS
 - Express
 - Postgresql Database
 - Sequelize ORM

 #### Front-End
 - Materialize CSS
 - SASS

### Test Framework
 - Mocha
 - Chai
 
### Template URL

https://gbengaoshinaga.github.io/more-recipes/template/

### Getting Started With the API
 - Clone the repository
  ```
  git clone https://github.com/GbengaOshinaga/more-recipes
  ```
 - Change directory into more-recipes
  ```
  cd more-recipes
  ```
 - Install dependecies
  ```
  npm install
  ```
 - Setup a postgresql database and name it 'more_recipes'

 - Run the server
  ```
  npm run start
  ```
  - Run tests
  ```
  npm run test
  ```

  ## API Routes
  
  #### Signs Up a user - ```POST /api/v1/users/signup```
+ firstName (string) - User's first name
+ lastName (string) - User's last name
+ email (string) - User's email
+ password (string) - Password for user, length must be greater than 6
+ confirmPassword (string) - Confirm password for validation

#### Signs in a user - ```POST /api/v1/users/signin```
+ email (string) - User's email
+ password (string) - User's password

#### Edits a user - ```POST /api/v1/users/edit```
 Requires authentication
+ firstName (string) - User's first name
+ lastName (string) - User's last name
+ email (string) - User's email
+ profilePic (string) - URL to user's profile picture
+ about (string) - User's about

#### Get user by id - ```GET /api/v1/user/{user_id}```

#### Delete a user - ```DELETE /api/v1/user/{user_id}```
 Requires authentication

#### Gets recipes created by user - ```GET /api/v1/users/recipes```
 Requires authentication

#### Adds favourite recipe for a user - ```POST /api/v1/users/recipes/{recipe_id}/favourites```
 Requires authentication

#### Deletes favourite recipe for a user - ```DELETE /api/v1/users/recipes/{recipe_id}/favourites```
 Requires authentication

#### Gets all favourite recipes for a user - ```GET /api/v1/users/recipes/favourites```
 Requires authentication

#### Adds a recipe - ```POST /api/v1/recipes```
 Requires authentication
+ name (string) - Name of the recipe
+ description (string) - Description of the recipe
+ ingredients (string) - Ingredients for the recipe, it should be a comma-separated string of ingredients, e.g 'pepper,salt,sauce'

#### Gets all recipes - ```GET /api/v1/recipes```

#### Gets all recipes and sorts them by votes - ```GET /api/v1/recipes?sort=upvotes&order=asc```

#### Searches for a recipe with query - ```GET /api/v1/recipes?query=search```

#### Paginates recipe - ```GET /api/v1/recipes?from=0&to=5```

#### Gets recipe by id - ```GET /api/v1/recipes/{recipe_id}```
 Get recipe with the specified id in the url

#### Edits recipe - ```PUT /api/v1/recipes/{recipe_id}```
 Requires authentication. User can only edit a recipe they created.
 Edits recipe with the specified id in the url. Any one of the parameters below can be passed
+ name (string) - Name of the recipe
+ description (string) - Description of the recipe
+ ingredients (string) - Ingredients for the recipe, it should be a comma-separated string of ingredients, e.g 'pepper,salt,sauce'

#### Deletes recipe - ```DELETE /api/v1/recipes/{recipe_id}```
 Requires authentication. User can only delete a recipe they created

#### Add review for a recipe - ```POST /api/v1/recipes/{recipe_id}/reviews```
 Requires authentication
+ review (string) - Review

#### Edit review - ```PUT /api/v1/recipes/reviews/{review_id}```
 Requires authentication

#### Delete review - ```DELETE /api/v1/recipes/reviews/{review_id}```
 Requires authentication

#### Upvote a recipe - ```POST /api/v1/recipes/upvote/{recipe_id}```
 Requires authentication

#### Downvote a recipe - ```POST /api/v1/recipes/downvote/{recipe_id}```
 Requires authentication