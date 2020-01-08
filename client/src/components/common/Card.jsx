import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import MaterialUICard from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useStyles from './CardStyles';
import { decode } from '../../utils';

const propTypes = {
  image: PropTypes.string,
  id: PropTypes.number.isRequired,
  recipeName: PropTypes.string.isRequired,
  recipeDescription: PropTypes.string.isRequired
};

const defaultProps = {
  image: ''
};

const defaultImage =
  'https://res.cloudinary.com/king-more-recipes/image/upload/v1518028470/10546i3DAC5A5993C8BC8C_vtqogc.jpg';

/**
 * Formats recipe description based on length
 * @param {String} content
 * @param {Number} maxLength of string
 *
 * @returns {String} formatted content
 */
function formatContent(content, maxLength = 40) {
  const decodedString = decode(content);
  if (decodedString.length > maxLength) {
    return `${decodedString.slice(0, maxLength).trim()}...`;
  }
  return decodedString;
}

/**
 * Card component
 * @param {Object} props
 *
 * @returns {Node} jsx
 */
function Card({
  id,
  image,
  recipeName,
  recipeDescription,
  createdAt,
  renderActions
}) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid item>
      <MaterialUICard raised className={classes.card}>
        <CardActionArea onClick={() => history.push(`/recipe/${id}`)}>
          <CardHeader
            title={formatContent(recipeName, 20)}
            subheader={moment(createdAt).format('LL')}
          />
          <CardMedia
            className={classes.media}
            image={image || defaultImage}
            title={recipeName}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {formatContent(recipeDescription)}
            </Typography>
          </CardContent>
        </CardActionArea>
        {renderActions && renderActions()}
      </MaterialUICard>
    </Grid>
  );
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
