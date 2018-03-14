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
        expect(res.body.data.errors.length).to.equal(3);
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
        expect(res.body.data.errors[0]).to.equal('order parameter is required if sort parameter is passed');
        done();
      });
  });

  it('should require sort parameter', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?order=asc')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors[0]).to.equal('sort parameter is required if order parameter is passed');
        done();
      });
  });

  it('should require to parameter', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?from=0')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors[0]).to.equal('limit parameter is required if from parameter is passed');
        done();
      });
  });

  it('should require from parameter', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?limit=asc')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors[0]).to.equal('from parameter is required if limit parameter is passed');
        done();
      });
  });

  it('should return error if params are not numbers', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?from=nan&limit=nan')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors[0]).to.equal('from and limit parameters must be numbers');
        done();
      });
  });

  it('should require correct sort parameter', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?sort=vote&order=asc')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors[0]).to.equal('sort parameter must be either upvotes or downvotes');
        done();
      });
  });

  it('should require correct order parameter', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?sort=upvotes&order=order')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors[0]).to.equal('order parameter must be asc or desc');
        done();
      });
  });
});
