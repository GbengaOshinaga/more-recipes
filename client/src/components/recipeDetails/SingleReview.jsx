import React, { useState } from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { getUserId } from '../../hooks/globalStore';
import useAlertDialog from '../../hooks/useAlertDialog';

const SingleReview = ({ review, renderInput, editReview, deleteReview }) => {
  const {
    id,
    review: text,
    User: { firstName, lastName, profilePic } = {},
    updatedAt,
    UserId
  } = review;
  const userId = getUserId();

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
          <Edit />
        </IconButton>
        <IconButton aria-label="delete review" onClick={openDialog}>
          <Delete />
        </IconButton>
      </CardActions>
    );
  };

  const renderReview = () => {
    return (
      <>
        <Card raised key={id}>
          <CardContent>
            <Avatar src={profilePic} />
            <Typography variant="body1" color="textSecondary" component="p">
              {text}
            </Typography>
            <Typography variant="caption">
              {`By ${firstName} ${lastName} on ${moment(updatedAt).format(
                'LL'
              )}`}
            </Typography>
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
