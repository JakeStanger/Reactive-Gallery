import React, { useEffect, useState } from "react";
import styles from "./InfoTable.module.scss";
import IInfoTableProps from "./IInfoTableProps";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import EditPanel from "./editPanel/EditPanel";
import IPrice from "../../../../services/priceService/IPrice";
import PriceService from "../../../../services/priceService/PriceService";
import PriceTable from "../../pricing/priceTable/PriceTable";
import UserService from "../../../../services/userService/UserService";

const InfoTable: React.FC<IInfoTableProps> = ({ image, user }) => {
  const [editing, setEditing] = useState(false);
  const [prices, setPrices] = useState<IPrice[] | null>(null);

  useEffect(() => {
    if (image.priceGroup) {
      PriceService.getInstance()
        .getPricesForGroup(image.priceGroup)
        .then(setPrices);
    }
  }, []);

  console.log(prices);

  return (
    <div className={styles.container}>
      {user && user.permissions && user.permissions.edit && (
        <>
          <div className={styles.buttons}>
            <div className={styles.button} onClick={() => setEditing(!editing)}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </div>
          </div>
          <EditPanel
            isOpen={editing}
            onDismiss={() => setEditing(false)}
            image={image}
          />
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

      <div className={styles.row}>
        <div className={styles.infoTechnical}>
          <div className={styles.subSubTitle}>Technical Information</div>
          <table>
            <tbody>
              <tr className={styles.tableRow}>
                <td>Time Taken</td>
                <td>
                  {DateTime.fromISO(image.timeTaken).toFormat(
                    "dd/MM/yyyy HH:mm"
                  )}
                </td>
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
        {image.priceGroup && (
          <div>
            <div className={styles.subSubTitle}>
              Pricing ({image.priceGroup.name})
            </div>
            <PriceTable
              group={image.priceGroup}
              prices={prices || []}
              image={image}
              purchaseMode={UserService.getInstance().isLoggedIn()}
              className={styles.pushRight}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoTable;
