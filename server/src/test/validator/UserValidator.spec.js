import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import app from '../../app';
import db from '../../models';

const { expect } = chai;
chai.use(chaiHttp);

describe('UserValidator validates user inputs', () => {
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

  it('should return errors', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors.length).to.equal(6);
        done();
      });
  });

  it('should return errors', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        firstName: '      ',
        email: faker.internet.email(),
        lastName: '    ',
        password: 'iam',
        confirmPassword: 'iamjohngates'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors.length).to.equal(4);
        done();
      });
  });

  it('should return errors when illegal characters are inputed', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        firstName: '%$#@first',
        email: faker.internet.email(),
        lastName: '%name&',
        password: 'iamjohngates',
        confirmPassword: 'iamjohngates'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors.length).to.equal(2);
        done();
      });
  });

  it('should return errors', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        expect(res.body.data.errors.length).to.equal(3);
        done();
      });
  });

  it('should return errors when editing without values', (done) => {
    chai.request(app)
      .post('/api/v1/users/edit')
      .set('Access-Token', token)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.error).to.equal('You did not provide any value for updating');
        done();
      });
  });

  it('should return errors when editing with wrong values', (done) => {
    chai.request(app)
      .post('/api/v1/users/edit')
      .set('Access-Token', token)
      .send({
        wrong: 'value'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.error).to.equal('wrong are not valid attributes');
        done();
      });
  });
});
