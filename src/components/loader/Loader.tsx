import React from "react";
import styles from "./Loader.module.scss";

const Loader: React.FC<{small?: boolean}> = ({small}) => {
  const loader = <div className={styles.loader}>Loading...</div>;

  if(small) return loader;

  return (
    <div className={styles.loaderContainer}>
      {loader}
    </div>
  );
};

export default Loader;
