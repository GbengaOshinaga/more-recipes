import React from 'react';
import PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input';
import InputField from '../common/InputField';
import TextArea from '../common/TextArea';

const addModalPropTypes = {
  onChipChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  canvasId: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  descValue: PropTypes.string.isRequired,
  onClickSave: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
  inputRef: PropTypes.func.isRequired
};

const deleteModalPropTypes = {
  onConfirm: PropTypes.func.isRequired
};

const canvasStyle = { border: '1px solid #000000', marginLeft: '10px' };

/**
 * Functional component for add modal
 * @param {*} props
 * @returns {*} jsx
 */
export function AddModal({
  onChipChange, onInputChange, inputValue, canvasId, descValue, onClickSave, onFileChange, inputRef
}) {
  return (
    <div id="add-modal" className="modal">
      <div className="modal-content">
        <h5 className="center">Add Recipe</h5>
        <hr />

        <form action="#">
          <InputField
            id="recipeName"
            type="text"
            onChange={onInputChange}
            value={inputValue}
            label="Recipe Name"
          />
          <div className="row">
            <TextArea
              id="recipeDescription"
              value={descValue}
              onChange={onInputChange}
              label="Recipe Details"
            />
          </div>
          <div className="row">
            <ChipInput
              defaultValue={['Enter Ingredients']}
              onChange={onChipChange}
            />
          </div>
          <div className="file-field input-field">
            <div className="btn">
              <span>UPLOAD IMAGE</span>
              <input type="file" id="fileUpload" onChange={onFileChange} />
            </div>
            <canvas id={canvasId} width="300" height="200" style={canvasStyle} ref={inputRef} />
          </div>

        </form>

      </div>
      <div className="modal-footer">
        <div className="container">
          <a
            href="#!"
            onClick={onClickSave}
            className="modal-action modal-close waves-effect waves-green btn"
          >
            Save
          </a>
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn">Cancel</a>
        </div>
      </div>
    </div>
  );
}

/**
 * Functional component for edit modal
 * @returns {*} jsx
 */
export function EditModal() {
  return (
    <div id="edit-modal" className="modal">
      <div className="modal-content">
        <h5 className="center">Edit Recipe</h5>
        <hr />

        <form action="#">
          <div className="row">
            <div className="input-field col s12">
              <input id="recipe-name" value="Recipe Name" type="text" className="validate" />
              <label htmlFor="email">Recipe Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea id="recipe-details-textarea" className="materialize-textarea">
                This is a recipe that i have been working on for a while.
              </textarea>
              <label htmlFor="recipe-details-textarea">
                Recipe Details
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea id="ingredients-textarea" className="materialize-textarea" />
              <label htmlFor="ingredients-textarea" className="materialize-textarea">
                Ingredients
              </label>
            </div>
          </div>
          <div className="file-field input-field">
            <div className="btn">
              <span>UPLOAD NEW IMAGE</span>
              <input type="file" />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </form>

      </div>
      <div className="modal-footer">
        <div className="container">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn">Save</a>
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn">Cancel</a>
        </div>
      </div>
    </div>
  );
}

/**
 * Functional component for delete modal
 * @param {*} props
 * @returns {*} jsx
 */
export function DeleteModal({ onConfirm }) {
  return (
    <div id="confirm-modal" className="modal">
      <div className="modal-content">
        <h4>Delete this recipe?</h4>
        <hr />
        <p>This recipe will be permanently deleted</p>
      </div>
      <div className="modal-footer">
        <a
          href={onConfirm}
          className="modal-action modal-close waves-effect waves-green btn-flat"
        >
          DELETE
        </a>
        <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">
          CANCEL
        </a>
      </div>
    </div>
  );
}

AddModal.propTypes = addModalPropTypes;

DeleteModal.propTypes = deleteModalPropTypes;
