import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      {auth.isAdmin && (
        <li>
          <NavLink to="/" exact>
                SEARCH USERS
          </NavLink>
        </li>
      )}
      {/* {auth.isLoggedIn && !auth.isAdmin  && (
        <li>
          <NavLink to={`/${auth.userId}/profile`}>MY PROFILE</NavLink>
        </li>
      )} */}
      {/* {auth.isLoggedIn && (
        <li>
          <NavLink to="/header/new">+ HEADER</NavLink>
        </li>
      )} */}
      {/* {auth.isLoggedIn && (
        <li>
          <NavLink to="/experiences/new">+ EXPERIENCE</NavLink>
        </li>
      )} */}
      {/* {auth.isLoggedIn && (
        <li>
          <NavLink to="/education/new">+ EDUCATION </NavLink>
        </li>
      )} */}
      {/* {auth.isLoggedIn && (
        <li>
          <NavLink to="/others/new">+ OTHER </NavLink>
        </li>
      )} */}
      {/* {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )} */}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
