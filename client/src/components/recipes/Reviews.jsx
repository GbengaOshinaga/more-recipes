import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { useStoreContext, getReviews } from '../../hooks/globalStore';

const Reviews = ({ recipeId }) => {
  const { reviews: stateReviews, fetchReviews } = useStoreContext();

  const reviews = getReviews(stateReviews);

  useEffect(() => {
    fetchReviews(recipeId);
  }, [fetchReviews, recipeId]);

  return reviews.map(review => {
    const { id, review: text, User: { profilePic } = {} } = review;

    return (
      <Card key={id}>
        <CardContent>
          <Avatar src={profilePic} />
          <Typography variant="body2" color="textSecondary" component="p">
            {text}
          </Typography>
        </CardContent>
      </Card>
    );
  });
};

export default Reviews;
