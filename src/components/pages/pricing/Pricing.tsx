import React, { useEffect, useState } from "react";
import styles from "./Pricing.module.scss";
import IPriceGroup from "../../../services/priceService/IPriceGroup";
import IPrice from "../../../services/priceService/IPrice";
import PriceService from "../../../services/priceService/PriceService";
import PriceTable from "./priceTable/PriceTable";

const Pricing: React.FC = () => {
  const [priceGroups, setPriceGroups] = useState<IPriceGroup[]>([]);
  const [prices, setPrices] = useState<IPrice[]>([]);

  useEffect(() => {
    PriceService.getInstance()
      .getAllPrices()
      .then(setPrices);
    PriceService.getInstance()
      .getAllPriceGroups()
      .then(setPriceGroups);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Pricing</div>
      <p>
        Photos are grouped into pricing categories depending on their aspect
        ratio. Each photo lists its group in its description. An order can be
        placed through the Facebook shop or by email.
      </p>
      {priceGroups.map(group => (
        <div key={group.id}>
          <div className={styles.subTitle}>{group.name}</div>
          <PriceTable group={group} prices={prices} />
        </div>
      ))}
    </div>
  );
};

export default Pricing;
