import React from "react";
import styles from "./TextField.module.scss";
import ITextFieldProps from "./ITextFieldProps";

const TextField: React.FC<ITextFieldProps> = ({
  value,
  onChange,
  placeholder
}) => {
  return (
    <div className={styles.textField}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={ev => onChange(ev.target.value)}
      />
    </div>
  );
};

export default TextField;
