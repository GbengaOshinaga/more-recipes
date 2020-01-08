import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import styles from './ImageInput.modules.scss';

const ImageInput = ({ image, setFieldValue }) => {
  const onChange = event => {
    const file = event.target.files[0];
    setFieldValue('uploadedImage', file);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = e => setFieldValue('image', e.target.result);
  };

  return (
    <ListItem>
      <Grid container alignItems="flex-start">
        <input
          accept="image/*"
          className={styles.input}
          id="contained-button-file"
          type="file"
          onChange={onChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
        </label>
        {image ? (
          <img src={image} alt="recipe" className={styles.uploadImage} />
        ) : null}
      </Grid>
    </ListItem>
  );
};

export default ImageInput;
