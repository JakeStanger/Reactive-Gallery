import React from "react";
import styles from "../Button.module.scss";
import IPrimaryButtonProps from "./IPrimaryButtonProps";

const PrimaryButton: React.FC<IPrimaryButtonProps> = ({ onClick, text, disabled }) => {
  return (
    <button className={`${styles.button} ${styles.primary}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default PrimaryButton;
