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
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Box from '@material-ui/core/Box';
import NavBar from '../common/NavBar';
import Button from '../common/Button';
import { useUser } from '../../hooks/user';
import { getUserId } from '../../hooks/globalStore';
import useStyles from './ProfileStyles';

const Profile = () => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const classes = useStyles();

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

  const renderAvatar = (setFieldValue, values) => {
    const { profilePic, firstName } = values || {};

    const imageSrc = profilePic || user.profilePic;
    const name = firstName || user.firstName;

    return (
      <Box ml={5} mt={4}>
        <Grid item>
          <div className={classes.imageContainer}>
            {imageSrc ? (
              <Avatar src={imageSrc} className={classes.image} />
            ) : (
              <Avatar className={classes.image}>{name?.charAt(0)}</Avatar>
            )}
            {isInEditMode ? (
              <>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={onFileChange(setFieldValue)}
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="secondary"
                    aria-label="upload picture"
                    component="span"
                    className={classes.icon}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </>
            ) : null}
          </div>
        </Grid>
      </Box>
    );
  };

  const renderListItem = text => {
    return text ? (
      <Box ml={4}>
        <Box mt={1} mb={1}>
          <ListItem>
            <Typography variant="body2">{text}</Typography>
          </ListItem>
        </Box>
        <Divider />
      </Box>
    ) : null;
  };

  const renderInputField = ({ label, value, key, setFieldValue }) => {
    return (
      <Box ml={4}>
        <ListItem>
          <TextField
            fullWidth
            multiline
            label={label}
            value={value}
            onChange={e => setFieldValue(key, e.target.value)}
            color="secondary"
          />
        </ListItem>
      </Box>
    );
  };

  const renderForm = () => {
    return (
      <Formik initialValues={initialValues} onSubmit={onSaveClick}>
        {({ values, setFieldValue, handleSubmit }) => {
          const { firstName, lastName, email, about } = values;
          return (
            <>
              {renderAvatar(setFieldValue, values)}
              <Grid item className={classes.detailsContainer}>
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
                  <Grid
                    container
                    justify="center"
                    className={classes.buttonContainer}
                  >
                    <Box mr={1}>
                      <Button
                        disabled={isEditingUser}
                        variant="outlined"
                        component="span"
                        onClick={handleSubmit}
                        isLoading={isEditingUser}
                        color="secondary"
                        progressColor="secondary"
                      >
                        save
                      </Button>
                    </Box>
                    <Box ml={1}>
                      <Button
                        variant="outlined"
                        component="span"
                        onClick={() => setIsInEditMode(false)}
                        color="secondary"
                      >
                        Cancel
                      </Button>
                    </Box>
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
        <Grid item className={classes.detailsContainer}>
          <List>
            {renderListItem(firstName)}
            {renderListItem(lastName)}
            {renderListItem(email)}
            {renderListItem(about)}
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
        <Grid container justify="center">
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container direction="column" className={classes.container}>
          <Grid
            container
            component={Paper}
            elevation={8}
            className={classes.paper}
          >
            {isInEditMode ? renderForm() : renderUserData()}
            <Box ml={5}>
              <Fab
                color="secondary"
                aria-label="edit"
                onClick={onEditButtonClick}
              >
                <EditIcon />
              </Fab>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Profile;
