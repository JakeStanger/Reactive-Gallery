import React, { useEffect, useState } from "react";
import styles from "./Pricing.module.scss";
import IPriceGroup from "../../services/priceService/IPriceGroup";
import IPrice from "../../services/priceService/IPrice";
import PriceService from "../../services/priceService/PriceService";
import PriceTable from "./priceTable/PriceTable";
import TextPreable from '../../pageContent/pricing/TextPreable';

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
      <TextPreable />
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
