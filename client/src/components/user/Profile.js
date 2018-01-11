import React from 'react';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import ProfilePage from './ProfilePage';
import * as userActions from '../../actions/userActions';

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
      editPhotoButtonClass: 'btn-floating btn-large waves-effect waves-light teal lighten-1 hide'
    };

    this.onEditClick = this.onEditClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  /**
   * Method when component has finished mounting
   * @returns {*} undefined
   */
  componentDidMount() {
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
   * @returns {*} new state
   */
  onEditClick() {
    this.setState({
      isDisabled: false,
      saveButtonClass: 'card-action',
      editPhotoButtonClass: 'btn-floating btn-large waves-effect waves-light teal lighten-1'
    });
  }

  /**
   * Method for when save button is clicked
   * @returns {*} null
   */
  onClickSave() {
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
        editPhotoButtonClass={this.state.editPhotoButtonClass}
      />
    );
  }
}

/**
 * Maps state to component properties
 * @param {*} state
 * @param {*} ownProps
 * @returns {object} object
 */
function mapStateToProps(state, ownProps) {
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
