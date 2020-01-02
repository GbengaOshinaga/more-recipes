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
import styles from './Card.modules.scss';

const propTypes = {
  image: PropTypes.string,
  id: PropTypes.number.isRequired,
  recipeName: PropTypes.string.isRequired,
  recipeDescription: PropTypes.string.isRequired
};

const defaultProps = {
  image: ''
};

/**
 * Formats recipe description based on length
 * @param {String} content
 * @param {Number} maxLength of string
 *
 * @returns {String} formatted content
 */
function formatContent(content, maxLength = 40) {
  if (content.length > maxLength) {
    return `${content.slice(0, maxLength).trim()}...`;
  }
  return content;
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

  return (
    <MaterialUICard raised className={styles.cardContainer}>
      <CardActionArea onClick={() => history.push(`/recipe/${id}`)}>
        <CardHeader
          title={formatContent(recipeName, 25)}
          subheader={moment(createdAt).format('LL')}
        />
        <CardMedia className={styles.image} image={image} title={recipeName} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {formatContent(recipeDescription)}
          </Typography>
        </CardContent>
      </CardActionArea>
      {renderActions && renderActions()}
    </MaterialUICard>
  );
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
