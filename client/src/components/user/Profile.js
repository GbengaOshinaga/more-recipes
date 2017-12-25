import React from 'react';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';
import { connect } from 'react-redux';
import ProfilePage from './ProfilePage';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string
};

const defaultProps = {
  firstName: ''
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
      profilePic: '',
      name: '',
      email: '',
      about: ''
    };
  }

  /**
   * Method when component has finished mounting
   * @returns {*} undefined
   */
  componentDidMount() {
    sessionService.loadUser()
      .then((user) => {
        this.setState({
          profilePic: user.profilePic,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          about: user.about
        });
      });
  }

  /**
   * Component render function
   * @returns {*} jsx
   */
  render() {
    return (
      <ProfilePage
        isLoggedIn={this.props.isLoggedIn}
        firstName={this.props.firstName}
        profilePic={this.state.profilePic}
        name={this.state.name}
        email={this.state.email}
        about={this.state.about}
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

Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;

export default connect(mapStateToProps)(Profile);
