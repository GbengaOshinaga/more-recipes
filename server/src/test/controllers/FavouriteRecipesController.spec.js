import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import app from '../../app';
import db from '../../models';

const { expect } = chai;
chai.use(chaiHttp);

describe('Users should be able to add, get and delete favourites', () => {
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

  it('should add favourite', (done) => {
    chai.request(app)
      .post(`/api/v1/users/recipes/${recipeId}/favourites`)
      .set('Access-Token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.message).to.equal('Favourite added');
        done();
      });
  });

  it('should get user favourites recipes', (done) => {
    chai.request(app)
      .get('/api/v1/users/recipes/favourites')
      .set('Access-Token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  it('should delete user favourite recipe', (done) => {
    chai.request(app)
      .del('/api/v1/users/recipes/1/favourites')
      .set('Access-Token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.message).to.equal('Favourite deleted');
        done();
      });
  });
});
