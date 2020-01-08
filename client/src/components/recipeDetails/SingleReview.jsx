import React, { useState } from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { getUserId } from '../../hooks/globalStore';
import useAlertDialog from '../../hooks/useAlertDialog';
import { decode } from '../../utils';
import useStyles from './SingleReviewStyles';

const SingleReview = ({ review, renderInput, editReview, deleteReview }) => {
  const {
    id,
    review: text,
    User: { firstName, lastName, profilePic } = {},
    updatedAt,
    UserId
  } = review;
  const userId = getUserId();
  const classes = useStyles();

  const [editValue, setEditValue] = useState(text);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const { openDialog, closeDialog, renderAlertDialog } = useAlertDialog();

  const onSaveClick = () => {
    setIsInEditMode(false);
    if (editValue === text) return;

    editReview(id, editValue);
  };

  const renderActions = () => {
    return (
      <CardActions disableSpacing>
        <IconButton
          aria-label="edit review"
          onClick={() => setIsInEditMode(true)}
        >
          <Edit color="secondary" />
        </IconButton>
        <IconButton aria-label="delete review" onClick={openDialog}>
          <Delete color="primary" />
        </IconButton>
      </CardActions>
    );
  };

  const renderReview = () => {
    return (
      <>
        <Card raised key={id}>
          <CardContent>
            <Grid container>
              <Avatar src={decode(profilePic)} className={classes.image} />
              <Box ml={2}>
                <Typography variant="body1" component="p">
                  {decode(text)}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  className={classes.dateText}
                >
                  {`By ${firstName} ${lastName} on ${moment(updatedAt).format(
                    'LL'
                  )}`}
                </Typography>
              </Box>
            </Grid>
          </CardContent>
          {userId === UserId ? renderActions() : null}
        </Card>
        {renderAlertDialog('Delete this review?', () => {
          closeDialog();
          deleteReview(id);
        })}
      </>
    );
  };

  return isInEditMode
    ? renderInput?.({
        value: editValue,
        onValueChange: setEditValue,
        label: 'Edit Review',
        onSaveClick,
        onCancelClick: () => setIsInEditMode(false)
      })
    : renderReview();
};

export default SingleReview;
