import React, { useCallback, useEffect, useState } from "react";
import styles from "./Login.module.scss";
import ILoginProps from "./ILoginProps";

const Login: React.FC<ILoginProps> = ({ userService, signup, history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [message, setMessage] = useState("");

  const method = !signup ? userService.login : userService.signup;

  useEffect(() => {
    if (password && passwordConfirm && password !== passwordConfirm) {
      setMessage("Passwords do not match");
    } else {
      setMessage("");
    }
  }, [password, passwordConfirm]);

  const canSubmit = useCallback(() => {
    if (signup) {
      if (password !== passwordConfirm) return false;
    }
    return username && password;
  }, [signup, username, password, passwordConfirm]);

  // TODO: Convert to use `TextField`
  return (
    <div>
      <form
        className={styles.form}
        onSubmit={ev =>
          method(ev, username, password, email).then(msg => {
            if (msg) setMessage(msg);
            else {
              // Force reload
              window.location.href =
                new URLSearchParams(window.location.search).get("next") || "/";
            }
          })
        }
      >
        <div className={styles.formText}>
          An account is required to purchase photo prints as it helps us keep
          track of orders.
        </div>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          id="username"
          value={username}
          onChange={ev => setUsername(ev.target.value)}
          required={true}
        />

        {signup && (
          <>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={ev => setEmail(ev.target.value)}
            />
          </>
        )}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required={true}
          value={password}
          onChange={ev => setPassword(ev.target.value)}
        />

        {signup && (
          <>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              required={true}
              value={passwordConfirm}
              onChange={ev => setPasswordConfirm(ev.target.value)}
            />
          </>
        )}

        <button type="submit" disabled={!canSubmit()}>
          {!signup ? "Sign in" : "Create Account"}
        </button>
        {!signup && (
          <button onClick={() => history.push("/signup")}>
            Create Account
          </button>
        )}
        {message}
      </form>
    </div>
  );
};

export default React.memo(Login);
