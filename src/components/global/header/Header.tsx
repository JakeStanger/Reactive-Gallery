import React from "react";
import styles from "./Header.module.scss";
import IHeaderProps from "./IHeaderProps";
import { NavLink } from "react-router-dom";

const Header: React.FC<IHeaderProps> = ({ routes }) => (
  <nav className={styles.header}>
    <div className={styles.left}>
      {routes.map(route => (
        <NavLink to={route.path} className={styles.link} activeClassName={styles.active}>
          {route.name}
        </NavLink>
      ))}
    </div>
    <div className={styles.right}></div>
  </nav>
);

export default Header;
