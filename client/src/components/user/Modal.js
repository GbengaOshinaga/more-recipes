import React from 'react';

export const AddModal = () => (
  <div id="add-modal" className="modal">
    <div className="modal-content">
      <h5 className="center">Add Recipe</h5>
      <hr />

      <form action="#">
        <div className="row">
          <div className="input-field col s12">
            <input id="recipe-name" type="text" className="validate" />
            <label htmlFor="email">Recipe Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea id="recipe-details-textarea" className="materialize-textarea" />
            <label htmlFor="recipe-details-textarea">Recipe Details</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea id="ingredients-textarea" className="materialize-textarea" />
            <label htmlFor="ingredients-textarea" className="materialize-textarea">Ingredients</label>
          </div>
        </div>
        <div className="file-field input-field">
          <div className="btn">
            <span>UPLOAD IMAGE</span>
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

export const EditModal = () => (
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
            <textarea id="recipe-details-textarea" className="materialize-textarea">This is a recipe that i have been working on for a while.</textarea>
            <label htmlFor="recipe-details-textarea">Recipe Details</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea id="ingredients-textarea" className="materialize-textarea" />
            <label htmlFor="ingredients-textarea" className="materialize-textarea">Ingredients</label>
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

export const DeleteModal = ({ onConfirm }) => (
  <div id="confirm-modal" className="modal">
    <div className="modal-content">
      <h4>Delete this recipe?</h4>
      <hr />
      <p>This recipe will be permanently deleted</p>
    </div>
    <div className="modal-footer">
      <a href={onConfirm} className="modal-action modal-close waves-effect waves-green btn-flat">DELETE</a>
      <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">CANCEL</a>
    </div>
  </div>
);
