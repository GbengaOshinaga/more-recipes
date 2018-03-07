import React from 'react';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import Loader from 'react-loader';
import ProfilePage from './ProfilePage';
import * as userActions from '../../actions/userActions';
import { pluginsInit } from '../../helpers/jqueryHelper';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

/**
 * Container component for profile page
 */
class Profile extends React.Component {
  /**
     * Component constructor
     * @param {*} props
     * @param {*} context
     */
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: {
        profilePic: '',
        firstName: '',
        lastName: '',
        email: '',
        about: '',
      },
      isDisabled: true,
      saveButtonClass: 'card-action hide',
      editPhotoButtonClass: 'btn-floating btn-large waves-effect waves-light teal lighten-1 hide',
      loaded: true
    };

    this.onEditClick = this.onEditClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    toastr.options = {
      closeButton: true,
      positionClass: 'toast-top-right'
    };
  }

  /**
   * Method when component has finished mounting
   * @returns {*} undefined
   */
  componentDidMount() {
    pluginsInit();

    sessionService.loadUser()
      .then((user) => {
        this.setState({
          data: {
            profilePic: user.profilePic,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            about: user.about
          }
        });
      });
  }

  /**
   * Method for when edit button is clicked
   * @param {*} event
   * @returns {*} new state
   */
  onEditClick(event) {
    event.preventDefault();
    this.setState({
      isDisabled: false,
      saveButtonClass: 'card-action',
      editPhotoButtonClass: 'btn-floating btn-large waves-effect waves-light teal lighten-1'
    });
  }

  /**
   * Method for when save button is clicked
   * @param {*} event
   * @returns {*} null
   */
  onClickSave(event) {
    event.preventDefault();
    sessionService.loadSession()
      .then((token) => {
        this.props.actions.modifyUser(token, this.state.data)
          .then(this.setState({
            isDisabled: true,
            saveButtonClass: 'card-action hide',
            editPhotoButtonClass: 'btn-floating btn-large waves-effect waves-light teal lighten-1 hide'
          }))
          .catch((error) => {
            toastr.error(error);
            if (error) {
              this.setState({
                isDisabled: false,
                saveButtonClass: 'card-action',
                editPhotoButtonClass: 'btn-floating btn-large waves-effect waves-light teal lighten-1'
              });
            }
          });
      });
  }

  /**
   * Method for when cancel button is clicked
   * @param {*} event
   * @returns {*} null
   */
  onClickCancel(event) {
    event.preventDefault();
    this.setState({
      isDisabled: true,
      saveButtonClass: 'card-action hide',
      editPhotoButtonClass: 'btn-floating btn-large waves-effect waves-light teal lighten-1 hide'
    });
    sessionService.loadUser()
      .then((user) => {
        this.setState({
          data: {
            profilePic: user.profilePic,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            about: user.about
          }
        });
      });
  }

  /**
   * Method for when file loads
   * @param {*} event
   * @returns {*} null
   */
  onFileChange(event) {
    this.setState({ loaded: false });
    const file = event.target.files[0];
    if (file) {
      userActions.uploadImage(file)
        .then(response => response.json())
        .then((response) => {
          const { data } = this.state;
          data.profilePic = response.secure_url;
          this.setState({ data, loaded: true });
        });
    }
  }

  /**
   * Handles input field value change
   * @param {*} event
   * @returns {*} new state
   */
  handleInputChange(event) {
    const name = this.state.data;
    name[event.target.id] = event.target.value;
    this.setState({ data: name });
  }

  /**
   * Component render function
   * @returns {*} jsx
   */
  render() {
    return (
      <div>
        <ProfilePage
          isLoggedIn={this.props.isLoggedIn}
          firstName={this.state.data.firstName}
          lastName={this.state.data.lastName}
          profilePic={this.state.data.profilePic}
          name={this.state.data.name}
          email={this.state.data.email}
          about={this.state.data.about}
          isDisabled={this.state.isDisabled}
          saveButtonClass={this.state.saveButtonClass}
          onEditClick={this.onEditClick}
          onChange={this.handleInputChange}
          onClickSave={this.onClickSave}
          onClickCancel={this.onClickCancel}
          editPhotoButtonClass={this.state.editPhotoButtonClass}
          onFileChange={this.onFileChange}
        />
        <Loader
          loaded={this.state.loaded}
          lines={13}
          length={20}
          width={10}
          radius={30}
          corners={1}
          rotate={0}
          direction={1}
          color="#000"
          speed={1}
          trail={60}
          shadow={false}
          hwaccel={false}
          className="spinner"
          zIndex={2e9}
          top="50%"
          left="50%"
          scale={1.00}
          loadedClassName="loadedContent"
        />
      </div>
    );
  }
}

/**
 * Maps state to component properties
 * @param {*} state
 * @returns {object} object
 */
function mapStateToProps(state) {
  return {
    isLoggedIn: state.session.authenticated,
    firstName: state.session.user.firstName,
  };
}

/**
 * Map dispatch to props
 * @param {*} dispatch
 * @returns {*} object
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

Profile.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
