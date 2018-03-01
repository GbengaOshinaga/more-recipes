import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { MainHeader } from '../common/Header';
import Card from '../common/Card';
import { AddModal, DeleteModal, EditModal } from './Modal';

const cardActionPropTypes = {
  id: PropTypes.number.isRequired,
  getId: PropTypes.func.isRequired,
  getIdForEdit: PropTypes.func.isRequired
};

const pagePropTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  onInputChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  descValue: PropTypes.string.isRequired,
  onClickSave: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
  inputRef: PropTypes.func.isRequired,
  editInputRef: PropTypes.func.isRequired,
  userRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
  getId: PropTypes.func.isRequired,
  getIdForEdit: PropTypes.func.isRequired,
  editData: PropTypes.objectOf(PropTypes.any).isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onEditInputChange: PropTypes.func.isRequired,
  handleChipAdd: PropTypes.func.isRequired,
  handleChipDelete: PropTypes.func.isRequired,
  handleAddModalChipAdd: PropTypes.func.isRequired,
  handleAddModalChipDelete: PropTypes.func.isRequired
};

const pageDefaultProps = {
  firstName: ''
};

/**
 * Displays recipes in cards
 * @param {Array} recipes
 * @param {func} getId
 * @param {func} getIdForEdit
 * @returns {Node} Card component
 */
function displayRecipes(recipes, getId, getIdForEdit) {
  const chunkedRecipes = _.chunk(recipes, 3);
  if (recipes === undefined || recipes.length === 0) {
    return 'No Recipe Available';
  }
  return chunkedRecipes.map((chunk, index) => (
    <div className="row" key={index}>
      {chunk.map(recipe => (
        <Card
          key={recipe.id}
          id={recipe.id}
          image={recipe.image}
          recipeName={recipe.name}
          recipeDescription={recipe.description}
          cardAction={<CardAction
            id={recipe.id}
            getId={getId}
            getIdForEdit={getIdForEdit}
          />}
        />
  ))}
    </div>
  ));
}

/**
 * Page component
 * @param {Object} props
 * @returns {Node} jsx
 */
function Page({
  isLoggedIn, firstName, data, onInputChange, inputValue,
  descValue, onClickSave, onFileChange, inputRef, editInputRef,
  userRecipes, onConfirmDelete, getId, handleChipAdd, handleChipDelete,
  getIdForEdit, editData, onClickEdit, onEditInputChange,
  handleAddModalChipAdd, handleAddModalChipDelete
}) {
  return (
    <div>
      <MainHeader
        isLoggedIn={isLoggedIn}
        firstName={firstName}
      />
      <div className="container">
        <a
          className="btn-floating btn-large waves-effect
          waves-light teal lighten-1 right modal-trigger pulse"
          href="#add-modal"
        >
          <i className="material-icons">add</i>
        </a>
        <AddModal
          handleAddModalChipAdd={handleAddModalChipAdd}
          handleAddModalChipDelete={handleAddModalChipDelete}
          onInputChange={onInputChange}
          inputValue={inputValue}
          descValue={descValue}
          onClickSave={onClickSave}
          onFileChange={onFileChange}
          inputRef={inputRef}
          data={data}
        />
        <DeleteModal
          onConfirm={onConfirmDelete}
        />
        <EditModal
          onInputChange={onEditInputChange}
          inputValue={inputValue}
          editData={editData}
          descValue={descValue}
          onClickSave={onClickSave}
          onFileChange={onFileChange}
          inputRef={editInputRef}
          onClickEdit={onClickEdit}
          handleChipAdd={handleChipAdd}
          handleChipDelete={handleChipDelete}
        />
        <div className="favorited-recipes">
          <h4 className="center-align">My Recipes</h4>
          <hr />
          {displayRecipes(userRecipes, getId, getIdForEdit)}
        </div>
      </div>
    </div>
  );
}

/**
 * Component for displaying card actions
 * @param {Object} props
 * @returns {Node} jsx
 */
function CardAction({
  id, getId, getIdForEdit
}) {
  return (
    <div className="card-action">
      <Link to={`/recipe/${id}`} className="btn-floating waves-effect waves-light green">
        <i id="desc" className="material-icons">description</i>
      </Link>
      <a
        className="modal-trigger btn-floating waves-effect waves-light blue icons"
        href="#edit-modal"
        onClick={getIdForEdit}
      >
        <i id={id} className="material-icons">edit</i>
      </a>
      <a
        className="modal-trigger btn-floating waves-effect waves-light red icons"
        href="#confirm-modal"
        onClick={getId}
      >
        <i id={id} className="material-icons">delete</i>
      </a>
    </div>
  );
}

CardAction.propTypes = cardActionPropTypes;

Page.propTypes = pagePropTypes;
Page.defaultProps = pageDefaultProps;

export default Page;
