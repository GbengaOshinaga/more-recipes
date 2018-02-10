import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import app from '../../app';
import db from '../../models';

const { expect } = chai;
chai.use(chaiHttp);

describe('Users should be able to upvote and downvote a recipe', () => {
  let token;
  let recipeId;

  before(async () => {
    const user = await db.User.create({
      firstName: faker.name.findName(),
      lastName: faker.name.findName(),
      email: faker.internet.email(),
      password: await bcrypt.hash('password', 10)
    });
    token = jwt.sign({ userId: user.id, email: user.email }, 'mysecret');
    const recipe = await db.Recipes.create({
      name: faker.name.findName(),
      description: faker.lorem.sentence(),
      UserId: user.id,
      ingredients: ['ingredient1', 'ingredient2']
    });
    recipeId = recipe.id;
  });

  it('should upvote a recipe', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/upvote/${recipeId}`)
      .set('Access-Token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.message).to.equal('Recipe upvoted');
        done();
      });
  });

  it('should cancel vote if user has already voted', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/upvote/${recipeId}`)
      .set('Access-Token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.message).to.equal('Your upvote has been cancelled');
        done();
      });
  });

  it('should downvote a recipe', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/downvote/${recipeId}`)
      .set('Access-Token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.message).to.equal('Recipe downvoted');
        done();
      });
  });

  it('should upvote a recipe', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/upvote/${recipeId}`)
      .set('Access-Token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.message).to.equal('Recipe upvoted');
        done();
      });
  });
});
