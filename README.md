[![Build Status](https://travis-ci.org/GbengaOshinaga/more-recipes.svg?branch=development)](https://travis-ci.org/GbengaOshinaga/more-recipes)[![Maintainability](https://api.codeclimate.com/v1/badges/65b81f8376a6f0d3eaf8/maintainability)](https://codeclimate.com/github/GbengaOshinaga/more-recipes/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/GbengaOshinaga/more-recipes/badge.svg?branch=development)](https://coveralls.io/github/GbengaOshinaga/more-recipes?branch=development)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


# More-Recipes

More-Recipes is an open-source web application for users to discover recipes. Users can create, vote for and favourite recipes that they love.

## Getting Started

This project was written in react and redux for the client, and express for the server. This section explains how to get started

### Prerequisites

Node JS is required for this project. Install it here: https://nodejs.org/en/
Add a .env file with the property `JWT_SECRET='your secret'` to the root of the application for your authentication

### Installing

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
 - Migrate to the database
  ```
  ./node_modules/.bin/sequelize db:migrate
  ```
 - Start the application
  ```
  npm run start:dev
  ```

## Running the tests
```
 npm run test
```
## Deployment

Run `npm run build` to build the application for production

### Built With

#### Server
 - Node JS
 - Express
 - Postgresql Database
 - Sequelize ORM

 #### Client
 - React
 - Redux
 - Materialize CSS
 - SASS

### Test Framework
 - Mocha
 - Chai
 - Jest
 
### Template URL

https://gbengaoshinaga.github.io/more-recipes/template/

### Application URL

https://more-recipe-gbenga.herokuapp.com/
## API Routes
  
Signs Up a user - ```POST /api/v1/users/signup```

Signs in a user - ```POST /api/v1/users/signin```

Edits a user - ```POST /api/v1/users/edit```

Get user by id - ```GET /api/v1/user/{user_id}```

Delete a user - ```DELETE /api/v1/user/{user_id}```

Gets recipes created by user - ```GET /api/v1/users/recipes```

Adds favourite recipe for a user - ```POST /api/v1/users/recipes/{recipe_id}/favourites```

Deletes favourite recipe for a user - ```DELETE /api/v1/users/recipes/{recipe_id}/favourites```

Gets all favourite recipes for a user - ```GET /api/v1/users/recipes/favourites```

Adds a recipe - ```POST /api/v1/recipes```

Gets paginated recipes - ```GET /api/v1/recipes```

Gets paginated recipes and sorts them by votes - ```GET /api/v1/recipes?sort=upvotes&order=asc```

Searches for recipes with query - ```GET /api/v1/recipes?query=search```

Paginates recipe - ```GET /api/v1/recipes?from=0&to=5```

Gets recipe by id - ```GET /api/v1/recipes/{recipe_id}```

Edits recipe - ```PUT /api/v1/recipes/{recipe_id}```

Deletes recipe - ```DELETE /api/v1/recipes/{recipe_id}```

Add review for a recipe - ```POST /api/v1/recipes/{recipe_id}/reviews```

Edit review - ```PUT /api/v1/recipes/reviews/{review_id}```

Delete review - ```DELETE /api/v1/recipes/reviews/{review_id}```

Upvote a recipe - ```POST /api/v1/recipes/upvote/{recipe_id}```

Downvote a recipe - ```POST /api/v1/recipes/downvote/{recipe_id}```
