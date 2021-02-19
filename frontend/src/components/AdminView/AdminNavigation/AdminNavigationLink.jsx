import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminNavigationLink.scss';

/**
 * Navigation button link component for the AdminNavigation component.
 *
 * props:
 *  Icon - SVG Icon component displayed on the button
 *  linkText - Text displayed on the button
 *  path - url path of the link
 */

function AdminNavigationLink({ Icon, linkText, path }) {
  return (
    <li className="admin-nav-link">
      <NavLink activeClassName="button-active" to={path}>
        <div className="button-group">
          <div className="button-group-inner">
            <Icon className="button-icon" />
            <span className="button-text">{linkText}</span>
          </div>
        </div>
      </NavLink>
    </li>
  );
}

export default AdminNavigationLink;
