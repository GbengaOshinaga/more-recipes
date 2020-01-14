import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  imageContainer: {
    position: 'relative'
  },
  image: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  },
  container: {
    marginTop: 20,
    [theme.breakpoints.up('sm')]: {
      paddingRight: 120,
      paddingLeft: 120
    }
  },
  paper: {
    paddingTop: 20,
    paddingBottom: 20
  },
  buttonContainer: {
    marginTop: 15
  },
  detailsContainer: {
    width: 500
  },
  icon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-20px',
    marginLeft: '-20px'
  },
  input: {
    display: 'none'
  }
}));

export default useStyles;
