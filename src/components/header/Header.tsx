import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import IHeaderProps from "./IHeaderProps";
import { NavLink } from "react-router-dom";
import UserService from "../../services/userService/UserService";
import IUser from "../../services/userService/IUser";
import { startCase } from "lodash";

const UserLabel: React.FC<{ userService: UserService }> = ({ userService }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    userService.getCurrentUser().then(setUser);
  }, [userService]);

  return user ? (
    <span className={styles.link}>Hi, {startCase(user.username)}</span>
  ) : (
    <span />
  );
};

const Header: React.FC<IHeaderProps> = ({ routes, userService }) => {
  const next = new URLSearchParams(window.location.search).get("next");

  return (
    <nav className={styles.header}>
      <div className={styles.left}>
        {routes.map(route => (
          <NavLink
            key={route.name}
            to={route.path}
            className={styles.link}
            activeClassName={styles.active}
          >
            {route.name}
          </NavLink>
        ))}
      </div>
      <div className={styles.right}>
        {userService.isLoggedIn() ? (
          <>
            <UserLabel userService={userService} />
            <NavLink
              to="/basket"
              className={styles.link}
              activeClassName={styles.active}
            >
              Basket
            </NavLink>
            <NavLink
              to="/logout"
              className={styles.link}
              activeClassName={styles.active}
            >
              Log out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to={"/login" + (next ? `?next=${next}` : "")}
              className={styles.link}
              activeClassName={styles.active}
            >
              Log in
            </NavLink>
            <NavLink
              to={"/signup" + (next ? `?next=${next}` : "")}
              className={styles.link}
              activeClassName={styles.active}
            >
              Sign up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
