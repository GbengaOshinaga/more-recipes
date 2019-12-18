import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import app from '../../app';
import db from '../../models';

const { expect } = chai;
chai.use(chaiHttp);

let userId;

describe('Users can perform actions on recipe', () => {
  let token;
  let token2;
  let recipeId;
  let reviewId;

  before(async () => {
    const user = await db.User.create({
      firstName: faker.name.findName(),
      lastName: faker.name.findName(),
      email: faker.internet.email(),
      password: await bcrypt.hash('password', 10)
    });
    userId = user.id;
    token = jwt.sign({ userId: user.id, email: user.email }, 'mysecret');

    const user2 = await db.User.create({
      firstName: faker.name.findName(),
      lastName: faker.name.findName(),
      email: faker.internet.email(),
      password: await bcrypt.hash('password', 10)
    });
    token2 = jwt.sign({ userId: user2.id, email: user2.email }, 'mysecret');
  });

  it('should add a recipe', done => {
    const recipeName = faker.name.findName();
    const desc = faker.lorem.sentence();
    chai
      .request(app)
      .post('/api/v1/recipes')
      .set('Access-Token', token)
      .send({
        name: recipeName,
        description: desc,
        ingredients: 'ingredient1,ingredient2'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data.recipe.name).to.equal(recipeName);
        recipeId = res.body.data.recipe.id;
        done();
      });
  });

  it('should get recipe by id', done => {
    chai
      .request(app)
      .get('/api/v1/recipes/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.recipe.id).to.equal(1);
        done();
      });
  });

  describe('Sort Order', () => {
    before(async () => {
      // eslint-disable-next-line
      const recipes = await db.Recipes.bulkCreate([
        {
          name: faker.name.findName(),
          description: faker.lorem.sentence(),
          UserId: userId,
          ingredients: ['ingredient1', 'ingredient2'],
          upvotes: [1, 2, 3, 4, 5, 6]
        },
        {
          name: faker.name.findName(),
          description: faker.lorem.sentence(),
          UserId: userId,
          ingredients: ['ingredient3', 'ingredient4'],
          upvotes: [1, 2, 3, 4, 5]
        },
        {
          name: faker.name.findName(),
          description: faker.lorem.sentence(),
          UserId: userId,
          ingredients: ['ingredient5', 'ingredient6'],
          upvotes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
          name: faker.name.findName(),
          description: faker.lorem.sentence(),
          UserId: userId,
          ingredients: ['ingredient7', 'ingredient8'],
          upvotes: [1, 2, 3]
        }
      ]);
    });

    it('should get recipes by sort order', done => {
      chai
        .request(app)
        .get('/api/v1/recipes?sort=upvotes&order=desc')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.recipes).to.be.an('array');
          expect(res.body.data.recipes[0].upvotes.length).to.equal(10);
          done();
        });
    });

    it('should get all recipes', done => {
      chai
        .request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.recipes).to.be.an('array');
          expect(res.body.data.recipes.length).to.be.greaterThan(3);
          done();
        });
    });
  });

  it('should modify recipe', done => {
    const name = faker.name.findName();
    chai
      .request(app)
      .put(`/api/v1/recipes/${recipeId}`)
      .set('Access-Token', token)
      .send({
        name
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.updatedRecipe.name).to.equal(name);
        done();
      });
  });

  it('it should return unknown recipe', done => {
    const name = faker.name.findName();
    chai
      .request(app)
      .put('/api/v1/recipes/99')
      .set('Access-Token', token)
      .send({
        name
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal(
          'Recipe with specified id does not exist'
        );
        done();
      });
  });

  it('should fail when editing recipe user did not create', done => {
    const name = faker.name.findName();
    chai
      .request(app)
      .put(`/api/v1/recipes/${recipeId}`)
      .set('Access-Token', token2)
      .send({
        name
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal(
          'You are not authorized to edit this recipe'
        );
        done();
      });
  });

  it('should post a review for a recipe', done => {
    const review = faker.lorem.sentence();
    chai
      .request(app)
      .post('/api/v1/recipes/1/reviews')
      .set('Access-Token', token)
      .send({
        review
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data.review.review).to.equal(review);
        reviewId = res.body.data.review.id;
        done();
      });
  });

  it('should edit a review for a recipe', done => {
    const review = faker.lorem.sentence();
    chai
      .request(app)
      .put(`/api/v1/recipes/${reviewId}/reviews`)
      .set('Access-Token', token)
      .send({
        review
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.updatedReview.review).to.equal(review);
        done();
      });
  });

  it('should return unauthorized when editing review user did not create', done => {
    const review = faker.lorem.sentence();
    chai
      .request(app)
      .put(`/api/v1/recipes/${reviewId}/reviews`)
      .set('Access-Token', token2)
      .send({
        review
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal(
          'You are not authorized to edit this review'
        );
        done();
      });
  });

  it('should return not found when editing an unknown review', done => {
    const review = faker.lorem.sentence();
    chai
      .request(app)
      .put('/api/v1/recipes/99/reviews')
      .set('Access-Token', token)
      .send({
        review
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal(
          'Review with specified id does not exist'
        );
        done();
      });
  });

  it('should return unauthorized when deleting review user did not create', done => {
    chai
      .request(app)
      .del(`/api/v1/recipes/${reviewId}/reviews`)
      .set('Access-Token', token2)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal(
          'You are not authorized to delete this review'
        );
        done();
      });
  });

  it('should return not found when deleting unknown review', done => {
    chai
      .request(app)
      .del('/api/v1/recipes/99/reviews')
      .set('Access-Token', token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal(
          'Review with specified id does not exist'
        );
        done();
      });
  });

  it('should delete a review for a recipe', done => {
    chai
      .request(app)
      .del(`/api/v1/recipes/${reviewId}/reviews`)
      .set('Access-Token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'Review has been successfully deleted'
        );
        done();
      });
  });

  it('should get recipes created by user', done => {
    chai
      .request(app)
      .get('/api/v1/users/recipes')
      .set('Access-Token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.recipes).to.be.an('array');
        done();
      });
  });

  it('should fail when deleting recipe user did not create', done => {
    chai
      .request(app)
      .del(`/api/v1/recipes/${recipeId}`)
      .set('Access-Token', token2)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal(
          'You are not authorized to delete this recipe'
        );
        done();
      });
  });

  it('it should delete recipe', done => {
    chai
      .request(app)
      .del(`/api/v1/recipes/${recipeId}`)
      .set('Access-Token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'Recipe has been successfully deleted'
        );
        done();
      });
  });

  it('it should return unknown recipe', done => {
    chai
      .request(app)
      .del(`/api/v1/recipes/${recipeId}`)
      .set('Access-Token', token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal(
          'Recipe with specified id does not exist'
        );
        done();
      });
  });
});

