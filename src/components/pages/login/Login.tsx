import React, { useState } from "react";
import styles from "./Login.module.scss";
import ILoginProps from "./ILoginProps";

const Login: React.FC<ILoginProps> = ({userService, signup}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const method = !signup ? userService.login : userService.signup

  return (
    <div>
      <form className={styles.form} onSubmit={ev => method(ev, username, password).then(msg => {
        if(msg) setMessage(msg);
        else window.location.href = "/";
      })}>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          id="username"
          value={username}
          onChange={ev => setUsername(ev.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
        />

        <button type="submit">{!signup ? "Sign in" : "Create Account"}</button>
        {message}
      </form>
    </div>
  );
};

export default React.memo(Login);
