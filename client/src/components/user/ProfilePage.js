import React from 'react';
import PropTypes from 'prop-types';
import Header from '../common/Header/Header';

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
  editPhotoButtonClass: PropTypes.string.isRequired
};

const defaultProps = {
  profilePic: '',
  about: '',
  firstName: ''
};

const editPhotoButtonStyle = { position: 'absolute', top: '10px', margin: '10px' };

/**
 * Page for profile component
 * @param {*} props
 * @returns {*} jsx
 */
export default function ProfilePage({
  profilePic, lastName, email, about, isLoggedIn, firstName, isDisabled,
  saveButtonClass, onEditClick, onChange, onClickSave, editPhotoButtonClass
}) {
  return (
    <div>
      <Header
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
                <a
                  id="edit-photo"
                  className={editPhotoButtonClass}
                  style={editPhotoButtonStyle}
                >
                  <i className="material-icons">add_a_photo</i>
                </a>
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
                        >
                        SAVE
                        </a>
                      </div>
                    </div>
                    <div className="col s2">
                      <a
                        id="edit-button"
                        className="btn-floating btn-large waves-effect waves-light teal lighten-1"
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
