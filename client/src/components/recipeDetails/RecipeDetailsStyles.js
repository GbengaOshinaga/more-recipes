import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: 85,
      paddingLeft: 85
    }
  },
  contentContainer: {
    padding: 30
  },
  detailsContainer: {
    width: 800
  },
  list: {
    listStyleType: 'none'
  },
  image: {
    maxWidth: '100%',
    width: 500,
    height: 'auto'
  }
}));

export default useStyles;
