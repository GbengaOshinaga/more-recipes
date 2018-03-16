import React from 'react';
import PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input';
import InputField from '../common/InputField';
import TextArea from '../common/TextArea';

const addModalPropTypes = {
  onInputChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  descValue: PropTypes.string.isRequired,
  onClickSave: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
  inputRef: PropTypes.func.isRequired,
  handleAddModalChipAdd: PropTypes.func.isRequired,
  handleAddModalChipDelete: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired
};

const editModalPropTypes = {
  onInputChange: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
  inputRef: PropTypes.func.isRequired,
  editData: PropTypes.objectOf(PropTypes.any).isRequired,
  handleChipAdd: PropTypes.func.isRequired,
  handleChipDelete: PropTypes.func.isRequired
};

const deleteModalPropTypes = {
  onConfirm: PropTypes.func.isRequired
};

const canvasStyle = { border: '1px solid #000000', marginLeft: '10px' };

/**
 * Functional component for add modal
 * @param {Object} props
 *
 * @returns {Node} jsx
 */
export function AddModal({
  onInputChange, inputValue, descValue, onClickSave, onFileChange, inputRef,
  handleAddModalChipAdd, handleAddModalChipDelete, data
}) {
  return (
    <div id="add-modal" className="modal">
      <div className="modal-content">
        <h5 className="center">Add Recipe</h5>
        <hr />

        <form action="#">
          <InputField
            id="name"
            type="text"
            onChange={onInputChange}
            value={inputValue}
            label="Recipe Name"
            dataError="Recipe Name is required"
          />
          <div className="row">
            <TextArea
              id="description"
              value={descValue}
              onChange={onInputChange}
              label="Recipe Details"
            />
          </div>
          <div className="row">
            <div className="col s12">
              <ChipInput
                id="ingredients-chip"
                value={[...data.ingredients]}
                onRequestAdd={chip => handleAddModalChipAdd(chip)}
                onRequestDelete={chip => handleAddModalChipDelete(chip)}
                floatingLabelText="Enter Ingredients - Press enter after entering each"
                fullWidth
              />
            </div>
          </div>
          <div className="file-field input-field">
            <div className="btn">
              <span>UPLOAD IMAGE</span>
              <input type="file" id="fileUpload" onChange={onFileChange} />
            </div>
            <canvas width="300" height="200" style={canvasStyle} ref={inputRef} />
          </div>

        </form>

      </div>
      <div className="modal-footer">
        <div className="container">
          <a
            id="submit"
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
 *
 * @returns {Node} jsx
 */
export function EditModal({
  onInputChange, handleChipAdd, handleChipDelete,
  onClickEdit, onFileChange, inputRef, editData
}) {
  return (
    <div id="edit-modal" className="modal">
      <div className="modal-content">
        <h5 className="center">Edit Recipe</h5>
        <hr />

        <form action="#">
          <InputField
            id="name"
            type="text"
            onChange={onInputChange}
            value={editData.name}
            dataError="Recipe Name is required"
          />
          <div className="row">
            <TextArea
              id="description"
              value={editData.description}
              onChange={onInputChange}
            />
          </div>
          <div className="row">
            <div className="col s12">
              <ChipInput
                value={[...editData.ingredients]}
                onRequestAdd={chip => handleChipAdd(chip)}
                onRequestDelete={chip => handleChipDelete(chip)}
                fullWidth
              />
            </div>
          </div>
          <div className="file-field input-field">
            <div className="btn">
              <span>CHOOSE NEW IMAGE</span>
              <input type="file" id="editFileUpload" onChange={onFileChange} />
            </div>
            <canvas width="300" height="200" style={canvasStyle} ref={inputRef} />
          </div>

        </form>

      </div>
      <div className="modal-footer">
        <div className="container">
          <a
            id="edit-submit"
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
 * @param {Object} props
 *
 * @returns {Node} jsx
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
          id="confirm-delete"
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
