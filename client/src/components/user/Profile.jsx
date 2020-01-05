import React, { useState } from 'react';
import moment from 'moment';
import { Formik } from 'formik';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import NavBar from '../common/NavBar';
import { useUser } from '../../hooks/user';
import { getUserId } from '../../hooks/globalStore';
import styles from './Profile.modules.scss';

const Profile = () => {
  const [isInEditMode, setIsInEditMode] = useState(false);

  const userId = getUserId();
  const { isFetchingUser, user, editUser, isEditingUser } = useUser(
    userId,
    () => setIsInEditMode(false)
  );

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    about: user?.about,
    profilePic: user?.profilePic,
    uploadedImage: null
  };

  const onEditButtonClick = () => setIsInEditMode(true);

  const onSaveClick = formValues => {
    const { uploadedImage, ...values } = formValues;
    editUser(values, uploadedImage);
  };

  const onFileChange = setFieldValue => event => {
    const file = event.target.files[0];
    setFieldValue('uploadedImage', file);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = e => setFieldValue('profilePic', e.target.result);
  };

  const renderAvatar = (setFieldValue, editImage) => {
    const { profilePic, firstName } = user || {};

    return (
      <Grid item>
        <div>
          {profilePic ? (
            <Avatar
              src={isInEditMode ? editImage : profilePic}
              className={styles.avatar}
            />
          ) : (
            <Avatar>{firstName?.charAt(0)}</Avatar>
          )}
          {isInEditMode ? (
            <>
              <input
                accept="image/*"
                className={styles.input}
                id="icon-button-file"
                type="file"
                onChange={onFileChange(setFieldValue)}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </>
          ) : null}
        </div>
      </Grid>
    );
  };

  const renderListItem = text => {
    return (
      <ListItem>
        <Typography variant="body2">{text}</Typography>
      </ListItem>
    );
  };

  const renderInputField = ({ label, value, key, setFieldValue }) => {
    return (
      <ListItem>
        <TextField
          fullWidth
          required
          multiline
          label={label}
          value={value}
          onChange={e => setFieldValue(key, e.target.value)}
        />
      </ListItem>
    );
  };

  const renderForm = () => {
    return (
      <Formik initialValues={initialValues} onSubmit={onSaveClick}>
        {({ values, setFieldValue, handleSubmit }) => {
          const { firstName, lastName, email, about, profilePic } = values;
          return (
            <>
              {renderAvatar(setFieldValue, profilePic)}
              <Grid item>
                <List>
                  {renderInputField({
                    label: 'First Name',
                    value: firstName,
                    key: 'firstName',
                    setFieldValue
                  })}
                  {renderInputField({
                    label: 'Last Name',
                    value: lastName,
                    key: 'lastName',
                    setFieldValue
                  })}
                  {renderInputField({
                    label: 'Email',
                    value: email,
                    key: 'email',
                    setFieldValue
                  })}
                  {renderInputField({
                    label: 'About',
                    value: about,
                    key: 'about',
                    setFieldValue
                  })}
                  <Grid item>
                    <div className={styles.buttonContainer}>
                      <Button
                        disabled={isEditingUser}
                        variant="outlined"
                        component="span"
                        onClick={handleSubmit}
                      >
                        save
                      </Button>
                      {isEditingUser ? (
                        <CircularProgress
                          size={24}
                          className={styles.buttonProgress}
                        />
                      ) : null}
                    </div>
                    <Button
                      variant="outlined"
                      component="span"
                      onClick={() => setIsInEditMode(false)}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </List>
              </Grid>
            </>
          );
        }}
      </Formik>
    );
  };

  const renderUserData = () => {
    const { firstName, lastName, email, createdAt, about } = user || {};

    return (
      <>
        {renderAvatar()}
        <Grid item>
          <List>
            {renderListItem(firstName)}
            <Divider />
            {renderListItem(lastName)}
            <Divider />
            {renderListItem(email)}
            <Divider />
            {renderListItem(about)}
            <Divider />
            {renderListItem(`Joined on ${moment(createdAt).format('LL')}`)}
          </List>
        </Grid>
      </>
    );
  };

  return (
    <div>
      <NavBar />
      {isFetchingUser ? (
        <CircularProgress />
      ) : (
        <Paper>
          <Grid container>
            {isInEditMode ? renderForm() : renderUserData()}
            <Fab
              color="secondary"
              aria-label="edit"
              onClick={onEditButtonClick}
            >
              <EditIcon />
            </Fab>
          </Grid>
        </Paper>
      )}
    </div>
  );
};

export default Profile;
