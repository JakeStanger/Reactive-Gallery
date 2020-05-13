import React from "react";
import styles from "./error.module.scss";

const PageNotFound: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.subTitle}>Error 404</div>
    <div>
      The page you tried to navigate to cannot be found. If you typed the
      address, check it for any mistakes. If another page took you here, please
      contact us with details. Click{" "}
      <span className={styles.link} onClick={() => window.history.back()}>here</span> to go back.
    </div>
  </div>
);

export default PageNotFound;
