import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';

import app from '../../app';
import db from '../../models';

const { expect } = chai;
chai.use(chaiHttp);

describe('Users can signup, signin, and modify data', () => {
  let email;
  let accessToken;
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
        console.log(firstName);
        console.log(res.body);
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.user.firstName).to.equal(firstName);
        expect(res.body.data.token).to.be.a('string');
        accessToken = res.body.data.token;
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
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.user.firstName).to.equal(firstName);
        done();
      });
  });
});
