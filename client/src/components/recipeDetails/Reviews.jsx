import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  useStoreContext,
  getReviews,
  getIsAddingReview
} from '../../hooks/globalStore';
import SingleReview from './SingleReview';

const Reviews = ({ recipeId }) => {
  const {
    reviews: stateReviews,
    fetchReviews,
    addReview,
    editReview,
    deleteReview
  } = useStoreContext();
  const [newReview, setNewReview] = useState('');

  const reviews = getReviews(stateReviews);
  const isAddingReview = getIsAddingReview(stateReviews);

  useEffect(() => {
    fetchReviews(recipeId);
  }, [fetchReviews, recipeId]);

  useEffect(() => {
    setNewReview('');
  }, [reviews.length]);

  const renderInput = ({
    value,
    onValueChange,
    label,
    onSaveClick,
    onCancelClick
  }) => {
    return (
      <Card raised>
        <CardContent>
          <form>
            <TextField
              value={value}
              onChange={e => onValueChange(e.target.value)}
              multiline
              label={label}
            />
          </form>
        </CardContent>
        <CardActions>
          <Button disabled={!value.length} onClick={onSaveClick}>
            Save
          </Button>
          {onCancelClick ? (
            <Button onClick={onCancelClick}>Cancel</Button>
          ) : null}
        </CardActions>
      </Card>
    );
  };

  const renderReviews = () => {
    return reviews.map(review => (
      <SingleReview
        key={review.id}
        review={review}
        renderInput={renderInput}
        editReview={editReview}
        deleteReview={deleteReview}
      />
    ));
  };

  return (
    <div>
      {renderReviews()}
      {isAddingReview ? (
        <CircularProgress />
      ) : (
        renderInput({
          value: newReview,
          onValueChange: setNewReview,
          label: 'Add Review',
          onSaveClick: () => addReview(recipeId, newReview)
        })
      )}
    </div>
  );
};

export default Reviews;