describe('Pagination', () => {
  before(async () => {
    db.Recipes.bulkCreate([
      {
        name: faker.name.findName(),
        description: faker.lorem.sentence(),
        UserId: userId,
        ingredients: ['ingredient1', 'ingredient2']
      },
      {
        name: faker.name.findName(),
        description: faker.lorem.sentence(),
        UserId: userId,
        ingredients: ['ingredient3', 'ingredient4']
      },
      {
        name: faker.name.findName(),
        description: faker.lorem.sentence(),
        UserId: userId,
        ingredients: ['ingredient5', 'ingredient6']
      },
      {
        name: faker.name.findName(),
        description: faker.lorem.sentence(),
        UserId: userId,
        ingredients: ['ingredient7', 'ingredient8']
      },
      {
        name: faker.name.findName(),
        description: faker.lorem.sentence(),
        UserId: userId,
        ingredients: ['ingredient9', 'ingredient10']
      },
      {
        name: faker.name.findName(),
        description: faker.lorem.sentence(),
        UserId: userId,
        ingredients: ['ingredient11', 'ingredient12']
      },
      {
        name: faker.name.findName(),
        description: faker.lorem.sentence(),
        UserId: userId,
        ingredients: ['ingredient13', 'ingredient14']
      },
      {
        name: faker.name.findName(),
        description: faker.lorem.sentence(),
        UserId: userId,
        ingredients: ['ingredient15', 'ingredient16']
      },
      {
        name: faker.name.findName(),
        description: faker.lorem.sentence(),
        UserId: userId,
        ingredients: ['ingredient17', 'ingredient18']
      },
      {
        name: faker.name.findName(),
        description: faker.lorem.sentence(),
        UserId: userId,
        ingredients: ['ingredient19', 'ingredient20']
      }
    ]);
  });

  it('should return only five recipes', done => {
    chai
      .request(app)
      .get('/api/v1/recipes?from=0&limit=5')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.recipes).to.be.an('array');
        expect(res.body.data.recipes.length).to.equal(5);
        done();
      });
  });
});

describe('Search for recipe', () => {
  let recipeName;

  before(async () => {
    const user = await db.User.create({
      firstName: faker.name.findName(),
      lastName: faker.name.findName(),
      email: faker.internet.email(),
      password: await bcrypt.hash('password', 10)
    });
    const recipe = await db.Recipes.create({
      name: faker.name.findName(),
      description: faker.lorem.sentence(),
      UserId: user.id,
      ingredients: ['ingredient1', 'ingredient2']
    });
    recipeName = recipe.name;
  });

  it('should search and return recipe', done => {
    chai
      .request(app)
      .get(`/api/v1/recipes?query=${recipeName}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.recipes[0].name).to.equal(recipeName);
        done();
      });
  });

  it('should search and return not found', done => {
    chai
      .request(app)
      .get('/api/v1/recipes?query=notfound')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('No Results Found');
        done();
      });
  });
});
