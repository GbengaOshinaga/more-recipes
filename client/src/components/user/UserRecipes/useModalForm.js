import React, { useState, useRef } from 'react';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import IngredientsInput from './IngredientsInput';
import ImageInput from './ImageInput';
import Button from '../../common/Button';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function useModalForm() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const shouldResetForm = useRef(false);

  const clearForm = () => {
    shouldResetForm.current = true;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderAppBar = (title, onSaveClick, isLoading) => (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <Button
          disabled={isLoading}
          autoFocus
          color="inherit"
          onClick={onSaveClick}
          isLoading={isLoading}
        >
          save
        </Button>
      </Toolbar>
    </AppBar>
  );

  const renderTextField = ({ label, value, key, setFieldValue }) => {
    return (
      <ListItem>
        <TextField
          fullWidth
          required
          multiline
          label={label}
          variant="outlined"
          value={value}
          onChange={e => setFieldValue(key, e.target.value)}
        />
      </ListItem>
    );
  };

  const renderModalForm = ({
    title,
    initialValues,
    onSaveClick,
    isLoading
  }) => {
    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSaveClick}
      >
        {({ values, setFieldValue, handleSubmit }) => {
          const { name, description, ingredients, image } = values;
          return (
            <div>
              <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
              >
                {renderAppBar(title, handleSubmit, isLoading)}
                <form>
                  <List>
                    {renderTextField({
                      label: 'Recipe Name',
                      value: name,
                      key: 'name',
                      setFieldValue
                    })}
                    <Divider />
                    {renderTextField({
                      label: 'Recipe Description',
                      value: description,
                      key: 'description',
                      setFieldValue
                    })}
                    <Divider />
                    <IngredientsInput
                      ingredients={ingredients}
                      setFieldValue={setFieldValue}
                    />
                    <Divider />
                    <ImageInput image={image} setFieldValue={setFieldValue} />
                  </List>
                </form>
              </Dialog>
            </div>
          );
        }}
      </Formik>
    );
  };

  return {
    openModal: handleClickOpen,
    closeModal: handleClose,
    renderModalForm,
    clearForm
  };
}
