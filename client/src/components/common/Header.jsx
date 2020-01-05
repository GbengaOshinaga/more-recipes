import React from 'react';
import { Link } from 'react-router-dom';
import { getIsUserAuthenticated } from '../../hooks/globalStore';
import styles from './Header.modules.scss';

const Header = () => {
  const isLoggedIn = getIsUserAuthenticated();

  const renderListItem = (linkTo, linkText) => {
    return (
      <li className={styles.listItem}>
        <Link to={linkTo}>{linkText}</Link>
      </li>
    );
  };

  const renderLoggedInLinks = () => {
    return (
      <ul className={styles.linksContainer}>
        {renderListItem('/profile', 'Profile')}
        {renderListItem('/my_recipes', 'My Recipes')}
        {renderListItem('/favourites', 'Favourites')}
        {renderListItem('/logout', 'Logout')}
      </ul>
    );
  };

  const renderLinks = () => {
    return (
      <ul className={styles.linksContainer}>
        {renderListItem('/signup', 'Sign Up')}
        {renderListItem('/signin', 'Sign In')}
      </ul>
    );
  };

  return (
    <div className={styles.container}>
      <Link to="/catalog" className={styles.brandLogo}>
        More-Recipes
      </Link>
      <div>{isLoggedIn ? renderLoggedInLinks() : renderLinks()}</div>
    </div>
  );
};

export default Header;
