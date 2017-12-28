import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import app from '../../app';
import db from '../../models';

const { expect } = chai;
chai.use(chaiHttp);

describe('RecipeValidator validates recipe inputs', () => {
  let token;
  before(async () => {
    const user = await db.User.create({
      firstName: faker.name.findName(),
      lastName: faker.name.findName(),
      email: faker.internet.email(),
      password: await bcrypt.hash('password', 10)
    });
    token = jwt.sign({ userId: user.id, email: user.email }, 'mysecret');
  });

  it('should require all compulsory fields', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('Access-Token', token)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors.length).to.equal(5);
        done();
      });
  });

  it('should require review', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/1/reviews')
      .set('Access-Token', token)
      .send({
        review: ''
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        done();
      });
  });

  it('should require that parameter is an integer', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/nan')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors.length).to.equal(1);
        expect(res.body.data.errors[0]).to.equal('Id must be an integer');
        done();
      });
  });

  it('should require that parameter is a positive integer', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/-2')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors.length).to.equal(1);
        expect(res.body.data.errors[0]).to.equal('Id cannot be a negative value');
        done();
      });
  });

  it('should require order parameter', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?sort=upvotes')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors[0]).to.equal('order query is required if sort query is passed');
        done();
      });
  });

  it('should require sort parameter', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?order=asc')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors[0]).to.equal('sort query is required if order query is passed');
        done();
      });
  });

  it('should require to parameter', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?from=0')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors[0]).to.equal('to query is required if from query is passed');
        done();
      });
  });

  it('should require from parameter', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?to=asc')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors[0]).to.equal('from query is required if to query is passed');
        done();
      });
  });

  it('should return error if params are not numbers', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?from=nan&to=nan')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors[0]).to.equal('from and to query must be numbers');
        done();
      });
  });

  it('should require correct sort parameter', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?sort=vote&order=asc')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors[0]).to.equal('sort query must be either upvotes or downvotes');
        done();
      });
  });

  it('should require correct order parameter', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?sort=upvotes&order=order')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors[0]).to.equal('order query must be asc or desc');
        done();
      });
  });
});
