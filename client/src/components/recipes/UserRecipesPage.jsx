import React from 'react';
import PropTypes from 'prop-types';
import { MainHeader } from '../common/Header';
import { AddModal, DeleteModal, EditModal } from './Modal';
import RecipesDisplay from '../common/RecipesDisplay';

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
  handleAddModalChipDelete: PropTypes.func.isRequired,
  isFound: PropTypes.bool.isRequired
};

const pageDefaultProps = {
  firstName: ''
};

/**
 * Page component
 * @param {Object} props
 *
 * @returns {Node} jsx
 */
function Page({
  isLoggedIn, firstName, data, onInputChange, inputValue,
  descValue, onClickSave, onFileChange, inputRef, editInputRef,
  userRecipes, onConfirmDelete, getId, handleChipAdd, handleChipDelete,
  getIdForEdit, editData, onClickEdit, onEditInputChange,
  handleAddModalChipAdd, handleAddModalChipDelete, isFound
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
          <h4 id="my-recipes-text" className="center-align">My Recipes</h4>
          <hr />
          <RecipesDisplay
            recipes={userRecipes}
            getId={getId}
            getIdForEdit={getIdForEdit}
            isFound={isFound}
          />
        </div>
      </div>
    </div>
  );
}

Page.propTypes = pagePropTypes;
Page.defaultProps = pageDefaultProps;

export default Page;
