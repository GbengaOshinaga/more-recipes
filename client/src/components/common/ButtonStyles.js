import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  buttonProgress: {
    color: theme.palette.common.white,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-12px',
    marginLeft: '-12px'
  },

  buttonContainer: {
    position: 'relative'
  }
}));

export default useStyles;
