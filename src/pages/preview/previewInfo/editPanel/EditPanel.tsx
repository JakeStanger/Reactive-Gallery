import React from "react";
import styles from "./EditPanel.module.scss";
import IEditPanelProps from "./IEditPanelProps";
import css from "../../../../styles/css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditForm from "../../../../components/editForm/EditForm";

const EditPanel: React.FC<IEditPanelProps> = props => {
  const { isOpen, onDismiss, image } = props;

  return (
    <div className={css(styles.panel, !isOpen && styles.closed)}>
      <div className={styles.closeBtn} onClick={onDismiss}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <div className={styles.content}>
        <div className={styles.subTitle}>{image.name}</div>
        <EditForm image={image} mode="edit" history={props.history} />
      </div>
    </div>
  );
};

export default EditPanel;
