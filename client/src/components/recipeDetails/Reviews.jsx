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
  getIsAddingReview,
  getIsFetchingNextReviews,
  getReviewsNextUrl
} from '../../hooks/globalStore';
import SingleReview from './SingleReview';

const Reviews = ({ recipeId }) => {
  const {
    reviews: stateReviews,
    fetchReviews,
    fetchNextReviews,
    addReview,
    editReview,
    deleteReview
  } = useStoreContext();
  const [newReview, setNewReview] = useState('');

  const reviews = getReviews(stateReviews);
  const isFetchingNextReviews = getIsFetchingNextReviews(stateReviews);
  const isAddingReview = getIsAddingReview(stateReviews);
  const nextUrl = getReviewsNextUrl(stateReviews);

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

  const renderLoadMoreReviews = () => {
    if (nextUrl) {
      return isFetchingNextReviews ? (
        <CircularProgress />
      ) : (
        <Button onClick={() => fetchNextReviews(nextUrl)} color="primary">
          Load More Reviews
        </Button>
      );
    }
    return null;
  };

  return (
    <div>
      {renderReviews()}
      {renderLoadMoreReviews()}
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
