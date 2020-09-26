import React, { useEffect, useState } from "react";
import styles from "./PreviewInfo.module.scss";
import IPreviewInfoProps from "./IPreviewInfoProps";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import EditPanel from "./editPanel/EditPanel";
import UserService from "../../../services/userService/UserService";
import BasketDialog from "./basketDialog/BasketDialog";
import PrimaryButton from "../../../components/button/primary/PrimaryButton";
import PriceTable from "../../pricing/priceTable/PriceTable";
import PriceService from "../../../services/priceService/PriceService";
import IPrice from "../../../services/priceService/IPrice";
import { Link } from "react-router-dom";
import Fraction from "fraction.js";

const PreviewInfo: React.FC<IPreviewInfoProps> = ({ image, user, history }) => {
  const [editing, setEditing] = useState(false);

  const [showBasketDialog, setShowBasketDialog] = useState(false);

  const [prices, setPrices] = useState<IPrice[]>([]);

  useEffect(() => {
    if (image.priceGroup) {
      PriceService.getInstance()
        .getPricesForGroup(image.priceGroup)
        .then(prices => {
          setPrices(prices);
        });
    }
  }, [image.priceGroup]);

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
            history={history}
          />
        </>
      )}

      <div className={styles.subTitle}>{image.name}</div>
      <div className={styles.description}>{image.description}</div>

      {!!image.categories?.length && (
        <div>
          <b>Categories</b>: {image.categories.map(c => c.name).join(", ")}
        </div>
      )}

      {image.location && (
        <div>
          <b>Location</b>: {image.location.name}
        </div>
      )}

      {image.tags && (
        <div className={styles.tags}>
          {image.tags.map(tag => (
            <Link
              key={tag.id}
              className={styles.tag}
              to={{
                pathname: "/",
                search: `q=${tag.name}`
              }}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      )}

      {image.priceGroup && (
        <PrimaryButton
          text={"Add to Basket"}
          onClick={() => {
            if (UserService.getInstance().isLoggedIn()) {
              setShowBasketDialog(!showBasketDialog);
            } else {
              history.push(`/login?next=${window.location.pathname}`);
            }
          }}
        />
      )}

      <div className={styles.row}>
        <div className={`${styles.infoTechnical} ${styles.mobileCentre}`}>
          <div className={`${styles.subSubTitle} ${styles.posLeft}`}>
            Technical Information
          </div>
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
                <td>{new Fraction(image.exposure).toFraction(true)}s</td>
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
            <div className={`${styles.subSubTitle} ${styles.posRight}`}>
              Pricing ({image.priceGroup.name})
            </div>
            <PriceTable
              group={image.priceGroup}
              prices={prices || []}
              className={`${styles.pushRight} ${styles.mobileCentre}`}
            />
          </div>
        )}
        {showBasketDialog && (
          <BasketDialog
            onDismiss={() => setShowBasketDialog(false)}
            image={image}
            prices={prices}
            history={history}
          />
        )}
      </div>
    </div>
  );
};

export default PreviewInfo;
