import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// const propTypes = {
//   mainLinks: PropTypes.node.isRequired,
//   sideLinks: PropTypes.node,
//   navClassName: PropTypes.string,
//   catalogId: PropTypes.string
// };

// const defaultProps = {
//   navClassName: 'transparent z-depth-0',
//   sideLinks: undefined,
//   catalogId: 'nav'
// };

// const mainHeaderPropTypes = {
//   isLoggedIn: PropTypes.bool.isRequired,
//   firstName: PropTypes.string,
//   onChange: PropTypes.func,
//   value: PropTypes.string,
//   type: PropTypes.string,
//   navClassName: PropTypes.string,
//   catalogId: PropTypes.string
// };

// const mainHeaderDefaultProps = {
//   firstName: '',
//   onChange: undefined,
//   value: '',
//   type: '',
//   navClassName: 'red darken-1',
//   catalogId: 'nav'
// };

// const dropdownLinks = (
//   <>
//     <li>
//       <Link id="profile" to="/profile">
//         Profile
//       </Link>
//     </li>
//     <li>
//       <Link id="my-recipes" to="/my_recipes">
//         My Recipes
//       </Link>
//     </li>
//     <li>
//       <Link id="favourites" to="/favourites">
//         Favourite Recipes
//       </Link>
//     </li>
//     <li>
//       <Link id="logout" to="/logout">
//         Logout
//       </Link>
//     </li>
//   </>
// );

// /**
//  * Logged in links
//  * @param {String} activates
//  * @param {String} firstName
//  * @param {func} onChange
//  * @param {String} value
//  * @param {String} type
//  *
//  * @returns {Node} links
//  */
// function loggedInLinks(activates, firstName, onChange, value, type) {
//   const commonLinks = (
//     <>
//       <li>
//         <Link id="catalog-link" to="/catalog">
//           Catalog
//         </Link>
//       </li>
//       <li>
//         <a className="dropdown-button" href="#!" data-activates={activates}>
//           {firstName}
//           <i className="material-icons right">arrow_drop_down</i>
//         </a>
//       </li>
//     </>
//   );

//   if (type === 'catalog') {
//     return (
//       <>
//         <li id="search-nav" className="hide">
//           <div className="center row">
//             <div className="col s12 ">
//               <div className="row" id="topbarsearch">
//                 <div className="input-field col s6 s12 white-text">
//                   <i className="white-text material-icons prefix">search</i>
//                   <input
//                     type="text"
//                     placeholder="search"
//                     id="autocomplete-input"
//                     className="autocomplete white-text"
//                     onChange={onChange}
//                     value={value}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </li>
//         {commonLinks}
//       </>
//     );
//   }
//   return <>{commonLinks}</>;
// }

// /**
//  * Functional component for header for the sign up and sign in pages
//  *
//  * @returns {Node} jsx
//  */
// function Header({ mainLinks, sideLinks, navClassName, catalogId }) {
//   return (
//     <div>
//       <div className="navbar-fixed">
//         <nav id={catalogId} className={navClassName}>
//           <div className="container">
//             <div className="nav-wrapper">
//               <Link to="/catalog" className="brand-logo">
//                 More-Recipes
//               </Link>
//               <a href="#!" data-activates="mobile" className="button-collapse">
//                 <i className="material-icons">menu</i>
//               </a>
//               <ul className="right hide-on-med-and-down">{mainLinks}</ul>
//             </div>
//           </div>
//         </nav>
//       </div>
//       <ul className="side-nav" id="mobile">
//         {sideLinks}
//         {!sideLinks && mainLinks}
//       </ul>
//     </div>
//   );
// }

// /**
//  * MainHeader component
//  * @param {Object} props
//  *
//  * @returns {Node} jsx
//  */
// function MainHeader({
//   isLoggedIn,
//   firstName,
//   onChange,
//   value,
//   type,
//   navClassName,
//   catalogId
// }) {
//   const mainLinks = loggedInLinks(
//     'dropdown1',
//     firstName,
//     onChange,
//     value,
//     type
//   );
//   const sideLinks = loggedInLinks(
//     'dropdown2',
//     firstName,
//     onChange,
//     value,
//     type
//   );

//   if (isLoggedIn) {
//     return (
//       <header>
//         <ul id="dropdown1" className="dropdown-content">
//           {dropdownLinks}
//         </ul>
//         <ul id="dropdown2" className="dropdown-content">
//           {dropdownLinks}
//         </ul>
//         <Header
//           navClassName={navClassName}
//           catalogId={catalogId}
//           mainLinks={mainLinks}
//           sideLinks={sideLinks}
//         />
//       </header>
//     );
//   }

//   return (
//     <Header
//       navClassName={navClassName}
//       catalogId={catalogId}
//       mainLinks={
//         <>
//           <li>
//             <Link to="/catalog">Catalog</Link>
//           </li>
//           <li>
//             <Link to="/signup">Sign Up</Link>
//           </li>
//           <li>
//             <Link to="/signin">Sign In</Link>
//           </li>
//         </>
//       }
//     />
//   );
// }

// Header.propTypes = propTypes;
// Header.defaultProps = defaultProps;

// MainHeader.propTypes = mainHeaderPropTypes;
// MainHeader.defaultProps = mainHeaderDefaultProps;

// export { Header, MainHeader };

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
