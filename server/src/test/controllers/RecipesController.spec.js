import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import app from '../../app';
import db from '../../models';

const { expect } = chai;
chai.use(chaiHttp);

describe('Users can perform actions on recipe', () => {
  let token;
  let token2;
  let recipeId;
  before(async () => {
    const user = await db.User.create({
      firstName: faker.name.findName(),
      lastName: faker.name.findName(),
      email: faker.internet.email(),
      password: await bcrypt.hash('password', 10)
    });
    token = jwt.sign({ userId: user.id, email: user.email }, 'mysecret');

    const user2 = await db.User.create({
      firstName: faker.name.findName(),
      lastName: faker.name.findName(),
      email: faker.internet.email(),
      password: await bcrypt.hash('password', 10)
    });
    token2 = jwt.sign({ userId: user2.id, email: user2.email }, 'mysecret');
  });

  it('should add a recipe', (done) => {
    const recipeName = faker.name.findName();
    const desc = faker.lorem.sentence();
    chai.request(app)
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

  it('should get all recipes', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.recipes).to.be.an('array');
        done();
      });
  });

  it('should get recipe by id', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.recipe.id).to.equal(1);
        done();
      });
  });

  it('should get recipes by sort order', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?sort=upvotes&order=asc')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.recipes).to.be.an('array');
        done();
      });
  });

  it('should modify recipe', (done) => {
    const name = faker.name.findName();
    chai.request(app)
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

  it('should fail when editing recipe user did not create', (done) => {
    const name = faker.name.findName();
    chai.request(app)
      .put(`/api/v1/recipes/${recipeId}`)
      .set('Access-Token', token2)
      .send({
        name
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.data.message).to.equal('You are not authorized to edit this recipe');
        done();
      });
  });

  it('should post a review for a recipe', (done) => {
    const review = faker.lorem.sentence();
    chai.request(app)
      .post('/api/v1/recipes/1/reviews')
      .set('Access-Token', token)
      .send({
        review
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data.review.review).to.equal(review);
        done();
      });
  });

  it('should get recipes created by user', (done) => {
    chai.request(app)
      .get('/api/v1/users/recipes')
      .set('Access-Token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.recipes).to.be.an('array');
        done();
      });
  });

  it('should fail when deleting recipe user did not create', (done) => {
    chai.request(app)
      .del(`/api/v1/recipes/${recipeId}`)
      .set('Access-Token', token2)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.data.message).to.equal('You are not authorized to delete this recipe');
        done();
      });
  });

  it('it should delete recipe', (done) => {
    chai.request(app)
      .del(`/api/v1/recipes/${recipeId}`)
      .set('Access-Token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.message).to.equal('Recipe has been successfully deleted');
        done();
      });
  });

  it('it should return unknown recipe', (done) => {
    chai.request(app)
      .del(`/api/v1/recipes/${recipeId}`)
      .set('Access-Token', token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.data.message).to.equal('The Recipe does not exist');
        done();
      });
  });
});
