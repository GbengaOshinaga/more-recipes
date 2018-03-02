import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('AuthValidator checks if valid token is passed', () => {
  it('should return unauthorized', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send({
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Authentication is required to perform this request');
        done();
      });
  });
});
