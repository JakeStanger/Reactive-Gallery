import React from "react";
import IPriceTableProps from "./IPriceTableProps";
import styles from "./PriceTable.module.scss";

const PriceTable: React.FC<IPriceTableProps> = ({
  group,
  prices,
  className
}) => {
  return (
    <table className={className}>
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
              <th>Pack of 8</th>
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
                £{price.unframed?.toFixed(2)}

              </td>
              {price.framed && <td>
                {price.framed.toFixed(2)}
              </td>}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default PriceTable;
