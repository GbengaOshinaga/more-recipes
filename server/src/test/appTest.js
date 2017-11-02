import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe('/api/v1/recipes', () => {
  it('it should return "Welcome to the More-Recipes API Home."', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.eql('Welcome to the More-Recipes API Home.');
        done();
      });
  });

  it('it should get all recipes', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
