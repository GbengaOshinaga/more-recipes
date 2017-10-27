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
        res.body.should.be.a('array');
        res.body.length.should.be.eql(3);
        done();
      });
  });

  it('it should get all recipes by ascending order', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?sort=upvotes&order=asc')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        expect(res.body[0].upvotes).to.equal(10);
        done();
      });
  });

  it('it should get all recipes by descending order', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?sort=upvotes&order=des')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        expect(res.body[0].upvotes).to.equal(40);
        done();
      });
  });

  it('it should return errors when wrong order is passed', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?sort=upvotes&order=de')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('array');
        expect(res.body[0]).to.equal('Invalid order parameter, must be "asc" or "des", instead found de');
        done();
      });
  });

  it('it should return errors when wrong sort param is passed', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?sort=up&order=de')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('array');
        expect(res.body[0]).to.equal('sort parameter must be upvotes, instead found up');
        done();
      });
  });

  it('it should post review', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/3/reviews')
      .send({
        review: 'I really really love this recipe'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.name).to.equal('Third Recipe');
        done();
      });
  });

  it('it should post recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send({
        recipeName: 'Recipe Name',
        recipeDetail: 'Recipe Detail',
        ingredients: 'Fish oil, pepper'
      })
      .end((err, res) => {
        res.should.have.status(201);
        expect(res).to.have.status(201);
        expect(res.body.name).to.equal('Recipe Name');
        done();
      });
  });

  it('it should return errors', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send({
        recipeName: 'Recipe Name',
        recipeDetail: 'Recipe Detail'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('array');
        expect(res.body[0]).to.equal('Recipe Name, Description and Ingredients are required');
        done();
      });
  });

  it('it should modify recipe', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/1')
      .send({
        recipeName: 'New Name',
        recipeDetail: 'Recipe Detail',
        ingredients: 'Fish oil, pepper'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal('New Name');
        done();
      });
  });

  it('it should return errors if data is incomplete', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/2')
      .send({
        recipeName: 'Recipe Name',
        recipeDetail: 'Recipe Detail'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        res.body.should.be.a('array');
        expect(res.body[0]).to.equal('Recipe Name, Description and Ingredients are required');
        done();
      });
  });

  it('it should delete recipe', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body[0].name).to.equal('New Name');
        done();
      });
  });

  it('it should return "Id does not exist"', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/1')
      .end((err, res) => {
        expect(res.body[0]).to.equal('Id does not exist');
        done();
      });
  });

  it('it should return "Id does not exist"', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/5')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body[0]).to.equal('Id does not exist');
        done();
      });
  });

  it('it should post review', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/2/reviews')
      .send({
        review: 'I really really love this recipe'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.name).to.equal('Second Recipe');
        done();
      });
  });

  it('it should return error when passing id lower than 1', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/-1/reviews')
      .send({
        review: 'I really really love this recipe'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body[0]).to.equal('Id cannot be 0 or a negative value');
        done();
      });
  });
});
