import React from 'react';
import MaterialUIButton from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './ButtonStyles';

const Button = ({
  isLoading,
  onClick,
  fullWidth,
  children,
  variant,
  className,
  component,
  disabled = false,
  color = 'primary'
}) => {
  const classes = useStyles();

  return (
    <div className={classes.buttonContainer}>
      <MaterialUIButton
        fullWidth={fullWidth}
        variant={variant}
        component={component}
        disabled={disabled || isLoading}
        autoFocus
        color={color}
        onClick={onClick}
        className={className}
      >
        {children}
      </MaterialUIButton>
      {isLoading ? (
        <CircularProgress
          size={24}
          color="white"
          className={classes.buttonProgress}
        />
      ) : null}
    </div>
  );
};

export default Button;
