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

const editModalPropTypes = {
  onChipChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  canvasId: PropTypes.string.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
  inputRef: PropTypes.func.isRequired,
  editData: PropTypes.object.isRequired
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
            dataError="Recipe Name is required"
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
export function EditModal({
  onChipChange, onInputChange, canvasId,
  onClickEdit, onFileChange, inputRef, editData
}) {
  return (
    <div id="edit-modal" className="modal">
      <div className="modal-content">
        <h5 className="center">Edit Recipe</h5>
        <hr />

        <form action="#">
          <InputField
            id="recipeName"
            type="text"
            onChange={onInputChange}
            value={editData.recipeName}
            label="Recipe Name"
            dataError="Recipe Name is required"
          />
          <div className="row">
            <TextArea
              id="recipeDescription"
              value={editData.recipeDescription}
              onChange={onInputChange}
              label="Recipe Details"
            />
          </div>
          <div className="row">
            <ChipInput
              defaultValue={[...editData.ingredients]}
              onChange={onChipChange}
            />
          </div>
          <div className="file-field input-field">
            <div className="btn">
              <span>UPLOAD NEW IMAGE</span>
              <input type="file" id="editFileUpload" onChange={onFileChange} />
            </div>
            <canvas id={canvasId} width="300" height="200" style={canvasStyle} ref={inputRef} />
          </div>

        </form>

      </div>
      <div className="modal-footer">
        <div className="container">
          <a
            href="#!"
            onClick={onClickEdit}
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
          href="#!"
          onClick={onConfirm}
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
EditModal.propTypes = editModalPropTypes;
