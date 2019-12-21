import React from "react";
import IPriceTableProps from "./IPriceTableProps";
import styles from "../Pricing.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const PriceTable: React.FC<IPriceTableProps> = ({
  group,
  prices,
  image,
  purchaseMode
}) => {
  return (
    <table>
      <thead>
        <tr className={styles.tableRow}>
          {group.name !== "Other" ? (
            <>
              <th>Size</th>
              <th>Print Only</th>
              <th>Framed</th>
            </>
          ) : (
            <>
              <th>Type</th>
              <th>Single</th>
              <th>Bulk</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {prices
          .filter(price => price.price_group_id === group.id)
          .map(price => (
            <tr className={styles.tableRow} key={price.id}>
              <td>{price.name}</td>
              <td>
                £{price.unframed.toFixed(2)}
                {purchaseMode && <FontAwesomeIcon icon={faShoppingCart} />}
              </td>
              <td>
                £{price.framed.toFixed(2)}
                {purchaseMode && <FontAwesomeIcon icon={faShoppingCart} />}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default PriceTable;
