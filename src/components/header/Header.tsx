import React from "react";
import styles from "./Header.module.scss";
import IHeaderProps from "./IHeaderProps";
import { NavLink } from "react-router-dom";
import UserService from "../../services/userService/UserService";
import IUser from "../../services/userService/IUser";
import { startCase } from "lodash";

class AsyncLabel extends React.PureComponent<{ userService: UserService }, { user: IUser | null }> {
  constructor(props: { userService: UserService }) {
    super(props);
    this.state = {
      user: null
    };
  }

  public componentDidMount() {
    this.props.userService.getCurrentUser().then(user => this.setState({ user }));
  }

  public render() {
    const { user } = this.state;
    return user ? <span>Hi, {startCase(user.username)}</span> : <span />;
  }
}

const Header: React.FC<IHeaderProps> = ({ routes, userService }) => (
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
          <NavLink to="/profile" className={styles.link} activeClassName={styles.active}>
            <AsyncLabel userService={userService} />
          </NavLink>
          <NavLink to="/logout" className={styles.link} activeClassName={styles.active}>
            Log out
          </NavLink>
        </>
      ) : (
        <>
        <NavLink to="/login" className={styles.link} activeClassName={styles.active}>
          Log in
        </NavLink>
         <NavLink to="/signup" className={styles.link} activeClassName={styles.active}>
         Sign up
       </NavLink>
       </>
      )}
    </div>
  </nav>
);

export default Header;
