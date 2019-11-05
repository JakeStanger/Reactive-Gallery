import React, { useState } from "react";
import styles from "./InfoTable.module.scss";
import IInfoTableProps from "./IInfoTableProps";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import EditPanel from "./editPanel/EditPanel";

const InfoTable: React.FC<IInfoTableProps> = ({ image, user }) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className={styles.container}>
      {user && user.permissions && user.permissions.edit && (
        <>
          <div className={styles.buttons}>
            <div className={styles.button} onClick={() => setEditing(!editing)}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </div>
          </div>
          <EditPanel isOpen={editing} onDismiss={() => setEditing(false)} image={image} />
        </>
      )}

      <div className={styles.subTitle}>{image.name}</div>
      <div className={styles.description}>{image.description}</div>

      {image.location && (
        <div>
          <b>Location</b>: {image.location.name}
        </div>
      )}

      {image.tags && (
        <div className={styles.tags}>
          {image.tags.map(tag => (
            <div key={tag.id} className={styles.tag}>
              {tag.name}
            </div>
          ))}
        </div>
      )}

      <div className={styles.infoTechnical}>
        <div className={styles.subSubTitle}>Technical Information</div>
        <table>
          <tbody>
            <tr className={styles.tableRow}>
              <td>Time Taken</td>
              <td>{DateTime.fromISO(image.timeTaken).toFormat("dd/MM/yyyy HH:mm")}</td>
            </tr>
            <tr className={styles.tableRow}>
              <td>Dimensions</td>
              <td>
                {image.width} x {image.height}
              </td>
            </tr>
            <tr className={styles.tableRow}>
              <td>Exposure</td>
              <td>{image.exposure}s</td>
            </tr>
            <tr className={styles.tableRow}>
              <td>Focal Length</td>
              <td>{image.focalLength}mm</td>
            </tr>
            <tr className={styles.tableRow}>
              <td>Aperture</td>
              <td>f/{image.aperture}</td>
            </tr>
            <tr className={styles.tableRow}>
              <td>ISO</td>
              <td>{image.iso}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InfoTable;
