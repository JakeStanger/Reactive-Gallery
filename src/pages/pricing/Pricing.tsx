import React, { useEffect, useState } from "react";
import styles from "./Pricing.module.scss";
import IPriceGroup from "../../services/priceService/IPriceGroup";
import IPrice from "../../services/priceService/IPrice";
import PriceService from "../../services/priceService/PriceService";
import PriceTable from "./priceTable/PriceTable";
import TextPreamble from "../../pageContent/pricing/TextPreamble";

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
      <TextPreamble />
      <div className={styles.groups}>
        {priceGroups.map((group, i) => {
          const w = group.ratioWidth;
          const h = group.ratioHeight;

          let aspectDiagram: JSX.Element | undefined;
          if (w && h) {
            const width = "40%";
            const height = `calc(${width} * ${h / w}`;

            aspectDiagram = (
              <div
                className={styles.diagramWrapper}
                style={{
                  width,
                  paddingTop: height
                }}
              >
                <div className={styles.content}>
                  <div className={styles.textWrapper}>
                    <div>
                      {group.ratioWidth}:{group.ratioHeight}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={group.id}>
              <div className={styles.subTitle}>{group.name}</div>
              <div className={styles.priceGroup}>
                <PriceTable group={group} prices={prices} />
                <div className={styles.information}>
                  {aspectDiagram}
                  {group.description && <p>{group.description}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;
