import React from "react";
import styles from "./Dialog.module.scss";
import IDialogProps from "./IDialogProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Dialog: React.FC<IDialogProps> = ({ isOpen, onDismiss, children }) => {
  return isOpen ? (
    <div className={styles.modal} onClick={onDismiss}>
      <div className={styles.dialog} onClick={ev => ev.stopPropagation()}>
        <div className={styles.closeBtn} onClick={onDismiss}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        {children}
      </div>
    </div>
  ) : null;
};

export default Dialog;
