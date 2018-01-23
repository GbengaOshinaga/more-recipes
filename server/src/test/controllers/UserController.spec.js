import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import db from '../../models';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('Users can signup, signin, and modify data', () => {
  let email;
  let accessToken;
  let token;
  let userId;

  before(async () => {
    const user = await db.User.create({
      firstName: faker.name.findName(),
      lastName: faker.name.findName(),
      email: faker.internet.email(),
      password: await bcrypt.hash('password', 10)
    });
    token = jwt.sign({ userId: user.id, email: user.email }, 'mysecret');
  });

  it('it should sign up a user and return user and token', (done) => {
    const firstName = faker.name.firstName();
    email = faker.internet.email();
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        firstName,
        email,
        lastName: faker.name.lastName(),
        password: 'iamjohngates',
        confirmPassword: 'iamjohngates'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.user.firstName).to.equal(firstName);
        expect(res.body.data.token).to.be.a('string');
        accessToken = res.body.data.token;
        userId = res.body.data.user.id;
        done();
      });
  });

  it('should sign in a user and return user and token', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        email,
        password: 'iamjohngates',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.user.email).to.equal(email);
        expect(res.body.data.token).to.be.a('string');
        done();
      });
  });

  it('should edit a user\'s data', (done) => {
    const firstName = faker.name.findName();
    chai.request(app)
      .post('/api/v1/users/edit')
      .set('Access-Token', accessToken)
      .send({
        firstName
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.user.firstName).to.equal(firstName);
        done();
      });
  });

  it('should get user by id', (done) => {
    chai.request(app)
      .get(`/api/v1/user/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.user.id).to.equal(userId);
        done();
      });
  });

  it('should return user not found', (done) => {
    chai.request(app)
      .get('/api/v1/user/99')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('User with Id of 99 does not exist');
        done();
      });
  });

  it('should return unauthorized', (done) => {
    chai.request(app)
      .del(`/api/v1/user/${userId}`)
      .set('Access-Token', token)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('You are not authorized to delete this account');
        done();
      });
  });

  it('should delete user by id', (done) => {
    chai.request(app)
      .del(`/api/v1/user/${userId}`)
      .set('Access-Token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.equal('User account deleted');
        done();
      });
  });

  it('should return user not found', (done) => {
    chai.request(app)
      .get(`/api/v1/user/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal(`User with Id of ${userId} does not exist`);
        done();
      });
  });
});
