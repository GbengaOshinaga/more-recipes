import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  card: {
    width: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
}));

export default useStyles;
