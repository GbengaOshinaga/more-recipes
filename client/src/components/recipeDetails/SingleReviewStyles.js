import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  image: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  dateText: {
    marginTop: 6
  }
}));

export default useStyles;
