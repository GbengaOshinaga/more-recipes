import React from 'react';
import PropTypes from 'prop-types';
import Header from '../common/Header/Header';

const propTypes = {
  profilePic: PropTypes.string,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  about: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string
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
  profilePic, name, email, about, isLoggedIn, firstName
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
                className="btn-floating btn-large waves-effect waves-light teal lighten-1 hide"
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
                          id="profile-name"
                          type="text"
                          name="username"
                          disabled
                          value={name}
                        />
                      </div>
                    </span>
                    <div className="input-field">
                      <input
                        id="profile-email"
                        type="text"
                        name="username"
                        disabled
                        value={email}
                      />
                    </div>

                    <div className="input-field">
                      <textarea
                        id="desc-textarea"
                        className="materialize-textarea"
                        rows="2"
                        name="description"
                        defaultValue={about}
                        disabled
                      />
                    </div>

                    <div id="save" className="card-action hide">
                      <a id="save-button" className="waves-effect waves-light btn" href="#">SAVE</a>
                    </div>
                  </div>
                  <div className="col s2">
                    <a
                      id="edit-button"
                      className="btn-floating btn-large waves-effect waves-light teal lighten-1"
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
