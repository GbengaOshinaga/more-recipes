import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
  image: {
    height: '100vh',
    backgroundImage: 'url(https://source.unsplash.com/pYWrdKO5ksI)',
    backgroundRepeat: 'repeat',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  text: {
    color: theme.palette.common.white,
    '&:hover': {
      textDecoration: 'none'
    }
  }
}));

export default styles;
