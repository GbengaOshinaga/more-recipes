import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../common/Header';
import { AddModal } from './Modal';

const cardPropTypes = {
  image: PropTypes.string,
  recipeName: PropTypes.string.isRequired,
  recipeDescription: PropTypes.string.isRequired
};

const cardDefaultProps = {
  image: ''
};

const pagePropTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  onChipChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  canvasId: PropTypes.string.isRequired,
  descValue: PropTypes.string.isRequired,
  onClickSave: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
  inputRef: PropTypes.func.isRequired
};

const pageDefaultProps = {
  firstName: ''
};

const Page = ({
  isLoggedIn, firstName, onChipChange, onInputChange, inputValue, 
  canvasId, descValue, onClickSave, onFileChange, inputRef
}) => (
  <div>
    <Header
      isLoggedIn={isLoggedIn}
      firstName={firstName}
    />
    <div className="container">
      <a className="btn-floating btn-large waves-effect waves-light teal lighten-1 right modal-trigger pulse" href="#add-modal"><i className="material-icons">add</i></a>
      <AddModal
        onChipChange={onChipChange}
        onInputChange={onInputChange}
        inputValue={inputValue}
        canvasId={canvasId}
        descValue={descValue}
        onClickSave={onClickSave}
        onFileChange={onFileChange}
        inputRef={inputRef}
      />
      <div className="favorited-recipes">
        <h4 className="center-align">My Recipes</h4>
        <hr />
      </div>
    </div>
  </div>
);

const Card = ({ image, recipeName, recipeDescription }) => (
  <div className="col s12 m4 l4">
    <div className="card">
      <div className="card-image">
        <img alt="recipe" src={image} />
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <span className="card-title">{recipeName}</span>
          <p>{recipeDescription}</p>
        </div>
        <div className="card-action">
          <a className="btn-floating waves-effect waves-light green" href="recipe_details.html">
            <i className="material-icons">description</i>
          </a>
          <a className="modal-trigger btn-floating waves-effect waves-light blue" href="#edit-modal">
            <i className="material-icons">edit</i>
          </a>
          <a className="modal-trigger btn-floating waves-effect waves-light red" href="#confirm-modal">
            <i className="material-icons">delete</i>
          </a>
        </div>
      </div>
    </div>
  </div>
);

Card.propTypes = cardPropTypes;
Card.defaultProps = cardDefaultProps;

Page.propTypes = pagePropTypes;
Page.defaultProps = pageDefaultProps;

export default Page;
