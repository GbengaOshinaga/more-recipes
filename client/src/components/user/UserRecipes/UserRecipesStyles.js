import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    zIndex: 2,
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

export default useStyles;
