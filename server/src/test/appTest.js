import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

process.env.NODE_ENV = 'test';

const { expect } = chai;
let firstToken;
let secondToken;
chai.use(chaiHttp);

describe('/api/v1/recipes', () => {
  it('it should return "Welcome to the More-Recipes API Home."', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.eql('Welcome to the More-Recipes API Home.');
        done();
      });
  });

  it('it should sign up a user and return a token', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        firstName: 'Joseph',
        lastName: 'Gates',
        email: 'gates@test.com',
        password: 'iamjohngates',
        confirmPassword: 'iamjohngates'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.user.firstName).to.equal('Joseph');
        expect(res.body.data.token).to.be.a('string');
        firstToken = res.body.data.token;
        done();
      });
  });

  it('it should edit a user\'s information', (done) => {
    chai.request(app)
      .post('/api/v1/users/edit')
      .set('Access-Token', firstToken)
      .send({
        firstName: 'Not Joseph'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.user.firstName).to.equal('Not Joseph');
        done();
      });
  });

  it('it should sign up a user and return a token', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        firstName: 'James',
        lastName: 'Gorden',
        email: 'gorden@email.com',
        password: 'iamjamesgorden',
        confirmPassword: 'iamjamesgorden'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.user.firstName).to.equal('James');
        expect(res.body.data.token).to.be.a('string');
        secondToken = res.body.data.token;
        done();
      });
  });

  it('it should return errors when signing up without appropriate keys', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.errors).to.be.an('array');
        done();
      });
  });

  it('it should sign in a user and return a token', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'gates@test.com',
        password: 'iamjohngates',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.token).to.be.a('string');
        done();
      });
  });

  it('it should return errors when signing in without appropriate keys', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.errors).to.be.an('array');
        done();
      });
  });

  it('it should post recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('Access-Token', firstToken)
      .send({
        name: 'Fried Chicken with sauce',
        description: 'It\'s fried chicken, what more do you want?',
        ingredients: 'chicken,sauce'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data.name).to.equal('Fried Chicken with sauce');
        done();
      });
  });

  it('it should post recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('Access-Token', firstToken)
      .send({
        name: 'Toast bread with sauce',
        description: 'It\'s toast bread, with sauce, yeah, it might be disgusting',
        ingredients: 'bread,sauce'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data.name).to.equal('Toast bread with sauce');
        done();
      });
  });

  it('it should edit recipe', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/1')
      .set('Access-Token', firstToken)
      .send({
        name: 'Editing recipe name',
        description: 'It\'s fried chicken, what more do you want?',
        ingredients: 'chicken,sauce'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.name).to.equal('Editing recipe name');
        done();
      });
  });

  it('it should get recipe by id', (done) => {
    chai.request(app)
      .get('/api/v1/recipes/1')
      .set('Access-Token', firstToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.name).to.equal('Editing recipe name');
        done();
      });
  });

  it('it should send error if recipe id does not exist', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/92')
      .set('Access-Token', firstToken)
      .send({
        name: 'Editing recipe name',
        description: 'It\'s fried chicken, what more do you want?',
        ingredients: 'chicken,sauce'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.data.message).to.equal('The Recipe does not exist');
        done();
      });
  });

  it('it should send error if user is not authorized to edit recipe', (done) => {
    chai.request(app)
      .put('/api/v1/recipes/1')
      .set('Access-Token', secondToken)
      .send({
        name: 'Editing recipe name',
        description: 'It\'s fried chicken, what more do you want?',
        ingredients: 'chicken,sauce'
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('You are not authorized to edit this recipe');
        done();
      });
  });

  it('it should return errors when posting recipe without appropriate keys', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('Access-Token', firstToken)
      .send({
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data.errors).to.be.an('array');
        done();
      });
  });

  it('it should return unauthorized status when posting recipe without access token', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .send({
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('Authentication is required to perform this request');
        done();
      });
  });

  it('it should get all recipes', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  it('it should upvote a recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/upvote/1')
      .set('Access-Token', firstToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  it('it should downvote a recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/downvote/2')
      .set('Access-Token', firstToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  it('it should get all recipes and sort them by upvotes', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?sort=upvotes&order=desc')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  it('it should get all recipes created by user', (done) => {
    chai.request(app)
      .get('/api/v1/users/recipes')
      .set('Access-Token', firstToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  it('it should add user favourites recipes', (done) => {
    chai.request(app)
      .post('/api/v1/users/recipes/1/favourites')
      .set('Access-Token', firstToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.message).to.equal('Favourite added');
        done();
      });
  });

  it('it should get user favourites recipes', (done) => {
    chai.request(app)
      .get('/api/v1/users/recipes/favourites')
      .set('Access-Token', firstToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data.length).to.equal(1);
        done();
      });
  });

  it('it should delete user favourite recipe', (done) => {
    chai.request(app)
      .del('/api/v1/users/recipes/1/favourites')
      .set('Access-Token', firstToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.message).to.equal('Favourite deleted');
        done();
      });
  });

  it('it should return error when deleting a recipe user did not create', (done) => {
    chai.request(app)
      .del('/api/v1/recipes/2')
      .set('Access-Token', secondToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.data.message).to.equal('You are not authorized to delete this recipe');
        done();
      });
  });

  it('it should delete recipe', (done) => {
    chai.request(app)
      .del('/api/v1/recipes/2')
      .set('Access-Token', firstToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.message).to.equal('Recipe has been successfully deleted');
        done();
      });
  });
});
