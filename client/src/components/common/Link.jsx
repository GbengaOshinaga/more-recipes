import React from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

const CommonLink = ({
  to,
  variant,
  color = 'secondary',
  className,
  children
}) => (
  <Link
    to={to}
    variant={variant}
    color={color}
    component={RouterLink}
    className={className}
  >
    {children}
  </Link>
);

export default CommonLink;
