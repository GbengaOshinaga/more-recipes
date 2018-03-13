import React from 'react';
import PropTypes from 'prop-types';
import { MainHeader } from '../common/Header';

const propTypes = {
  profilePic: PropTypes.string,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  about: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  isDisabled: PropTypes.bool.isRequired,
  saveButtonClass: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
  editPhotoButtonClass: PropTypes.string.isRequired,
  onFileChange: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired
};

const defaultProps = {
  profilePic: '',
  about: '',
  firstName: ''
};

const editPhotoButtonStyle = { position: 'absolute', top: '10px', margin: '10px' };
const buttonStyle = { margin: '10px' };

/**
 * Page for profile component
 * @param {Object} props
 *
 * @returns {Node} jsx
 */
export default function ProfilePage({
  profilePic, lastName, email, about, isLoggedIn, firstName, isDisabled,
  saveButtonClass, onEditClick, onChange, onClickSave, editPhotoButtonClass,
  onFileChange, onClickCancel
}) {
  return (
    <div className="profile-body">
      <MainHeader
        isLoggedIn={isLoggedIn}
        firstName={firstName}
      />
      <div className="container">
        <div className="box">
          <div className="card horizontal">
            <div className="card-image">
              <div>
                <img
                  src={profilePic}
                  className="responsive-img"
                  alt="profile"
                />
                <div className="file-field">
                  <div
                    id="edit-photo"
                    className={editPhotoButtonClass}
                    style={editPhotoButtonStyle}
                  >
                    <input type="file" onChange={onFileChange} />
                    <span><i className="material-icons">add_a_photo</i></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-stacked">
              <div className="card-content">

                <div className="row">
                  <form>
                    <div className="col s10">

                      <span className="card-title">
                        <div className="input-field">
                          <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            disabled={isDisabled}
                            value={firstName}
                            onChange={onChange}
                          />
                        </div>
                      </span>
                      <div className="input-field">
                        <input
                          id="lastName"
                          type="text"
                          name="lastName"
                          disabled={isDisabled}
                          value={lastName}
                          onChange={onChange}
                        />
                      </div>

                      <div className="input-field">
                        <input
                          id="email"
                          type="text"
                          name="email"
                          disabled={isDisabled}
                          value={email}
                          onChange={onChange}
                        />
                      </div>

                      <div className="input-field">
                        <textarea
                          id="about"
                          className="materialize-textarea"
                          rows="2"
                          name="description"
                          value={about}
                          disabled={isDisabled}
                          onChange={onChange}
                        />
                      </div>

                      <div id="save" className={saveButtonClass}>
                        <a
                          id="save-button"
                          className="waves-effect waves-light btn"
                          href="#!"
                          onClick={onClickSave}
                          style={buttonStyle}
                        >
                        SAVE
                        </a>
                        <a
                          id="cancel-button"
                          className="waves-effect waves-light btn"
                          href="#!"
                          onClick={onClickCancel}
                          style={buttonStyle}
                        >
                        CANCEL
                        </a>
                      </div>
                    </div>
                    <div className="col s2">
                      <a
                        id="edit-button"
                        className="btn-floating btn-large waves-effect waves-light teal lighten-1"
                        href="#!"
                        onClick={onEditClick}
                      >
                        <i className="material-icons">edit</i>
                      </a>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

ProfilePage.propTypes = propTypes;
ProfilePage.defaultProps = defaultProps;
